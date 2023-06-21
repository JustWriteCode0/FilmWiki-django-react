import { React, useContext, useState } from "react";
import { Toolbar, Typography, AppBar, Menu, MenuItem, Button, Stack, createTheme } from '@mui/material';
import AuthContext from '../components/context/AuthContext'
import useMediaQuery from '@mui/material/useMediaQuery';
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import {HeaderMenu} from './HeaderMenu'
import "../styles/Header.css"


const Header = () => {
    const {user, logoutUser, authTokens} = useContext(AuthContext)
    const isSmallScreen = useMediaQuery('(max-width:450px)');
  

    return(     
        <AppBar position="sticky" sx={{backgroundColor: '#7A42A6',}}>
          <Toolbar>
            <Link to="/" className="brand" >FilmWiki</Link>
            
            {isSmallScreen ? (
              <HeaderMenu /> 
            ) : (
              <Stack spacing={2} direction="row">
                <Link to="/films-catalog" className="nav-link">films</Link>
                <Link to="/films-catalog" className="nav-link">popular</Link>
                <Link to="/films-catalog" className="nav-link">rating</Link>
              </Stack>
            )}
            {user ? (
              <>
                <Typography onClick={logoutUser}  className="login-logout-btn">Logout</Typography>
                <UserAvatar/>
              </>
            ): (
                <Link to="/login" sx={{ marginLeft: "auto", }} className="login-logout-btn">
                  Login
                </Link>              
            )}
          </Toolbar>
        </AppBar>
    )
}

export default Header