import React from 'react'
import { TextField } from '@material-ui/core';
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


const initialFValues = {
    phone: '',
}


export function SubuserForm(props) {
    const { reload, addOrEdit, recordForEdit, setOpenPopup } = props

    const [selectedFile, setSelectedFile] = useState(null);
    const [fetcherror, setFetcherror] = useState("");



    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? "" : "This field is required."
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
        <div>
            <Form onSubmit={handleSubmit}>
                <Grid container>

                    <Grid item xs={12} style={{ margin: '8px', marginLeft: '-5px' }}>
                        <Typography style={{fontWeight:'bold',color:'#70788A',marginLeft:'8px'}} variant="caption" display="block" gutterBottom>
                            Phone
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            name="phone"
                            value={values.phone}
                            style={{ background: '#F5F5F5' }}
                            onChange={handleInputChange}
                            type="text" variant="outlined" fullWidth required
                           
                            {...(errors.name && { error: true, helperText: errors.name })}
                        />

                    </Grid>
                
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

        </div>
    )
}
