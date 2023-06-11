import React from "react";
import { Toolbar, Typography, AppBar} from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import CatalogFilms from "../containers/CatalogFilms";
import ResetPassword from "../containers/ResetPassword";
import ResetPasswordConfirm from "../containers/ResetPasswordConfirm";
import Home from "../containers/Home";
import PrivateRoute from "../utils/PrivateRoute";


const Header = () => {
    return(
      <>           
        <AppBar position="sticky" sx={{backgroundColor: '#7A42A6',}}>
          <Toolbar>
            <Typography variant="h6" component="div" className="brand">
              FilmWiki
            </Typography>
          </Toolbar>
        </AppBar>
         
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
        </Routes>
      </> 
    )
}

export default Header