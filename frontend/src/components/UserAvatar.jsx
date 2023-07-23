import {React, useState, useContext, useEffect} from "react";
import AuthContext from "./context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const UserAvatar = () => {
    const {user, authTokens} = useContext(AuthContext)
    const [avatar, setAvatar] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        if (authTokens.access) {
            axios.get(`http://127.0.0.1:8000/auth/users/${user.user_id}/`,  {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            }})
            .then((response) => {
                setAvatar(response.data.avatar)
            })
        } else {
            navigate('/login')
        }
    }, [authTokens.access])
    console.log(authTokens)
    
    return(
        <Link to="/profile">
            <img src={avatar} alt="" className="user-avatar" />
        </Link>
        
    )
}

export default UserAvatar