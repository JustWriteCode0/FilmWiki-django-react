import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button, TextField } from "@mui/material";
import '../styles/Film.css'
import Carousel from "react-elastic-carousel"
import { Rate } from 'antd';
import AuthContext from '../components/context/AuthContext'



const Film = () => {
    const [film, setFilm] = useState(null);
    const [star_rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [allReviews, setAllReviews] = useState([])
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

      axios.get(`http://127.0.0.1:8000/api/v1/films/${url[2]}/reviews`, {
        headers : {
        "Authorization": `Bearer ${authTokens.access}`,
      }})
      .then((response) => {
        console.log(response, 'huhuhu')
        setAllReviews(response.data)
      })
    }, []);

    const handleChangeRating = (value) => {
      setRating(value * 2)
    };

    const handleSubmitRating = (event) => {
      event.preventDefault()
      if (authTokens === null) {
        console.log('login')
        navigate('/login')
      } else {
        console.log('ubuntus')
        const user_id = user.user_id
        axios.post(`http://127.0.0.1:8000/api/v1/films/${url[2]}/reviews`, {star_rating, review, user_id}, { 
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
    console.log(star_rating)
    return (
      <Grid container sx={{ marginTop: '15px' }} >
        <Grid item container xs={4} className="grid-container">
          <Grid item container xs={12} className="poster-container">
            <img src={film.film_poster} className="poster-image" />
          </Grid>
          <Grid item container xs={12} className="rating-container">
            <Grid item xs={12}>
              <Rate allowHalf defaultValue={film.rating_imdb / 2} onChange={handleChangeRating} />
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmitRating}>
                {star_rating > 0 ? <TextField required label="your review" className="film-review-field" onChange={(event) => setReview(event.target.value)} /> : ''}
                {star_rating > 0 ? <Button className="submit-rating-btn" variant="filled" type="submit">submit</Button> : ''}
              </form>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={6} className="grid-container">
          <Grid item container xs={12} className="carousel-container">
            <Carousel className="carousel">
              {film.images.map(film => {
                return (
                  <div key={film.id}>
                    <img src={film.image} draggable="false"  className="carousel-image" />
                  </div>
                )
              })}
            </Carousel>
          </Grid>
          <Grid item container xs={12} className="information-container">
            <Typography className="film-describe">{film.describe}</Typography>
            <div className="additionaly-info-container">
              <Typography className="film-country">{film.country}</Typography>
              <Typography className="film-release-date">{film.release_date}</Typography>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={2} className="recomendations-container">
          <div className="recomended-film">
              <img src={film.film_poster} className="recomended-film-image"/>
              <img src={film.film_poster} className="recomended-film-image"/>
              <img src={film.film_poster} className="recomended-film-image"/>
              <img src={film.film_poster} className="recomended-film-image"/>
          </div>
        </Grid>
      </Grid>
    );
  };
  

export default Film