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
import { collapseClasses, Toolbar } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import { Box } from '@mui/material/node_modules/@mui/system';
import { useState } from 'react';
import Popup from '../../../Popup';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ConfirmDialog from '../../../controls/ConfirmDialog';
import GalleryForm from './Addform/GalleryForm';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { Divider } from '@material-ui/core';
import FolderIcon from '@mui/icons-material/Folder';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemSecondaryAction } from '@mui/material';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { useRouteMatch } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    icon: {
       cursor:'pointer',
      "&:hover": {
        color: '#007BFF',
      }
    }
}));



async function addOrEdit(gallery, resetForm) {

}

export default function GalleryDetails(props) {


    let { path, url } = useRouteMatch();

    let token = localStorage.getItem('token');
    token = token.replace(/^\"(.+)\"$/, "$1");
    const [dense, setDense] = useState(false);
    let { id } = useParams();
    const classes = useStyles();
    const [reload, setReload] = useState(true)
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [secondary, setSecondary] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [galleryUrl, setCalleryUrl] = useState([]);
    const [galleries, setGalleries] = useState();
    const [records, setRecords] = useState();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })



    useEffect(async () => {
        await fetch(`http://amaderlab.xyz/api/galleries?user_id=${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                setGalleries(data.Galleries);
            })
            .catch(error => {

                // setFetcherror(error.message);
                // const timer = setTimeout(() => {
                //     setFetcherror();
                // }, 2300);

            })



    }, [reload])



    async function addOrEdit(gallery, resetForm) {
        const formData = new FormData();
        formData.append('name', gallery.name);
        if (recordForEdit != null) {
            await fetch(`http://amaderlab.xyz/api/galleries/${gallery.id}`, {
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

            await fetch(`http://amaderlab.xyz/api/galleries?user_id=${id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            })
                .then(res => res.json())
                .catch(error => {
                    console.log(error.message);

                })
        }
        setReload(!reload);
        setRecordForEdit(null);
        setOpenPopup(false);


    }


    async function deleteGallery(gallery_id) {

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        await fetch(`http://amaderlab.xyz/api/galleries/${gallery_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(() => {
                console.log("delete successfull");
                setReload(!reload);
            })
            .catch(error => {
                console.log("error", error.message);

            })
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };





    return (
        <>
            <h4 style={{ color: '#007BFF', marginLeft: '14px' }}>User ID 01</h4>
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
            <Grid container >
                {
                    galleries && galleries.map((gallery, i) =>

                        <Grid key={i} item xs={12} md={12}>

                            <Demo>
                                <List dense={dense}>
                                    {generate(
                                        <ListItem
                                            // component={Link}
                                            // to={`${url}/${gallery.id}`}
                                            secondaryAction={

                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon
                                                    className={classes.icon} 
                                                        onClick={() => {
                                                            setConfirmDialog({
                                                                isOpen: true,
                                                                title: 'Are you sure to delete this record?',
                                                                subTitle: "You can't undo this operation",
                                                                onConfirm: () => { deleteGallery(gallery.id); }
                                                            })
                                                        }}
                                                    // onClick={() => { deleteGallery(gallery.id); }} 


                                                    />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemSecondaryAction style={{ marginRight: '30px' }}>
                                                <IconButton>
                                                    <EditIcon className={classes.icon}  onClick={() => { setOpenPopup(true); setRecordForEdit(gallery); }} />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                            <NavLink to={`${url}/${gallery.id}/photos`} style={{ display: 'flex', textDecoration: 'none', color: 'Black' }}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <FolderIcon />
                                                    </Avatar>
                                                </ListItemAvatar>

                                                <ListItemText
                                                    style={{ marginTop: '10px' }}
                                                    primary={gallery.name}
                                                    secondary={secondary ? 'Secondary text' : null}
                                                />
                                            </NavLink>
                                        </ListItem>,
                                    )}
                                </List>
                            </Demo>
                            <Divider />
                        </Grid>

                    )
                }


            </Grid>
            <Popup
                title="Insert Details"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <GalleryForm
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

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));
function generate(element: React.ReactElement) {
    return [0].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}
