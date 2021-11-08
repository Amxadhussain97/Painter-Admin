import React from 'react'
import { useStyles } from './HeaderStyle'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SideNavData from './SideNavData';
import { useRouteMatch } from 'react-router';

const drawerWidth = 240;

export default function SideNav(props) {
    // handleDrawerToggle= props.handleDrawerToggle;
    // mobileOpen = props.mobileOpen;
    const { window,mobileOpen,handleDrawerToggle } = props;
    // let { path, url } = useRouteMatch();
    // console.log(`${url}`);
    const classes = useStyles();
   



    // const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <Box
       
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                //   container={container}
                
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                classes={{
                    paper: classes.drawer,
                }}
            >
                <SideNavData handleDrawerToggle={handleDrawerToggle}/>
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs:'none', sm: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
                }}
                classes={{
                    paper: classes.drawer,
                }}
                open
            >
             <SideNavData/>
            </Drawer>
        </Box>
    )
}
