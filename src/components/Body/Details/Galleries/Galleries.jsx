import React from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PhotoCameraTwoToneIcon from '@mui/icons-material/PhotoCameraTwoTone';
import { Divider } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Details from './Details'
import Photos from './Photos'
import Protected from '../../../Protected';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect

} from "react-router-dom";
import { useRouteMatch } from 'react-router';


export default function Galleries() {
    let { path, url } = useRouteMatch();

    return (
        <div>


            <Switch>
                <Route exact path={`${path}/Galleries`}>
                    <Protected Cmp={Details} />
                </Route>
                <Route exact path={`${path}/Galleries/:galleryid`}>
                    <Protected Cmp={Photos} />
                </Route>
            </Switch>


        </div>
    )
}

{/* <Route exact path={`${path}/Galleries`} component={Details} />
<Route exact path={`${path}/Galleries/:galleryid`} component={Photos} /> */}
