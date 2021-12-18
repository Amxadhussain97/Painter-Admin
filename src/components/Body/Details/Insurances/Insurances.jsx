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
import CardHeader from '@mui/material/CardHeader';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@mui/material/Toolbar';
import Popup from '../../../Popup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Divider } from '@material-ui/core';
import { useEffect } from 'react'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import EditIcon from '@mui/icons-material/Edit';
import Link from '@material-ui/core/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { InsuranceForm } from './InsuranceForm';
import ConfirmDialog from '../../../controls/ConfirmDialog';
import PdfView from '../../../controls/PdfView';
import Notification from '../../../controls/Notification';

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
        width: '200px',
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
        right: '2px',
        top: "-10px"


    },
    filename: {
        display: 'flex',
        justifyContent: 'center'
    }
}));


export default function Insurances(props) {
    let token = localStorage.getItem('token');
    token = token.replace(/^\"(.+)\"$/, "$1");

    let { id } = props
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openPopup, setOpenPopup] = useState(false);
    const [insuranceUrl, setInsuranceUrl] = useState([]);
    const [userInsurances, setUserInsurances] = useState([])
    const [reload, setReload] = useState(true)
    const [records, setRecords] = useState()
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [confirmPdfdialog, setConfirmPdfdialog] = useState({ isOpen: false, title: '', subTitle: '', pdf: '' })


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


        // result = await result.json();
        // setUserInsurances(result.list);

    }, [reload])





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

    async function deleteInsurance(id) {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        await fetch(`http://amaderlab.xyz/api/insurances/${id}`, {
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


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    const dropDownData = [
        { label: "Download" },
        { label: "View" },
    ]

    return (

        <>
            <div>


                <Toolbar>
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>



                <Box sx={{ flexGrow: 1 }}>

                    <Grid container spacing={4}>

                        {
                            userInsurances && userInsurances.map((insurance, i) =>
                                <Grid item xs={12} sm={6} md={2}>
                                    <Card className={classes.card} >
                                        <CardActionArea>

                                            <CardMedia
                                                className={classes.media}
                                                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKU8AKvr73t742BUC9sRZsSffv56L7SLB3RQ&usqp=CAU"
                                                title={insurance.name}
                                            />

                                            <CardContent>
                                                <Divider />
                                            </CardContent>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <CardHeader
                                                    avatar={
                                                        <PictureAsPdfIcon />
                                                    }

                                                    subheader={insurance.name}

                                                />
                                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', marginTop: '20px', marginRight: '10px' }}>


                                                    <EditIcon
                                                        onClick={() => { setOpenPopup(true); setRecordForEdit(insurance); }}
                                                        sx={{ fontSize: '20px', color: '#706a69', marginTop: '2px' }} />

                                                    <CloudDownloadIcon
                                                        onClick={() => window.location.replace(`http://amaderlab.xyz/${insurance.file_id}`)}
                                                        sx={{ fontSize: '20px', marginLeft: '5px', color: '#706a69', marginTop: '2px' }}
                                                    >


                                                    </CloudDownloadIcon>
                                                    <DeleteIcon
                                                        onClick={() => {
                                                            setConfirmDialog({
                                                                isOpen: true,
                                                                title: 'Are you sure to delete this record?',
                                                                subTitle: "You can't undo this operation",
                                                                onConfirm: () => { deleteInsurance(insurance.id); }
                                                            })
                                                        }}

                                                        sx={{ fontSize: '23px', marginLeft: '5px', color: 'red' }} />



                                                </Box>
                                            </Box>


                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )

                        }


                    </Grid>

                </Box>
                <Popup
                    title="Insert Details"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <InsuranceForm
                        reload={reload}
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit} />

                </Popup>
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
                <Notification
                notify={notify}
                setNotify={setNotify}
                />
            </div>


        </>
    )
}



