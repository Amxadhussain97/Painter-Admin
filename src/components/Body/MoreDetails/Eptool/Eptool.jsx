import React from 'react'
import Protected from '../../../Protected';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect

} from "react-router-dom";
import { useRouteMatch } from 'react-router';
import EptoolDetails from './EptoolDetails';
import EpPhoto from './EpPhoto';


export default function Eptool() {
    let { path, url } = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route exact path={`${path}`}>
                    <Protected Cmp={EptoolDetails} />
                </Route>
                <Route exact path={`${path}/:eptoolId/photos`}>
                    <Protected Cmp={EpPhoto} />
                </Route>
            </Switch>




        </div>
    )
}
