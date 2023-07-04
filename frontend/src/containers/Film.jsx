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
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const {authTokens} = useContext(AuthContext)
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
    }, []);

    const handleChangeRating = (value) => {
      setRating(value * 2)
    };

    const handleSubmitRating = (event, rating) => {
      event.preventDefault()
      if (authTokens === null) {
        navigate('/login')
      } else {
        console.log(rating, review)
        axios.post(`http://127.0.0.1:8000/api/v1/films/${url[2]}/rating/`, {rating, review}, { 
          headers: {
              "Authenticate": `Bearer ${authTokens.access}`,
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

    return (
      <Grid container sx={{ marginTop: '15px' }}>
        <Grid item xl={4} md={4} sx={{ paddingLeft: '15px', }}>
           {/* Film poster and name */}
          <img src={film.film_poster} draggable="false" className="film-poster" alt="" />
          <Typography className="film-name">{ film.film_name }</Typography>
        </Grid>
        <Grid item xl={4} md={8}>
          {/* Film carousel with images from film */}
          <Carousel className="carousel" >
            {film.images.map(film => {
              return (
                <div key={film.id}>
                  <img src={film.image} alt="" draggable="false"  className="carousel-image" />
                </div>
              )
            })}
          </Carousel>
        </Grid>
        <Grid item xl={4} md={6}>
          {/* Recomended and similar films */}

        </Grid>

        <Grid item xl={4} md={6}>
          {/* Information about film */}
          <div className="film-info-container">
            
            <Rate allowHalf defaultValue={film.star_rating / 2} onChange={handleChangeRating} />
            <form onSubmit={handleSubmitRating}>
              {rating > 0 ? <TextField required label="your review" className="film-review-field" onChange={(event) => setReview(event.target.value)} /> : ''}
              {rating > 0 ? <Button className="submit-rating-btn" variant="filled" type="submit">submit</Button> : ''}
            </form>
            
            <Typography className="film-info">category - {film.category}</Typography>
            <Typography className="film-info film-box-office">box office - ${film.box_office}</Typography>
            <Typography className="film-info">author - {film.author}</Typography>
            <Typography className="film-info">actors - {film.actors}</Typography>
          </div>
        </Grid>
        <Grid item xl={4} md={6}>
          {/* Block with film describe, release data, country */}
            <Typography className="film-describe">{film.describe}</Typography>
            <div className="additionaly-info-container">
              <Typography className="film-country">{film.country}</Typography>
              <Typography className="film-release-date">{film.release_date}</Typography>
            </div>
        </Grid>
        <Grid item xl={4} md={6}>
        </Grid>
      </Grid>
    );
  };
  

export default Film