import { React, useContext } from "react";
import { Toolbar, Typography, AppBar, Button } from '@mui/material';
  import AuthContext from '../components/context/AuthContext'
import { Link } from "react-router-dom";


const Header = () => {
    const {user, logoutUser} = useContext(AuthContext)

    return(     
        <AppBar position="sticky" sx={{backgroundColor: '#7A42A6',}}>
          <Toolbar>
            <Typography variant="h6" className="brand">
              FilmWiki
            </Typography>
            {user ? (
              <Typography onClick={logoutUser} sx={{ marginLeft: 'auto', }}>Logout  {user.user_id}</Typography>
            ): (
              <Link to="/login">Login</Link>
            )}
          </Toolbar>
        </AppBar>
    )
}

export default Header