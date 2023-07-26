import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button, TextField, Paper, Box } from "@mui/material";
import '../styles/Film.css'
import {Carousel} from "antd";
import { Rate } from 'antd';
import AuthContext from '../components/context/AuthContext'


const Film = () => {
    const [film, setFilm] = useState(null);
    const [star_rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [allReviews, setAllReviews] = useState({'data': [], 'next': '', 'pervious': ''})
    const {authTokens, user} = useContext(AuthContext)

    const url = window.location.pathname.split('/');
    const navigate = useNavigate()


    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/v1/films/${url[2]}/`)
      .then((response) => {
        console.log(response.data)
        setFilm(response.data);
      })
      .catch((error) => {
        console.error('Error fetching film:', error);
      });
      
      axios.get(`http://127.0.0.1:8000/api/v1/films/${url[2]}/reviews`)
      .then((response) => {
        setAllReviews({
          data: response.data.results,
          next: response.data.next,
        });
      })
    }, []);

    const moreReview = () => {
      axios.get(allReviews.next)
      .then((response) => {
        setAllReviews({
          data: [...allReviews.data, ...response.data.results],
          next: response.data.next,
        })
        console.log(response)
      })
    }

    const handleChangeRating = (value) => {
      setRating(value * 2)
    };

    const handleSubmitRating = (event) => {
      event.preventDefault()
      if (authTokens === null) {
        navigate('/login')
      } else {
        axios.post(`http://127.0.0.1:8000/api/v1/films/${url[2]}/reviews/create/`, {star_rating, review}, { 
          headers: {
              "Authorization": `Bearer ${authTokens.access}`,
          }}) 
      }
    }

    if (film === null) {
      return (
        <div className="loading-container">
            <p className="animated-dots">...</p>
        </div>
      )
    }
    console.log(allReviews.star_rating, 'asudf8usad8f')
    return (
      <Grid container spacing={2} sx={{ paddingTop: "15px" }}>
        <Grid item lg={3} md={4} xs={12}>
          {/* Poster and film name */}
          <Box className="film-header">
            <img className="film-poster" src={film.film_poster}/>
            <Typography className="film-name">{film.film_name}</Typography>
          </Box>
          
        </Grid>
        <Grid item lg={7} md={8} xs={12}>
          {/* Carousel */}
          <Carousel className="carousel" autoplay>
            {film.images.map(film => {
              return (
                <img src={film.image} key={film.id} alt={film.film_name} draggable="false"  className="carousel-image" />
              )
            })}
          </Carousel>
          <Box>

          </Box>
        </Grid>
        <Grid item lg={2} md={4} xs={12}>
          {/* Film info */}
          <Box className="film-info-container">
            <Rate allowHalf defaultValue={film.rating_imdb / 2} disabled className="imdb-rating" /> 
            <Typography className="film-info">{film.category}</Typography>
            <Typography className="film-info">{film.box_office}$</Typography>
            <Typography className="film-info">{film.author}</Typography>
            <Typography className="film-info">{film.actors}</Typography>
          </Box>
        </Grid>

        <Grid item lg={12} md={8} xs={12}>
          {/* Describe */}
          <Typography className="film-describe">{film.describe}</Typography>
          <Box className="additional-info">
            <Typography className="film-release-date">{film.release_date}</Typography>
            <Typography className="film-country">{film.country}</Typography>
          </Box>
          
        </Grid>
        <Box className="review-container">
          {/* Review form and all reviews */}
            <Rate allowHalf className="review-rating" onChange={handleChangeRating}/> 
            <form onSubmit={handleSubmitRating}>
              <Box className="form-review">
                <TextField required fullWidth className="review-field" onChange={(event) => setReview(event.target.value)}>your review</TextField>
                <Button className="submit-review-btn" type="submit">submit</Button>
              </Box>  
            </form>
          {allReviews.data.map((review, index) => (
            <Paper className="user-reviews" key={index}>
              <Rate allowHalf defaultValue={review.star_rating / 2} disabled className="review-rating" />
              <Typography className="review-text">{review.review}</Typography>
            </Paper>
          ))}
          <Box className="pagination-container">
           {allReviews.next ? <Button className="more-reviews-btn" onClick={moreReview}>More...</Button> : ''} 
          </Box>
          
        </Box>
      </Grid>
    );
  };
  

export default Film