import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import { HighQuality } from "@mui/icons-material";
import '../styles/Film.css'


const Film = () => {
    const [film, setFilm] = useState(null);
    const url = window.location.pathname.split('/');
  
    useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/api/v1/films/${url[2]}/`)
        .then((response) => {
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
        <Grid item>
          <Typography className="film-name">{film.film_name}</Typography>
        </Grid>
      </Grid>
    );
  };
  

export default Film