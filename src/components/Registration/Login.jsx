import { useState, React, useEffect } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LoginIcon from '@mui/icons-material/Login';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { UseForm } from './UseForm';



const Login = () => {
    let history = useHistory();


    const initialFValues = {
        email: '',
        password: '',

    }

    //Validation
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('password' in fieldValues)
            temp.password = fieldValues.password.length > 0 ? "" : "Enter a password"
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = UseForm(initialFValues, false, validate);






    const [fetcherror, setFetcherror] = useState("");

    async function signIn(e) {
        e.preventDefault();
        if (validate()) {

            setFetcherror();
            await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message == 'success') {
                        localStorage.setItem("token", JSON.stringify(data.token));
                        history.push("/home/user");
                    }
                    else {
                        setFetcherror(data.message);
                        const timer = setTimeout(() => {
                            setFetcherror();
                        }, 2300);
                    }
                })
                .catch(error => {
                    setFetcherror(error.message);
                    const timer = setTimeout(() => {
                        setFetcherror();
                    }, 2300);

                })
        }


    }



    const paperStyle = { padding: 20, width: 450, margin: "80px auto" }
    const avatarStyle = { backgroundColor: '#283593' }
    const navlinkStyle = {
        marginLeft: '5px',
        textDecoration: 'none',

    }
    const btnstyle = { margin: '30px 0' }
    return (
        <Grid>
            <Paper elevation={5} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LoginIcon /></Avatar>
                    <h3>SIGN IN</h3>
                </Grid>
                <TextField
                    id="outlined-basic"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleInputChange}
                    type="email" variant="outlined" fullWidth required
                    margin="normal"
                    {...(errors.email && { error: true, helperText: errors.email })}
                />
                <TextField id="outlined-basic"
                    name="password"
                    value={values.password}
                    label="Password"
                    onChange={handleInputChange}
                    type='password' variant="outlined" fullWidth required
                    margin="normal"
                    {...(errors.password && { error: true, helperText: errors.password })} />
                <Button type='submit' onClick={signIn} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography style={{ color: 'red', margin: "5px" }}>
                    {fetcherror}
                </Typography>

                <Typography >
                    {/* <NavLink >
                        Forgot password ?
                    </NavLink> */}
                </Typography>
                <Typography > Don't have an account?
                    <NavLink to="/signup" style={navlinkStyle}> Sign up</NavLink>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login