import React from 'react'
import { useHistory } from "react-router-dom";


export default function Logout() {
    let history = useHistory();
    history.push("/login");
    return (
        <div>
            <h1>Logout</h1>
        </div>
    )
}
