import React from 'react'
import Navbar from './Navbar'
import SideNav from './SideNav'
import Box from '@mui/material/Box';
import { useStyles } from './HeaderStyle';
import Login from '../Registration/Login';
import Signup from '../Registration/Signup';
import Details from '../Body/Details/Details';
import Protected from '../Protected';

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

    };
    let { path } = useRouteMatch();


    return (
        <div>

            <>
                <Navbar handleDrawerToggle={handleDrawerToggle} />
                <SideNav position="fixed" mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                {/* Registering Route */}
                <Box className={classes.wrapper}>

                    <Switch>

                        <Route exact path={path}>
                            <Protected Cmp={Dashboard} />
                        </Route>
                        <Route exact path={`${path}/user`} >
                            <Protected Cmp={UserComponent} />
                        </Route>
                        <Route  path={`${path}/user/:id`}  >
                            <Protected Cmp={Details} />
                        </Route>
                        <Route exact path={`${path}/logout`}>
                            <Protected Cmp={Logout} />
                        </Route>


                        {/* <Route exact path={path}>
                            <Protected Cmp={Dashboard} />
                        </Route>
                        <Route exact path={`${path}/user`} >
                            <Protected Cmp={UserComponent} />
                        </Route>
                        <Route exact path={`${path}/user/:id`}  >
                            <Protected Cmp={Details} />
                        </Route>
                        <Route exact path={`${path}/logout`}>
                            <Protected Cmp={Logout} />
                        </Route> */}

                    </Switch>
                </Box>
            </>



        </div>
    )
}
{/* <Route exact path={path} component={Dashboard} />
                        <Route exact path={`${path}/user`} component={UserComponent} />
                        <Route path={`${path}/user/:id`} component={Details} />
                        <Route exact path={`${path}/logout`} component={Logout} /> */}