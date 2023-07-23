import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button, TextField } from "@mui/material";
import '../styles/Film.css'
import {Carousel} from "antd";
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
      
      axios.get(`http://127.0.0.1:8000/api/v1/films/${url[2]}/reviews`)
      .then((response) => {
        setAllReviews(response.data)
        console.log(response.data)
      })
    }, []);

    const handleChangeRating = (value) => {
      setRating(value * 2)
    };

    const handleSubmitRating = (event) => {
      event.preventDefault()
      if (authTokens === null) {
        navigate('/login')
      } else {
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
    console.log(allReviews.star_rating, 'asudf8usad8f')
    return (
      <Grid container sx={{ marginTop: 2, }}>
            <Grid item container xl={10} xs={10} md={12} sm={12}>
                <Grid item container xl={4} xs={4} md={12} sm={12} sx={{ height: "900px", background: "#634873" }}>
                    <Grid item xl={12} xs={12} sx={{ paddingLeft: "15px", background: "#582344" }}>
                      {/* film poster */}
                      <img src={film.film_poster} alt={film.film_name} className="poster-image" />
                      <Typography className="film-name">{film.film_name}</Typography>
                      <div className="additionaly-info-container">
                        {/* additional info */}
                        <Typography className="additional-info">{film.category}</Typography>
                        <Typography className="additional-info">{film.box_office}$</Typography>
                        <Typography className="additional-info">{film.author}</Typography>
                        <Typography className="additional-info">{film.actors}</Typography>
                      </div>
                      <Grid item xl={12} xs={12} sm={12}>
                        {/* stars rating */}
                        <Rate allowHalf onChange={handleChangeRating} />
                      </Grid>
                        {/* add review form */}
                        <form onSubmit={handleSubmitRating}>
                          <TextField required label="your review" className="film-review-field" onChange={(event) => setReview(event.target.value)} /> 
                          <Button className="submit-rating-btn" variant="filled" type="submit">submit</Button>
                        </form>
                    </Grid>
                    <Grid item xl={12} xs={12} sm={12}>  
                      {/* all reviews about film */}    
                      {allReviews.map((review, index) => (
                        <div className="review-container" key={index}>
                          <Rate allowHalf defaultValue={review.star_rating / 2} disabled className="review-rating" />
                          <Typography className="review-text">{review.review}</Typography>
                        </div>
                      ))}
                    </Grid>
                </Grid>
                <Grid item container xl={8} xs={8} md={12} sm={12} sx={{ height: "900px", background: "#434989" }}>
                  {/* images from film carousel */}
                  <Grid item xl={12} xs={12}>
                      <Carousel className="carousel" autoplay>
                        {film.images.map(film => {
                          return (
                            <div key={film.id}>
                              <img src={film.image} alt={film.film_name} draggable="false"  className="carousel-image" />
                            </div>
                          )
                        })}
                      </Carousel>
                    </Grid>
                    <Grid item xl={12} xs={12}>
                      {/* info about film */}
                        
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xl={2} xs={2} md={12} sx={{ background: "#923843" }}>
              {/* recomended films */}
              <div className="recomended-film">
                <img src={film.film_poster} alt={film.film_name} className="recomended-film-image" />
                <img src={film.film_poster} alt={film.film_name} className="recomended-film-image" />
                <img src={film.film_poster} alt={film.film_name} className="recomended-film-image" />
                <img src={film.film_poster} alt={film.film_name} className="recomended-film-image" />
                <img src={film.film_poster} alt={film.film_name} className="recomended-film-image" />
                <img src={film.film_poster} alt={film.film_name} className="recomended-film-image" />
                <img src={film.film_poster} alt={film.film_name} className="recomended-film-image" />
              </div>
            </Grid>
        </Grid>
    );
  };
  

export default Film