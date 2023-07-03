import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import { HighQuality } from "@mui/icons-material";
import '../styles/Film.css'
import Carousel from "react-elastic-carousel"


const Film = () => {
    const [film, setFilm] = useState(null);
    const url = window.location.pathname.split('/');
  
    useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/api/v1/films/${url[2]}/`)
        .then((response) => {
          console.log(response.data)
          setFilm(response.data);
        })
        .catch((error) => {
          console.error('Error fetching film:', error);
        });
    }, []);
  
    if (film === null) {
      return (
        <div className="loading-container">
            <p className="animated-dots">...</p>
        </div>
      )
    }

    return (
      <Grid container sx={{ marginTop: '15px' }}>
        <Grid item xl={4} sx={{ paddingLeft: '15px', }}>
          <img src={film.film_poster} draggable="false" className="box-test" alt="" />
          <Typography className="film-name">{ film.describe }</Typography>
        </Grid>
        <Grid item xl={4}>
          <Carousel className="carousel-images" >
            {film.images.map(film => {
              return (
                <div key={film.id}>
                  <img src={film.image} alt="" draggable="false" height="475px" width="845px" />
                </div>
              )
            })}
          </Carousel>
        </Grid>
        <Grid item xl={4} sx={{ background: '#389388', }}>
            <Typography>hello world</Typography>
        </Grid>
        
      </Grid>
    );
  };
  

export default Film