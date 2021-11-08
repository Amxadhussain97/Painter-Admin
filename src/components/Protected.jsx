import {useState,React,useEffect} from 'react'
import { useHistory } from "react-router-dom";


export default function Protected(props) {
    
    let Cmp = props.Cmp;
    let history = useHistory();
    useEffect(()=>{
        if(!localStorage.getItem('user-info'))
        {
            history.push("/login");
        }
    },[]);
    return (
       <>
            <Cmp/>
       </>
    )
}
