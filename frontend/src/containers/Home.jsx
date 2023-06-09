import React from "react";
import {Grid, Box, Typography, Button} from '@mui/material'
import { Link } from 'react-router-dom'


const Home = () => {
   return (
    <>
    <Grid container paddingLeft='15px'>
        <Grid item xs={12}>
            <Box className='box-welcome' >
                <Typography className='welcome-text'>
                    welcome to <span style={{color: '#7A42A6'}}>FilmWiki</span> just create <br />
                    account or login if you <br />
                    alredy have account
                </Typography>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Box className='btnsIndexPage'>
                <Link className="signIn-signUp" to="/login">
                    <Button className='buttons-index'>
                        Sign in
                    </Button>
                </Link>
                <Link className='signIn-signUp btn-signUp' to="/registration">
                    <Button className='buttons-index buttons-index-signUp'>
                        Sign up
                    </Button>
                </Link>
            </Box>
        </Grid>
    </Grid>
    </>
    )
}

export default Home