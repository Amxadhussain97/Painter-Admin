import React from 'react'
import { Box, TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Form } from '../../../Registration/UseForm';
import { Input } from '@mui/material';
import Controls from '../../../controls/Controls';
import { UseForm } from '../../../Registration/UseForm';
import { useState } from 'react';
import { Typography } from '@material-ui/core';
import { useEffect } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

const initialFValues = {
    phone: '',
    name: '',
    area: '',
    district: '',
    subdistrict: '',
}





export function LinkeduserForm(props) {
    const { reload, addOrEdit, recordForEdit, setOpenPopup } = props

    const [selectedFile, setSelectedFile] = useState(null);
    const [fetcherror, setFetcherror] = useState("");
    const [disValue, setDisValue] = useState("");
    const [subDisValue, setSubDisValue] = useState("");
    const [district, setDistrict] = useState(null);
    const [subdistrict, setSubDistrict] = useState(null);
    const [rootsubdistrict, setRootSubDistrict] = useState(null);
    let token = localStorage.getItem('token');
    token = token.replace(/^\"(.+)\"$/, "$1");



    const [age, setAge] = React.useState('');

    const handleChange = (e, id) => {
        // console.log("val ",e.target);
        // setAge(e.target.value);
        // console.log("selected ",e.target);

    };
    const handleDistrictClick = (e, id) => {
        setDisValue(e.target.innerText);
        const filteredRows = rootsubdistrict.filter((row) => {
            return row.district_id === id
        });
        setSubDistrict(filteredRows)
        values.district = e.target.innerText;
    };

    const handleSubDistrictClick = (e, id) => {
        setSubDisValue(e.target.innerText);
        values.subdistrict = e.target.innerText;
    };


    useEffect(async () => {
        await fetch(`http://amaderlab.xyz/api/districtsandsubdistricts`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                setDistrict(data.districts);
                setRootSubDistrict(data.subdistricts);
            })
            .catch(error => {
            })




    }, [])






    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? "" : "This field is required."
        if ('area' in fieldValues)
            temp.area = fieldValues.area ? "" : "This field is required."
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."

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
    } = UseForm(initialFValues, true, validate);



    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }

    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [reload])




    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Grid container>

                    <Grid item xs={12} style={{ margin: '8px', marginLeft: '-5px' }}>
                    <Typography style={{ fontWeight: 'bold', color: '#70788A', marginLeft: '8px' }} variant="caption" display="block" gutterBottom>
                           Name
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            name="name"

                            value={values.name}
                            onChange={handleInputChange}
                            style={{ background: '#F5F5F5' }}
                            type="text" variant="outlined" fullWidth required
                            margin="normal"
                            {...(errors.name && { error: true, helperText: errors.name })}
                        />
                        <Typography style={{ fontWeight: 'bold', color: '#70788A', marginLeft: '8px' }} variant="caption" display="block" gutterBottom>
                            Phone
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            name="phone"
                            value={values.phone}
                            style={{ background: '#F5F5F5' }}
                            onChange={handleInputChange}
                            type="text" variant="outlined" fullWidth required

                            {...(errors.name && { error: true, helperText: errors.phone })}
                        />
                         <Typography style={{ fontWeight: 'bold', color: '#70788A', marginLeft: '8px' }} variant="caption" display="block" gutterBottom>
                            Area
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            name="area"
    
                            style={{ background: '#F5F5F5' }}
                            value={values.area}
                            onChange={handleInputChange}
                            type="text" variant="outlined" fullWidth required
                            margin="normal"
                            {...(errors.area && { error: true, helperText: errors.area })}
                        />







                    </Grid>
                    <FormControl style={{ width: '150px' }}>
                        <InputLabel id="demo-simple-select-label">District</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={disValue}
                            label="District"
                            onChange={handleChange}
                        >
                            {
                                district && district.map((item, index) =>

                                    <MenuItem value={item.district} key={index} onClick={(e) => handleDistrictClick(e, item.id)}>{item.district}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: '150px' }}>
                        <InputLabel id="demo-simple-select-label">SubDistrict</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subDisValue}
                            label="SubDistrict"
                            onChange={handleChange}
                        >
                            {
                                subdistrict && subdistrict.map((item, index) =>

                                    <MenuItem onClick={(e) => handleSubDistrictClick(e, item.id)} value={item.subdistrict} key={index} >{item.subdistrict}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>






                    <Typography style={{ color: 'red', margin: "5px", width: '100%' }}>
                        {fetcherror}
                    </Typography>
                    <div style={{ marginTop: '10px' }}>
                        <Controls.Button
                            type="submit"
                            text="Submit"
                            color="#007BFF"


                        />

                        <Controls.Button
                            text="Cancel"
                            color="#FC5B61"
                            onClick={() => { setOpenPopup(false) }}

                        />
                    </div>
                </Grid>
            </Form>

        </>
    )
}
