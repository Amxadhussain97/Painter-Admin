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
import { CertificateForm } from './AddForm/CertificateForm';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ConfirmDialog from '../../../controls/ConfirmDialog';
import Notification from '../../../controls/Notification'
import axios from "axios"
import LinearProgress from '@mui/material/LinearProgress';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    icon: {
        cursor: 'pointer',
        "&:hover": {
            color: '#007BFF',
        }
    }
}));






async function addOrEdit(certificate, resetForm) {

}

export default function Certificate(props) {
    let token = localStorage.getItem('token');
    token = token.replace(/^\"(.+)\"$/, "$1");
    let { id } = useParams();
    const [reload, setReload] = useState(true)
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [certificateUrl, setCertificateUrl] = useState([]);
    const [userCertificates, setUserCertificates] = useState([])
    const [records, setRecords] = useState();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState()


    const classes = useStyles();


    useEffect(async () => {
        await fetch(`http://amaderlab.xyz/api/certificates?user_id=${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                setUserCertificates(data.list);
            })
            .catch(error => {


            })

    }, [reload])

    async function deleteCertificate(certificate_id) {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        await fetch(`http://amaderlab.xyz/api/certificates/${certificate_id}`, {
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

    async function addOrEdit(certificate, resetForm) {
        const formData = new FormData();
        formData.append('file_id', certificate.file_id);
        formData.append('name', certificate.name);
        setOpenPopup(false);

        if (recordForEdit != null) {
            axios
                .post(`http://amaderlab.xyz/api/certificates/${certificate.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`,
                    },
                    onUploadProgress: data => {
                        setProgress(Math.round((100 * data.loaded) / data.total));
                    },
                })
                .then((response) => {
                    setProgress(0);
                    setReload(!reload);
                    setNotify({
                        isOpen: true,
                        message: 'Updated Successfully',
                        type: 'success'
                    })
                })
                .catch(error => {
                    setProgress(0);
                    setReload(!reload);
                    setNotify({
                        isOpen: true,
                        message: error.response.data.message,
                        type: 'error'
                    })
                   
                })


        }
        else {
            axios
                .post(`http://amaderlab.xyz/api/certificates?user_id=${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`,
                    },
                    onUploadProgress: data => {
                        setProgress(Math.round((100 * data.loaded) / data.total));
                    },
                })
                .then((response) => {
                    setProgress(0);
                    setReload(!reload);
                    setNotify({
                        isOpen: true,
                        message: 'Inserted Successfully',
                        type: 'success'
                    })
                 
                })
                .catch(error => {
                    setProgress(0);
                    setReload(!reload);
                    setNotify({
                        isOpen: true,
                        message: error.response.data.message,
                        type: 'error'
                    })
               
                })
        }

    }






    return (
        <>
        
            <h4 style={{ color: '#007BFF', marginLeft: '14px' }}>User ID {props.userId}</h4>
            <Box maxWidth style={{ position: 'relative ', height: '60px', border: '1px solid #8F8CAE', margin: '10px', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '0px' }}>
                    <Toolbar>
                        <Button style={{ width: '100px', background: '#007BFF', textTransform: 'none' }} variant="contained" startIcon={<AddIcon />}
                            // className={classes.newButton}
                            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                        >
                            Add
                        </Button>

                    </Toolbar>
                </div>
            </Box>

            {progress > 0 ? <Box sx={{ width: '100%' }}><LinearProgress variant="buffer" value={progress} valueBuffer={0} /></Box> : null}



            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {userCertificates && userCertificates.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" >
                                    <div style={{ display: 'flex' }}>
                                        <PictureAsPdfIcon sx={{ mr: 2 }} />
                                        {row.name}
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <CloudDownloadIcon onClick={() => window.location.replace(`http://amaderlab.xyz/${row.file_id}`)} className={classes.icon} sx={{ mr: 2 }} />
                                    <EditIcon onClick={() => { setOpenPopup(true); setRecordForEdit(row); }} className={classes.icon} sx={{ mr: 2 }} />
                                    <DeleteIcon onClick={() => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: 'Are you sure to delete this record?',
                                            subTitle: "You can't undo this operation",
                                            onConfirm: () => { deleteCertificate(row.id); }
                                        })
                                    }} className={classes.icon} />
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
                <CertificateForm
                    reload={reload}
                    setOpenPopup={setOpenPopup}
                    recordForEdit={recordForEdit}

                    addOrEdit={addOrEdit} />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

        </>
    )
}
