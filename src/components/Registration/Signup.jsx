import { useState, React, useEffect } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button, Link } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useStyles } from '../Header/HeaderStyle';
import { UseForm } from './UseForm';
import { NavLink, useHistory } from "react-router-dom";



const Signup = () => {

    let history = useHistory();
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push("/home");
        }
    }, []);

    const paperStyle = { padding: '30px 20px', width: 450, margin: "80px auto" }
    const headerStyle = { margin: 10 }
    const avatarStyle = { backgroundColor: '#283593' }
    const marginTop = { marginTop: 5 }
    const btnstyle = { margin: '30px 0' }


    const initialFValues = {
        email: '',
        password: '',
        confirmpassword: '',

    }

    //Validation
    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('password' in fieldValues)
            temp.password = fieldValues.password.length > 0 ? "" : "Enter a password"
        if ('confirmpassword' in fieldValues)
            temp.confirmpassword = fieldValues.confirmpassword == fieldValues.password ? "" : "Passsword didn't match"
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
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    async function signUp(e) {
        e.preventDefault();
        if (validate()) {
            setFetcherror();
            let item = Object.assign({}, { email: values.email, password: values.password, role: 'Admin' });

            await fetch("http://amaderlab.xyz/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message != "success") {
                        setFetcherror(data.message);
                        const timer = setTimeout(() => {
                            setFetcherror();
                        }, 2300);
                    }
                    else {
                        let formData = new FormData();    //formdata object
                        localStorage.setItem("token", JSON.stringify(data.token));
                        formData.append('role', 'Admin');
                        let result = fetch("http://amaderlab.xyz/api/users/" + data.id, {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${data.token}`,

                            },
                            body: formData
                        })
                        history.push("/home/user");
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

                    {/* <TextField
                        id="outlined-basic" value={name} onChange={(e) => setName(e.target.value)}
                        label="Name" type="text"
                        variant="outlined" fullWidth required
                        margin="normal"
                    /> */}
                    <TextField id="outlined-basic"
                        value={values.email}
                        onChange={handleInputChange}
                        label="Email" type="email" variant="outlined"
                        fullWidth required margin="normal"
                        name="email"
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
                    <TextField id="outlined-basic"
                        value={values.password}
                        onChange={handleInputChange}
                        label="Password" type="password" autoComplete="current-password" variant="outlined"
                        fullWidth required margin="normal"
                        name="password"
                        {...(errors.password && { error: true, helperText: errors.password })}
                    />
                    <TextField id="outlined-basic" v
                        value={values.confirmpassword}
                        onChange={handleInputChange}
                        label="Confirm Password" type="password" autoComplete="current-password" variant="outlined"
                        fullWidth required margin="normal"
                        name="confirmpassword"
                        {...(errors.confirmpassword && { error: true, helperText: errors.confirmpassword })}
                    />
                    <Button onClick={signUp} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign up</Button>
                    <Typography style={{ color: 'red', margin: "5px" }}>
                        {fetcherror}
                    </Typography>
                    <Typography > Already have an account?
                        <NavLink to="/login" style={{ marginLeft: '5px' }} >
                            Sign in
                        </NavLink>

                    </Typography>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;