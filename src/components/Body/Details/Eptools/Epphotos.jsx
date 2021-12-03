import React from 'react'
import { useParams } from 'react-router';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PhotoCameraTwoToneIcon from '@mui/icons-material/PhotoCameraTwoTone';
import { Divider } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useHistory


} from "react-router-dom";
import { useRouteMatch } from 'react-router';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { ListItemSecondaryAction } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@mui/material/Toolbar';
import Controls from '../../../controls/Controls';
import Popup from '../../../Popup';
import { GalleryForm } from '../Galleries/GalleryForm';
import { PhotoForm } from '../Galleries/PhotoForm';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ConfirmDialog from '../../../controls/ConfirmDialog';

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#fff"
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em"
        }
    },
    blogsContainer: {
        paddingTop: theme.spacing(3)
    },
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3)
    },
    card: {
        width: '230px',
        height: '200px',
    },
    media: {
        height: 80,
        marginTop: '30px'

    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    author: {
        display: "flex"
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center",
        paddingLeft: '15px'
    },
    newButton: {
        position: 'absolute',
        right: '12px'


    },
    filename: {
        display: 'flex',
        justifyContent: 'center'
    }
}));



export default function Epphotos() {
    let { eptoolid } = useParams();
    let { path, url } = useRouteMatch();
    let history = useHistory();
    let token = localStorage.getItem('token');
    token = token.replace(/^\"(.+)\"$/, "$1");
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openPopup, setOpenPopup] = useState(false);
    const [reload, setReload] = useState(true);
    const [photos, setPhotos] = useState();
    const [records, setRecords] = useState()
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    useEffect(async () => {
        let result = await fetch(`http://amaderlab.xyz/api/eptools/${eptoolid}/photos`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .catch(err => {
                console.log(err.message);
            })
        result = await result.json();

        setPhotos(result.photos);
        console.log("galler ", result);


    }, [reload])


    async function addOrEdit(photo, resetForm) {

        const formData = new FormData();


        if (recordForEdit != null) {
            formData.append('image_id', photo.image_id);
            await fetch(`http://amaderlab.xyz/api/eptools/${eptoolid}/photos/${photo.id}`, {
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
            formData.append('image_id[]', photo.image_id);

            await fetch(`http://amaderlab.xyz/api/eptools/${eptoolid}/photos`, {
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


    async function deletePhoto(photo_id) {

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        await fetch(`http://amaderlab.xyz/api/eptools/${eptoolid}/photos/${photo_id}`, {
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
            <Toolbar>
                <KeyboardBackspaceIcon style={{ cursor: 'pointer', fontSize: '35px', marginLeft: '-26px' }}
                    onClick={() => {
                        history.goBack()
                    }} />
                <Controls.Button
                    text="Add New"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className={classes.newButton}
                    onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                />
            </Toolbar>
            <Grid container spacing={0}>
                {
                    photos && photos.map((photo, i) => (
                        <Grid item xs={12} md={4}>
                            <ImageListItem key={i} style={{ height: "330px", width: "400px" }}>
                                <img
                                    src={`http://amaderlab.xyz/${photo.image_id}?w=164&h=104&fit=crop&auto=format`}
                                    srcSet={`http://amaderlab.xyz/${photo.image_id}?w=164&h=104&fit=crop&auto=format&dpr=2 2x`}
                                    alt={`title`}
                                    loading="lazy"
                                   
                                />
                                <ImageListItemBar

                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={`info about asds`}
                                        >
                                            <EditIcon onClick={() => { setOpenPopup(true); setRecordForEdit(photo); }} style={{ marginRight: '10px', marginRight: '15px' }} />
                                            <DeleteIcon
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => { deletePhoto(photo.id); }
                                                    })
                                                }}



                                            />

                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        </Grid>

                    ))

                }




            </Grid>



            {/* 


            <ImageList sx={{ width: 1350, height: 600 }} cols={3} >

                {
                    photos && photos.map((photo, i) => (
                        <ImageListItem key={i}>
                            <img
                                src={`http://amaderlab.xyz/${photo.image_id}?w=164&h=104&fit=crop&auto=format`}
                                srcSet={`http://amaderlab.xyz/${photo.image_id}?w=164&h=104&fit=crop&auto=format&dpr=2 2x`}
                                alt={`title`}
                                loading="lazy"
                            />
                            <ImageListItemBar

                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about asds`}
                                    >
                                        <EditIcon onClick={() => { setOpenPopup(true); setRecordForEdit(photo); }} style={{ marginRight: '10px', marginRight: '15px' }} />
                                        <DeleteIcon
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { deletePhoto(photo.id); }
                                                })
                                            }}



                                        />

                                    </IconButton>
                                }
                            />
                        </ImageListItem>


                    ))}
            </ImageList> */}

            <Popup
                title="Insert Details"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <PhotoForm
                    reload={reload}
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />

            </Popup>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

        </>
    );

}

