import React from "react";
import { Toolbar, Typography, AppBar} from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import LoginPage from "../pages/LoginPage";
import RegistrationPage from '../pages/RegistrationPage';
import FilmsPage from '../pages/FilmsPage';
import IndexPage from '../pages/IndexPage';


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
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/films" element={<FilmsPage />} />
        </Routes>
      </> 
    )
}

export default Header