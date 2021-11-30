import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PhotoCameraTwoToneIcon from '@mui/icons-material/PhotoCameraTwoTone';
import { Divider } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import ConfirmDialog from '../../../controls/ConfirmDialog';
import { useRouteMatch } from 'react-router';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { ListItemSecondaryAction } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@mui/material/Toolbar';
import Controls from '../../../controls/Controls';
import Popup from '../../../Popup';
import { GalleryForm } from './GalleryForm';



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





export default function Details() {
    let token = localStorage.getItem('token');
    token = token.replace(/^\"(.+)\"$/, "$1");

    const { id } = useParams();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openPopup, setOpenPopup] = useState(false);
    const [reload, setReload] = useState(true)
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [galleries, setGalleries] = useState();
    const [records, setRecords] = useState()
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    let { path, url } = useRouteMatch();


    useEffect(async () => {
        let result = await fetch(`http://amaderlab.xyz/api/galleries?user_id=${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
        result = await result.json();

        setGalleries(result.Galleries);


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

            <Toolbar>

                <Controls.Button
                    text="Add New"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className={classes.newButton}
                    onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                />
            </Toolbar>


            {/* <NavLink to={`${url}/2`} style={{ textDecoration: 'none', color: 'black' }} activeClassName="selected"> */}

            <Grid container spacing={2}>
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
                                                    <EditIcon onClick={() => { setOpenPopup(true); setRecordForEdit(gallery); }} />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                            <NavLink to={`${url}/${gallery.id}`} style={{ display: 'flex', textDecoration: 'none', color: 'Black' }}>
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

            {/* </NavLink> */}
            <Popup
                title="Insert Details"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <GalleryForm
                    reload={reload}
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
