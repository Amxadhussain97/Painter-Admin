import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Toolbar } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import { Box } from '@mui/material/node_modules/@mui/system';
import { useState } from 'react';
import Popup from '../../../Popup';
import { InsuranceForm } from './AddForm/InsuranceForm';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ConfirmDialog from '../../../controls/ConfirmDialog';

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }
// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
// ];







async function addOrEdit(insurance, resetForm) {

}

export default function Insurance(props) {
    let token = localStorage.getItem('token');
    token = token.replace(/^\"(.+)\"$/, "$1");
    let { id} = useParams();
    const [reload, setReload] = useState(true)
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [InsuranceUrl, setInsuranceUrl] = useState([]);
    const [userInsurances, setUserInsurances] = useState([])
    const [records, setRecords] = useState();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })




    useEffect(async () => {
        await fetch(`http://amaderlab.xyz/api/insurances?user_id=${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                setUserInsurances(data.list);
            })
            .catch(error => {

                // setFetcherror(error.message);
                // const timer = setTimeout(() => {
                //     setFetcherror();
                // }, 2300);

            })

    }, [reload])

    async function deleteInsurance(insurance_id) {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        await fetch(`http://amaderlab.xyz/api/insurances/${insurance_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        .then(() => {
               
            setReload(!reload);
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'success'
              })
        })
        .catch(error => {
            console.log("error", error.message);

        })
    };

    async function addOrEdit(insurance, resetForm) {
        const formData = new FormData();
        formData.append('file_id', insurance.file_id);
        formData.append('name', insurance.name);
        if (recordForEdit != null) {
            await fetch(`http://amaderlab.xyz/api/insurances/${insurance.id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            })
                .then(res => res.json())
                .catch(error => {
                    console.log("error", error.message);

                })


        }

        else {

            await fetch(`http://amaderlab.xyz/api/insurances?user_id=${id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            })
            .then(res => res.json())
            .then(res => {
              if (res.message != "Success") {
    
                setNotify({
                  isOpen: true,
                  message: res.message,
                  type: 'error'
                })
              }
              else {
                setNotify({
                  isOpen: true,
                  message: 'Inserted Successfully',
                  type: 'success'
                })
                setOpenPopup(false);
              }
            })
            .catch(error => {
              setNotify({
                isOpen: true,
                message: error.message,
                type: 'error'
              })
    
            })
        }
        setReload(!reload);
        setRecordForEdit(null);
        setOpenPopup(false);
    }






    return (
        <>
            <h4 style={{ color: '#007BFF', marginLeft: '14px' }}>User ID 01</h4>
            <Box maxWidth style={{ position: 'relative ', height: '60px', border: '1px solid #8F8CAE', margin: '10px', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '0px' }}>
                    <Toolbar>
                        <Button style={{ width: '100px',background:'#007BFF',textTransform:'none' }} variant="contained" startIcon={<AddIcon />}
                        // className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                        >
                            Add
                        </Button>

                    </Toolbar>
                </div>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    
                        {userInsurances && userInsurances.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" >
                                    <div style={{ display: 'flex' }}>
                                        <PictureAsPdfIcon sx={{ mr: 2 }} />
                                        {row.name}
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <CloudDownloadIcon onClick={() => window.location.replace(`http://amaderlab.xyz/${row.file_id}`)} style={{cursor:'pointer'}} sx={{ mr: 2 }} />
                                    <EditIcon onClick={() => { setOpenPopup(true); setRecordForEdit(row); }}  style={{cursor:'pointer'}}  sx={{ mr: 2 }} />
                                    <DeleteIcon onClick={() => {
                                                            setConfirmDialog({
                                                                isOpen: true,
                                                                title: 'Are you sure to delete this record?',
                                                                subTitle: "You can't undo this operation",
                                                                onConfirm: () => { deleteInsurance(row.id); }
                                                            })
                                                        }} style={{cursor:'pointer'}}  />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Popup
                title="Insert Details"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <InsuranceForm
                    reload={reload}
                    setOpenPopup={setOpenPopup}
                    recordForEdit={recordForEdit}
                    
                    addOrEdit={addOrEdit} />
            </Popup>
            <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />

        </>
    )
}
