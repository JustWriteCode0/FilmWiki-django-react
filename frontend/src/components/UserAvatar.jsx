import {React, useState, useContext, useEffect} from "react";
import AuthContext from "./context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";


const UserAvatar = () => {
    const {user, authTokens} = useContext(AuthContext)
    const [avatar, setAvatar] = useState('')

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
            console.log('nothing')
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