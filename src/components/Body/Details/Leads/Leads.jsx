import React from 'react'
import LeadDetails from './LeadDetails'
import Protected from '../../../Protected';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect

} from "react-router-dom";
import { useRouteMatch } from 'react-router';


export default function Leads() {
    let { path, url } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={`${path}/leads`}>
                    <Protected Cmp={LeadDetails} />
                </Route>
            </Switch>
        </div>
    )
}
