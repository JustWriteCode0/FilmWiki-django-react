import {React, useState, useContext} from "react";
import AuthContext from "./context/AuthContext";
import axios from "axios";


const UserAvatar = () => {
    const {user, authTokens} = useContext(AuthContext)

    console.log(authTokens)
    if (authTokens.access) {
        axios.get(`http://127.0.0.1:8000/auth/users/${user.user_id}/`,  {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`
        }})
        .then((response) => {
             console.log(response)
        })
    } else {
        console.log('nothing')
    }
    

    return(
        <h1>avatar</h1>
    )
}

export default UserAvatar