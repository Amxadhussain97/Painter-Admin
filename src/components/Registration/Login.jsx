import {useEffect,React} from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LoginIcon from '@mui/icons-material/Login';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";


const Login = () => {
    let history = useHistory();
    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            history.push("./home");
        }
    },[]);

    const paperStyle = { padding: 20, height: '70vh', width: 450, margin: "80px auto" }
    const avatarStyle = { backgroundColor: '#283593' }
    const navlinkStyle = {
         marginLeft: '5px',
         textDecoration:'none' ,
         
 }
    const btnstyle = { margin: '30px 0' }
    return (
        <Grid>
            <Paper elevation={5} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LoginIcon /></Avatar>
                    <h3>SIGN IN</h3>
                </Grid>
                <TextField id="outlined-basic" label="Email" type="email" variant="outlined" fullWidth required margin="normal" />
                <TextField id="outlined-basic" label="Password" type='password' variant="outlined"  fullWidth required margin="normal" />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                    <Link href="#" >
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography > Don't have an account?
                    {/* <NavLink  href="#" style={{ marginLeft: '5px' }} >
                        Sign Up
                    </NavLink > */}
                    <NavLink to="/signup" style={navlinkStyle}> Sign up</NavLink>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login