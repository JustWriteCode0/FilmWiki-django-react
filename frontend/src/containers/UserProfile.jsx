import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Grid, Button, Paper } from "@mui/material";
import '../styles/Profile.css'
import DialogImageCrop from "../components/DialogImageCrop";


const UserProfile = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/users/profile/${id}`)
        .then((response) => {
            setUser(response.data)
        })
    }, [id])


    return(
        <Grid>
            <label htmlFor="upload-photo" >
                <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    type="file"
                    accept="image/jpeg,image/png"
                />
                <img src={user.avatar} height="200px" width="200px"/>
            </label>
            <DialogImageCrop />

            <h1>{user.first_name} {user.last_name}</h1>
            {user.reviews?.map(review => {
                return (
                    <Paper key={review.id}>
                        <h1>{review.film_name}</h1>
                        <h1>{review.review}</h1>
                    </Paper>
                )
            })}            
        </Grid>
        
    )
}

export default UserProfile