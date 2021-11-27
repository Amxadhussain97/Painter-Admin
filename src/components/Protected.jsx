import {useState,React,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router';

export default function Protected(props) {
    
    let Cmp = props.Cmp;
    let history = useHistory();
    useEffect( ()=>{
        console.log("protected");
        if(localStorage.getItem('token'))
        {
            let token = localStorage.getItem('token');
            const {
                exp
             } = jwt_decode(token)
           
             const expirationTime = (exp * 1000) - 60000
             if (Date.now() >= expirationTime) {
                localStorage.removeItem('token');
                history.push("/login");
         
             }
        }
        else history.push("/login");
    });
    return (
       <>
            <Cmp/>
       </>
    )
}
