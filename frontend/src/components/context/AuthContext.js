import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()


export default AuthContext

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null) // if we have authTokens inside our local storage variable authTokens parse it else set null
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null) // if we have authTokens inside our local storage variable user decode it and save else set null
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate() // need for redirect user

    const loginUser = async (e) => {
        // send user data on server and generate new jwt tokens
        const response = await fetch('http://127.0.0.1:8000/auth/jwt/create/', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
           
            body:JSON.stringify({'email': e.email, 'password': e.password})
        })

        const data = await response.json()
            if (response.status === 200) {
                setAuthTokens(data)
                setUser(jwt_decode(data.access)) // decode access token in which the user information was encoded and save
                localStorage.setItem('authTokens', JSON.stringify(data)) // set auth tokens to local storage for use in any part of our app
                navigate('/films')
            } else {
                alert('something wrong')
            }    
    }


    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }


    const updateToken = async () => {
        // send on refresh path our token if all right we write new tokens to variables else logout user
        const response = await fetch('http://127.0.0.1:8000/auth/jwt/refresh/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

    const contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    useEffect(() => {
        // useEffect call our updateToken method every four minutes if user is authenticated
        const fourMinutes = 1000 * 60 * 4

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )   
}




