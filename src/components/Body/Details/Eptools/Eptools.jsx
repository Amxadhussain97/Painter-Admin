import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Pagination from '@material-ui/lab/Pagination';
import { useState } from 'react'
import Controls from '../../../controls/Controls';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@mui/material/Toolbar';
import Popup from '../../../Popup';
import { useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Menu from '@mui/material/Menu';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@material-ui/core';
import ContentCut from '@mui/icons-material/ContentCut';
import EditIcon from '@mui/icons-material/Edit';
import { EptoolForm } from './EptoolForm';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';



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
        width: '300px',
        height: '270px',
    },
    media: {
        height: 140
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
        justifyContent: "center"
    },
    newButton: {
        position: 'absolute',
        right: '12px'


    }
}));



export default function Eptools(props) {
    let { id } = props;

    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [reload, setReload] = useState(true)
    const [records, setRecords] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState()
    const open = Boolean(anchorEl);
    const [userEptools, setUserEptools] = useState([])

    let token = localStorage.getItem('token');
    token = token.replace(/^\"(.+)\"$/, "$1");

    useEffect(async () => {
        let result = await fetch(`http://127.0.0.1:8000/api/eptools?user_id=${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
        result = await result.json();
        console.log("type ", typeof (result.eptools));


        setRecords(result.eptools);



    }, [reload])


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    async function deleteEptool(id) {
        await fetch(`http://127.0.0.1:8000/api/eptools/${id}`, {
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


    async function addOrEdit(eptool, resetForm) {
        let token = localStorage.getItem('token');
        token = token.replace(/^\"(.+)\"$/, "$1");
        const formData = new FormData();
        formData.append('image_id', eptool.image_id);
        formData.append('name', eptool.name);
        formData.append('model', eptool.model);
        formData.append('amount', eptool.amount);
        if (recordForEdit != null) {

            await fetch(`http://127.0.0.1:8000/api/eptools/${eptool.id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            })
                .then(res => res.json())
                .catch(error => {
                    console.log("error", error.message);
                    //    setFetcherror(error.message);
                    // const timer = setTimeout(() => {
                    //     setFetcherror();
                    // }, 2300);

                })


        }

        else {

            // for (const [key, value] of formData) {
            //     console.log(`key: ${key}`);
            //     console.log(`value: ${value}`);
            // }
            await fetch(`http://127.0.0.1:8000/api/eptools?user_id=${id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            })
                .then(res => res.json())
                .catch(error => {
                    console.log(error.message);
                    //    setFetcherror(error.message);
                    // const timer = setTimeout(() => {
                    //     setFetcherror();
                    // }, 2300);

                })
        }
        setReload(!reload);
        setRecordForEdit(null);
        setOpenPopup(false);


    }
    // const dropDownData = [

    //     { label: "Edit", icon: <ListItemIcon /> },
    //     { label: "Delete", icon: <ListItemIcon /> }

    // ]

    return (
        <div >

            <Toolbar>
                <Controls.Button
                    text="Add New"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className={classes.newButton}
                    onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                />
            </Toolbar>
            <Grid container spacing={3} >
                {
                    records && records.map((eptool, i) =>
                        <Grid key={i} item xs={12} sm={6} md={3}>
                            <Card className={classes.card}>

                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={"http://127.0.0.1:8000/" + eptool.image_id}
                                        title={eptool.name ? eptool.name : "NoName"}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {eptool.name}
                                        </Typography>

                                    </CardContent>
                                    <CardContent>
                                        <Divider />
                                    </CardContent>
                                    <Stack direction="row" spacing={1}>
                                        <Button variant="outlined" onClick={() => { deleteEptool(eptool.id); }} style={{ maxWidth: '90px', fontSize: '12px', color: 'red', borderColor: 'red', marginLeft: '45px' }} startIcon={<DeleteIcon fontSize="small" />}>
                                            Delete
                                        </Button>
                                        <Button variant="outlined" onClick={() => { setOpenPopup(true); setRecordForEdit(eptool); }} style={{ fontSize: '12px', color: '#2b475e', borderColor: '#2b475e', marginLeft: '20px' }} startIcon={<EditIcon fontSize="small" />}>
                                            Edit
                                        </Button>
                                    </Stack>
                                </CardActionArea>

                            </Card>
                        </Grid>

                    )
                }


                <Popup
                    title="Insert Details"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <EptoolForm
                        reload={reload}
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit} />

                </Popup>

            </Grid>



        </div>
    )
}
