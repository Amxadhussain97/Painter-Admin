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
import PdfView from '../../../controls/PdfView';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GolfCourseSharp } from '@material-ui/icons';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import { CertificateForm } from './CertificateForm';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


let token = localStorage.getItem('token');
token = token.replace(/^\"(.+)\"$/, "$1");


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
        height: 100
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


export default function Certificates(props) {
    let { id } = props
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openPopup, setOpenPopup] = useState(false);
    const [certificateUrl, setCertificateUrl] = useState([]);
    const [userCertificates, setUserCertificates] = useState([])
    const [reload, setReload] = useState(true)
    const [records, setRecords] = useState()
    const [recordForEdit, setRecordForEdit] = useState(null)


    useEffect(async () => {
        let result = await fetch(`http://127.0.0.1:8000/api/certificates?user_id=${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
        result = await result.json();
        setUserCertificates(result.list);

    }, [])





    async function addOrEdit(certificate, resetForm) {
        const formData = new FormData();
        formData.append('file_id', certificate.image_id);
        formData.append('name', certificate.name);
        formData.append('model', certificate.model);
        formData.append('amount', certificate.amount);
        if (recordForEdit != null) {

            await fetch(`http://127.0.0.1:8000/api/eptools/${certificate.id}`, {
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

                })
        }
        setReload(!reload);
        setRecordForEdit(null);
        setOpenPopup(false);


    }




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

            <Grid container spacing={0} >
                {
                    userCertificates && userCertificates.map((certificates, i) =>
                        <Grid key={i} item xs={12} sm={6} md={3}>
                            <Card className={classes.card} >
                                <CardActionArea>

                                    <CardMedia
                                        className={classes.media}
                                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKU8AKvr73t742BUC9sRZsSffv56L7SLB3RQ&usqp=CAU"
                                        title={certificates.name}
                                    />

                                    <CardContent>
                                        <Divider />
                                    </CardContent>
                                    <Box sx={{display:'flex',flexDirection:'column'}}>
                                      
                                            <CardHeader
                                                avatar={
                                                    <PictureAsPdfIcon />
                                                }

                                                subheader={certificates.name}

                                            />

                                            <CloudDownloadIcon />

                                    </Box>


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
                    <CertificateForm
                        reload={reload}
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit} />

                </Popup>

            </Grid>



        </div>
    )
}
