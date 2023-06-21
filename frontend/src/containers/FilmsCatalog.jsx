import { React, useContext } from 'react'
import { Grid, Box, Container } from '@mui/material'
import "../styles/FilmsCatalog.css"
import "../img/spiderman.jpg"
import { Link } from 'react-router-dom'


const FilmsCatalog = () => {
    return(
        <Grid container className="films-container" sx={{ marginTop: '15px', }}>
            <Grid item className="films-item" xl={2} lg={2} md={2.4} sm={4} xs={6}>
              <Link to="/film">
                <img src="https://m.media-amazon.com/images/M/MV5BYTk3MDljOWQtNGI2My00OTEzLTlhYjQtOTQ4ODM2MzUwY2IwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_FMjpg_UX1000_.jpg" className="box-test" alt="" />
              </Link>
            </Grid>
            <Grid item className="films-item" xl={2} lg={2} md={2.4} sm={4} xs={6}>
            <img src="https://m.media-amazon.com/images/M/MV5BYTk3MDljOWQtNGI2My00OTEzLTlhYjQtOTQ4ODM2MzUwY2IwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_FMjpg_UX1000_.jpg" className="box-test" alt="" />

            </Grid>
            <Grid item className="films-item" xl={2} lg={2} md={2.4} sm={4} xs={6}>
            <img src="https://m.media-amazon.com/images/M/MV5BYTk3MDljOWQtNGI2My00OTEzLTlhYjQtOTQ4ODM2MzUwY2IwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_FMjpg_UX1000_.jpg" className="box-test" alt="" />

            </Grid>
            <Grid item className="films-item" xl={2} lg={2} md={2.4} sm={4} xs={6}>
            <img src="https://m.media-amazon.com/images/M/MV5BYTk3MDljOWQtNGI2My00OTEzLTlhYjQtOTQ4ODM2MzUwY2IwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_FMjpg_UX1000_.jpg" className="box-test" alt="" />

            </Grid>
            <Grid item className="films-item" xl={2} lg={2} md={2.4} sm={4} xs={6}>
            <img src="https://m.media-amazon.com/images/M/MV5BYTk3MDljOWQtNGI2My00OTEzLTlhYjQtOTQ4ODM2MzUwY2IwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_FMjpg_UX1000_.jpg" className="box-test" alt="" />

            </Grid>
            <Grid item className="films-item" xl={2} lg={2} md={2.4} sm={4} xs={6}>
                <img src="https://m.media-amazon.com/images/M/MV5BYTk3MDljOWQtNGI2My00OTEzLTlhYjQtOTQ4ODM2MzUwY2IwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_FMjpg_UX1000_.jpg" className="box-test" alt="" />
            </Grid>
        </Grid>          
    )
}

export default FilmsCatalog