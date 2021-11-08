import React from 'react'
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router';

export default function Logout() {
    let history = useHistory();
    //history.push("login");
    localStorage.removeItem('user-info');
    <Redirect to="/login"/>
    return (
        <div>
            <h1>Logout</h1>
        </div>
    )
}
