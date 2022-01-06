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
import { styled } from '@mui/material/styles';

const BootstrapButton = styled(Button)({

    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    lineHeight: 1.5,
    color:'white',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  });

export default function Navbar({ handleDrawerToggle = { handleDrawerToggle } }) {

    let history = useHistory();
    function logOut() {
        localStorage.clear();
        history.push('/login');

    }
    return (
        <div >
            <AppBar position="fixed" >
                <Toolbar style={{ background: "#007BFF", fontSize: "0.5rem",height:'40px'}}>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 7 }}>

                    </Typography>

                    <BootstrapButton onClick={logOut} >Log Out</BootstrapButton>
                    <Hidden mdDown>

                        <Profile />
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
