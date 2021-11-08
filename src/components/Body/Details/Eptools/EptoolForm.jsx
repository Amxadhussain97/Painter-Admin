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


const roles = [
    { id: 'Painter', title: 'Painter' },
    { id: 'Dealer', title: 'Dealer' },
    { id: 'Admin', title: 'Admin' },
]

const initialFValues = {
    name: '',
    model: '',
    amount: '',
    image_id: ''
}


export function EptoolForm(props) {
    const { reload, addOrEdit, recordForEdit } = props

    const [selectedFile, setSelectedFile] = useState(null);
    const [fetcherror, setFetcherror] = useState("");




    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('model' in fieldValues)
            temp.model = fieldValues.model ? "" : "This field is required."
        if ('amount' in fieldValues)
            temp.amount = fieldValues.amount.length > 2 ? "" : "Minimum 3 numbers required."
        // if ('role' in fieldValues)
        //     temp.role = fieldValues.role.length ? "" : "Please select a role"
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
    const imageHandler = (event) => {
        values['image_id'] = event.target.files[0];
        // console.log(selectedFile);
    };

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
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"
                            name="model"
                            label="model"
                            value={values.model}
                            onChange={handleInputChange}
                            type="text" variant="outlined" fullWidth required
                            margin="normal"
                            {...(errors.model && { error: true, helperText: errors.model })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"
                            name="amount"
                            label="amount"
                            value={values.amount}
                            onChange={handleInputChange}
                            type="text" variant="outlined" fullWidth required
                            margin="normal"
                            {...(errors.amount && { error: true, helperText: errors.amount })}
                        />

                    </Grid>
                    <Button variant="outlined" style={{ maxWidth: '90px', margin:'5px', fontSize: '12px', color: 'black', borderColor: 'white' }} startIcon={<ImageIcon fontSize="small" />}>
                        Image
                    </Button>
                    <input
                        // accept="image/*"
                        style={{margin:'10px'}}
                        id="image_id"
                        name="image_id"
                        multiple
                        type="file"
                        onChange={imageHandler}
                    />
                    {/* <Controls.RadioGroup
                        name="role"
                        label="Role"
                        value={values.role}
                        onChange={handleInputChange}
                        items={roles}
            
                    /> */}
                    <Typography style={{ color: 'red', margin: "5px", width: '100%' }}>
                        {errors.role}
                    </Typography>
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
