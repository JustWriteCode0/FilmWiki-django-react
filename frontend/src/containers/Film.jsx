import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Grid, Typography, Button, TextField, Paper, Box } from "@mui/material";
import { Rate, Carousel } from 'antd';
import axios from "axios";
import AuthContext from '../components/context/AuthContext'
import '../styles/Film.css'


const Film = () => {
    const [film, setFilm] = useState(null);
    const [star_rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [allReviews, setAllReviews] = useState({'data': [], 'next': ''})
    const {authTokens, user} = useContext(AuthContext)

    const { slug } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/v1/films/${slug}/`)
      .then((response) => {
        {/* Request film by slug in url */}
        setFilm(response.data);
      })
      .catch((error) => {
        console.error('Error fetching film:', error);
      });
      
      axios.get(`http://127.0.0.1:8000/api/v1/films/${slug}/reviews`)
      .then((response) => {
        {/* Request reviews by film slug name */}
        setAllReviews({
          data: response.data.results,
          next: response.data.next,
        });
      })
    }, []);


    const moreReview = () => {
      {/* Request more reviews if user click button */}
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
      {/* If user is authenticated - post request for add review, else - navigate to login page */}
      event.preventDefault()
      if (star_rating > 0) {
        if (authTokens === null) {
          navigate('/login')
        } else {
          axios.post(`http://127.0.0.1:8000/api/v1/films/${slug}/reviews/create/`, {star_rating, review}, { 
          headers: {
              "Authorization": `Bearer ${authTokens.access}`,
          }}) 
        }
      }
      
    }

    if (film === null) {
      return (
        <div className="loading-container">
            <p className="animated-dots">...</p>
        </div>
      )
    }
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
        </Grid>
        <Grid item lg={2} md={4} xs={12}>
          {/* Film info */}
          <Box className="film-info-container">
            <Rate allowHalf defaultValue={film.rating_imdb / 2} disabled className="imdb-rating" /> 
            <Typography className="film-info">category: {film.category}</Typography>
            <Typography className="film-info">Box office: {film.box_office}$</Typography>
            <Typography className="film-info">Author: {film.author}</Typography>
            <Typography className="film-info">Actors: {film.actors}</Typography>
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
              <Link to={`/profile/${review.user_id}`}><Typography>{review.first_name}</Typography></Link>
              <Rate allowHalf defaultValue={review.star_rating / 2} disabled className="review-rating" />
              <Typography className="review-text">{review.review}</Typography>
            </Paper>
          ))}
          <Box className="pagination-container">
            {/* All reviews with pagination */}
            {allReviews.next ? <Button className="more-reviews-btn" onClick={moreReview}>More...</Button> : ''} 
          </Box>
        </Box>
      </Grid>
    );
  };
  
export default Film