import React from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PhotoCameraTwoToneIcon from '@mui/icons-material/PhotoCameraTwoTone';
import { Divider } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import GalleryDetails from './GalleryDetails';
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
import NotFound from '../../../NotFound';


export default function Gallery() {

    let { path, url } = useRouteMatch();
    return (
        <div>



            <Switch>
                <Route exact path={`${path}`}>
                    <Protected Cmp={GalleryDetails} />
                </Route>
                <Route exact path={`${path}/:galleryid/photos`}>
                    <Protected Cmp={Photos} />
                </Route>
                <Route component={NotFound} />
            </Switch>


        </div>
    )
}

