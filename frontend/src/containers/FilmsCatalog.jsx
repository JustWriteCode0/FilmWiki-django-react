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
        setFilm({data: response.data})
      })
    }, [])
    console.log(film.data)

    return(
    <Grid container className="films-container" sx={{ marginTop: '15px', }}>
        {film.data.map(film => {
          return (
            <Grid item className="films-item" xl={2} lg={2} md={2.4} sm={4} xs={6} key={film.id}>
              <Link to={`/film/${film.slug_film_name}`}>
                <img src={film.film_poster} className="box-test" alt="" />
              </Link>
              <Typography className="catalog-film-name">{film.film_name}</Typography>
            </Grid>
          )
        })} 
    </Grid>              
    )
}

export default FilmsCatalog