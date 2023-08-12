import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Grid, Box, Typography } from "@mui/material";
import '../styles/Profile.css'
import { Rate } from "antd";


const UserProfile = () => {
    const { id } = useParams()
    const [userProfile, setUserProfile] = useState()


    useEffect(() => {
        // get profile data of user by id 
        axios.get(`http://127.0.0.1:8000/users/profile/${id}`)
        .then((response) => {
            setUserProfile(response.data)
        })
    }, [id])


    if (!userProfile) {
        // waiting for response
        return(
            <h1>...</h1>
        )
    }
    return(
        <Grid container className="container">
            <Grid lg={12} item sx={{ width: "100%" }} >
                <Box className="profile-header">
                    {/* Profile header - avatar */}
                    <img src={userProfile.avatar} alt="avatar" className="profile-avatar"/>
                    <Typography className="username">{userProfile.first_name} {userProfile.last_name}</Typography>
                </Box>
            </Grid>
            <Grid lg={12} item sx={{ width: "100%", marginTop: "25vh", }}>
                {userProfile.reviews.map(review => {
                    return(
                        <Box className="profile-review" key={review.id}>
                            {/* User reviews */}
                            <Rate desibled defaultValue={review.star_rating}></Rate>
                            <Link to={`/film/${review.slug_film_name}`} style={{ textDecoration: 'none' }}>
                                <Typography className="review-film-name">{review.film_name}</Typography>
                            </Link>
                            <Typography>{review.review}</Typography>
                        </Box>
                    )
                })}
            </Grid>
            
        </Grid>
                
    )
}

export default UserProfile