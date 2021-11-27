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


const initialFValues = {
    name: '',
}


export function GalleryForm(props) {
    const { reload, addOrEdit, recordForEdit } = props

    const [selectedFile, setSelectedFile] = useState(null);
    const [fetcherror, setFetcherror] = useState("");



    const validate = (fieldValues = values) => {
        let temp = { ...errors }
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
        <div>
            <Form onSubmit={handleSubmit}>
                <Grid container>

                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"
                            name="name"
                            label="name"
                            value={values.name}
                            onChange={handleInputChange}
                            type="text" variant="outlined" fullWidth required
                            margin="normal"
                            {...(errors.name && { error: true, helperText: errors.name })}
                        />
                    </Grid>
        
                  
                   
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit"

                        />
                    </div>
                </Grid>
            </Form>

        </div>
    )
}