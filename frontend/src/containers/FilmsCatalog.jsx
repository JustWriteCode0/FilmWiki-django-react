import { React, useContext, useEffect, useState } from 'react'
import { Grid, Box, Container, Typography } from '@mui/material'
import "../styles/FilmsCatalog.css"
import "../img/spiderman.jpg"
import { Link } from 'react-router-dom'
import axios from 'axios'


const FilmsCatalog = () => {
    const [film, setFilm] = useState({data: []})

    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/v1/films/')
      .then((response) => {
        console.log(response.data)
        setFilm({data: response.data})
      })
    }, [])

    return(
    <Grid container className="films-container" sx={{ marginTop: '15px', }}>
        {film.data.map(film => {
          return (
            <Grid item className="films-item" xl={2} lg={2} md={2.4} sm={4} xs={6} key={film.id}>
              <Link to={`/film/${film.slug_film_name}`}>
                <img src="https://m.media-amazon.com/images/M/MV5BYTk3MDljOWQtNGI2My00OTEzLTlhYjQtOTQ4ODM2MzUwY2IwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_FMjpg_UX1000_.jpg" className="box-test" alt="" />
              </Link>
              <Typography>{film.film_name}</Typography>
            </Grid>
          )
        })} 
    </Grid>              
    )
}

export default FilmsCatalog