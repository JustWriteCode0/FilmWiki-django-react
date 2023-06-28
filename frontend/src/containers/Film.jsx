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
        <Grid item xl={2}>
        <img src="https://m.media-amazon.com/images/M/MV5BYTk3MDljOWQtNGI2My00OTEzLTlhYjQtOTQ4ODM2MzUwY2IwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_FMjpg_UX1000_.jpg" className="box-test" alt="" />
          <Typography className="film-name">An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.</Typography>
        </Grid>
      </Grid>
    );
  };
  

export default Film