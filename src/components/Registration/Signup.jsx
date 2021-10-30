import {useState,React,useEffect} from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button, Link } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useStyles } from '../Header/HeaderStyle';

import { useHistory } from "react-router-dom";



const Signup = () => {
    let history = useHistory();
    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            history.push("/home");
        }
    },[]);

    

    const paperStyle = { padding: '30px 20px', width: 450, margin: "80px auto" }
    const headerStyle = { margin: 10 }
    const avatarStyle = { backgroundColor: '#283593' }
    const marginTop = { marginTop: 5 }
    const btnstyle = { margin: '30px 0' }
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    console.log(name);
    // function signUp(e){
    //     e.preventDefault();
    //     let item = {email,password}
    
    //     let result = await 
    // }
    async function signUp(e)
    {
        e.preventDefault();
        let item = {email,password}

        let result = await fetch("http://127.0.0.1:8000/api/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        })
        .catch(err => {
            console.log(err.message);
        })
        result = await result.json();

        localStorage.setItem("user-info",JSON.stringify(result));
        history.push("/home");
    }


    return (
        <Grid>
            <Paper elevation={5} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h3 style={headerStyle}>SIGN UP</h3>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account!</Typography>
                </Grid>
                <form>

                    <TextField 
                    error
                    id="outlined-basic" value={name} onChange={(e)=>setName(e.target.value)} 
                    label="Name" type="text" 
                    variant="outlined" fullWidth required 
                    margin="normal" 
                    helperText="Incorrect entry."
                    />
                    <TextField id="outlined-basic" value={email} onChange={(e)=>setEmail(e.target.value)} label="Email" type="email" variant="outlined" fullWidth required margin="normal" />
                    <TextField id="outlined-basic" value={password} onChange={(e)=>setPassword(e.target.value)} label="Password" type="password" autoComplete="current-password" variant="outlined" fullWidth required margin="normal" />
                    <TextField id="outlined-basic" value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)}  label="Confirm Password" type="password" autoComplete="current-password" variant="outlined" fullWidth required margin="normal" />
                    <Button onClick={signUp} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign up</Button>
                    <Typography > Already have an account?
                        <Link href="#" style={{ marginLeft: '5px' }} >
                            Sign in
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;