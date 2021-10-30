import React from 'react'
import Navbar from './Navbar'
import SideNav from './SideNav'
import Box from '@mui/material/Box';
import { useStyles } from './HeaderStyle';
import Login from '../Registration/Login';
import Signup from '../Registration/Signup';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect

} from "react-router-dom";
import Dashboard from '../Body/Dashboard/Dashboard';
import Logout from '../Body/Logout';
import UserComponent from '../Body/UserComponent';
import { useRouteMatch } from 'react-router';



export default function HeaderComponent() {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = ({ props }) => {
        setMobileOpen(!mobileOpen);
        // console.log(mobileOpen);
    };
    let { path, url } = useRouteMatch();
   // console.log(path);

    return (
        <div>

            <>
                <Navbar handleDrawerToggle={handleDrawerToggle} />
                <SideNav position="fixed" mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                {/* Registering Route */}
                <Box className={classes.wrapper}>

                    <Switch>
                        <Route exact path={path} component={Dashboard} />
                        <Route exact path={`${path}/user`} component={UserComponent} />
                        <Route exact path={`${path}/logout`} component={Logout} />
                 
                    </Switch>
                </Box>
            </>



        </div>
    )
}
