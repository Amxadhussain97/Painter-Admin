import React from 'react'
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Form } from '../../../../Registration/UseForm'
import { Input } from '@mui/material';
import Controls from '../../../../controls/Controls';
import { UseForm } from '../../../../Registration/UseForm'
import { useState } from 'react';
import { Typography } from '@material-ui/core';
import { useEffect } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import { Button as MuiButton, makeStyles } from "@material-ui/core";


const initialFValues = {
    name: '',
    file_id: ''
}


export function InsuranceForm(props) {
    const { reload, addOrEdit, recordForEdit, setOpenPopup } = props

    const [selectedFile, setSelectedFile] = useState(null);
    const [fetcherror, setFetcherror] = useState("");



    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('file_id' in fieldValues)
            temp.file = fieldValues.file_id ? "" : "Please insert a pdf file"
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

    const fileHandler = (event) => {
        values['file_id'] = event.target.files[0];
    };

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            console.log("validated ");
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
                            Name
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            name="name"
                            value={values.name}
                            style={{ background: '#F5F5F5' }}
                            onChange={handleInputChange}
                            type="text" variant="outlined" fullWidth required
                           
                            {...(errors.name && { error: true, helperText: errors.name })}
                        />

                    </Grid>
                    <Button variant="outlined" style={{ maxWidth: '90px', margin: '5px', fontSize: '12px', color: 'black', borderColor: 'white' }} startIcon={<ImageIcon fontSize="small" />}>
                        File
                    </Button>
                    <input
                        // accept="image/*"
                        style={{ margin: '10px' }}
                        id="image_id"
                        name="image_id"
                        multiple
                        type="file"
                        onChange={fileHandler}
                    />
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
