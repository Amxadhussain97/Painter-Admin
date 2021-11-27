import React from 'react'
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router';

export default function Logout() {
    let history = useHistory();
    localStorage.removeItem('token');
    // history.push('login');
    history.push("/login");

    return (
        <div>
            <h1>Logout</h1>
        </div>
    )
}
