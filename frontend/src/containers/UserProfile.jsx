import React, { useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';


const UserProfile = () => {
    const { id } = useParams()

    useEffect = (() => {
        axios.get(`http://127.0.0.1:8000/users/profile/${id}`)
        .then((response) => {
            console.log(response)
        })
    })
    return(
        <h1>profile id: {id}</h1>
    )
}

export default UserProfile