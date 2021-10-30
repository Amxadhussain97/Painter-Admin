import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { red } from '@mui/material/colors';
import Profile from './Navtabs/Profile';
import { Hidden } from '@mui/material';
import { useHistory } from "react-router-dom";


export default function Navbar({ handleDrawerToggle={handleDrawerToggle}}) {

    let history = useHistory();
    function logOut()
    {
        localStorage.clear();
        history.push('./login');

    }
    return (
        <div >
            <AppBar position="fixed">
                <Toolbar style={{background:"#2b475e",fontSize:"1rem"}}>
                    
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1,ml:7 }}>
                        ADMIN
                    </Typography>
                
                    <Hidden mdDown>  
                    <Button onClick={logOut} color="inherit" sx={{ mr: 4 }} >Logout</Button>
                    <Profile/>
                    </Hidden>
                    <Hidden mdUp>  
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleDrawerToggle}
                    >
                    <MenuIcon />
                    </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
        </div>
    )
}
