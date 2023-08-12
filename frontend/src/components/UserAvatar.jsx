import {React, useState, useContext, useEffect} from "react";
import AuthContext from "./context/AuthContext";
import { AvatarUpdateContext } from "./context/AvatarUpdateContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const UserAvatar = () => {
    const [avatar, setAvatar] = useState('')

    const {user, authTokens, logoutUser} = useContext(AuthContext)
    const {avatarUpdate} = useContext(AvatarUpdateContext)

    const navigate = useNavigate()

    useEffect(()=>{
        // if user is authenticated get avatar else navigate to login page
        if (authTokens.access) {
            axios.get(`http://127.0.0.1:8000/auth/users/${user.user_id}/`,  {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            }})
            .then((response) => {
                setAvatar(response.data.avatar)
            })
            .catch(error => {
                logoutUser()
            })
        } else {
            navigate('/login')
        }
    }, [authTokens.access, avatarUpdate])
    console.log(authTokens)
    
    return(
        <Link to="/my-profile">
            <img src={avatar} alt="" className="user-avatar" />
        </Link>
        
    )
}

export default UserAvatar