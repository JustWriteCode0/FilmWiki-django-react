import { React, useContext, useState } from "react";
import { Toolbar, Typography, AppBar, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import AuthContext from '../components/context/AuthContext'
import { Link } from "react-router-dom";
import "../styles/Header.css"
import { AccountCircle } from "@mui/icons-material";


const Header = () => {
    const {user, logoutUser} = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState(null);

  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return(     
        <AppBar position="sticky" sx={{backgroundColor: '#7A42A6',}}>
          <Toolbar>
              <Typography variant="h6">
                <Link to="/" className="brand">
                  FilmWiki
                </Link>
              </Typography>
              <Typography >
                <Link to="/films" className="nav-link">
                  films
                </Link>
              </Typography>

              <Typography >
                <Link to="/films" className="nav-link">
                  popular
                </Link>
              </Typography>

              <Typography >
                <Link to="/films" className="nav-link">
                  rating
                </Link>
              </Typography>

            {user ? (
              <Typography onClick={logoutUser} className="login-logout-btn">Logout</Typography>
            ): (
              <Typography onClick={logoutUser} >
                <Link to="/login" className="login-logout-btn">
                  Login
                </Link>
              </Typography>
              
            )}
          </Toolbar>
        </AppBar>
    )
}

export default Header