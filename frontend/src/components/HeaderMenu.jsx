import {React, useState} from "react";
import { Menu, MenuItem, Button, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";

const HeaderMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget)
      }
  
      const handleMenuClose = () => {
        setAnchorEl(null)
      }

    return(
        <>
            <IconButton 
              id="menu-button"
              onClick={handleMenuClick}
              aria-controls={open ? 'menu-header' : undefined}
              aria-haspopup='true' aria-expanded={open ? 'true': undefined}
              >
              <MenuIcon />
            </IconButton>


            <Menu 
              id="menu-header" 
              anchorEl={anchorEl}
              open={open} 
              MenuListProps={{
                'arialabelledby': 'menu-button',
              }}
              onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}><Link to="/films" className="nav-link">rating</Link></MenuItem>
                <MenuItem onClick={handleMenuClose}>films</MenuItem>
                <MenuItem onClick={handleMenuClose}>films</MenuItem>  
            </Menu>
        </>
        
    )
}

export {HeaderMenu}