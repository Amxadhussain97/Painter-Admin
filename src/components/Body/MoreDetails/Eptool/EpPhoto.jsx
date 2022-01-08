import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import '../Gallery/GalleryStyle.css';
import PopupImage from '../../../PopupImage';
// import { Box } from '@mui/system';
import {
  useHistory
} from "react-router-dom";
import { useRouteMatch } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@mui/material/Toolbar';
import Controls from '../../../controls/Controls';
import Popup from '../../../Popup';
import { PhotoForm } from '../Gallery/PhotoForm';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ConfirmDialog from '../../../controls/ConfirmDialog';
import { Typography } from '@material-ui/core';
import Notification from '../../../controls/Notification';
import { Box } from '@material-ui/core';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  icon: {

    "&:hover": {
      // width:"28px",
      // height:'28px',
      color: 'white',
    }
  },
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


export default function EpPhoto() {

  let history = useHistory();
  let { eptoolId } = useParams();
  let token = localStorage.getItem('token');
  token = token.replace(/^\"(.+)\"$/, "$1");
  const { galleryid } = useParams();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openPopup, setOpenPopup] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [imageId, setImageId] = useState(false);
  const [reload, setReload] = useState(true);
  const [photos, setPhotos] = useState();
  const [records, setRecords] = useState();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

  let { path, url } = useRouteMatch();

  useEffect(async () => {
    let result = await fetch(`http://amaderlab.xyz/api/eptools/${eptoolId}/photos`, {
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
      await fetch(`http://amaderlab.xyz/api/eptools/${eptoolId}/photos/${photo.id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
           "Accept": "application/json"
        },
        body: formData
      })
      .then(res => res.json())
      .then(res => {
        if (res.message != "success") {

          setNotify({
            isOpen: true,
            message: 'Image Must be less than 2048mb',
            type: 'error'
          })
        }
        else {
          setNotify({
            isOpen: true,
            message: 'Updated Successfully',
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

    else {
        formData.append('image_id[]', photo.image_id);
      await fetch(`http://amaderlab.xyz/api/eptools/${eptoolId}/photos`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: formData
      })
        .then(res => res.json())
        .then(res => {
          console.log("res deko ", res.status);
          if (res.message != "Success") {

            setNotify({
              isOpen: true,
              message: 'Image Must be less than 2048mb',
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



  }


  async function deletePhoto(photo_id) {

    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    await fetch(`http://amaderlab.xyz/api/eptools/${eptoolId}/photos/${photo_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    })
      .then(() => {
        setNotify({
          isOpen: true,
          message: 'Deleted Successfully',
          type: 'success'
        })
        setReload(!reload);
      })
      .catch(error => {
        setNotify({
          isOpen: true,
          message: error.message,
          type: 'error'
        })
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

      <KeyboardBackspaceIcon style={{ cursor: 'pointer', fontSize: '30px', margin: '10px' }}
        onClick={() => {
          history.goBack()
        }} />
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


      {photos ? <Divider /> : null}




      <Grid style={{ margin: '10px' }} container spacing={0}>
        {
          photos && photos.map((photo, i) => (
            <Grid item xs={12} sm={6} md={2}>
              <ImageListItem key={i} style={{ height: "80%", width: "95%" }}>
                <img
                  onClick={() => { setOpenImage(true); setImageId(photo.image_id); }}
                  style={{ cursor: 'pointer' }}
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
                      <EditIcon className={classes.icon} onClick={() => { setOpenPopup(true); setRecordForEdit(photo); }} style={{ marginRight: '10px', marginRight: '15px' }} />
                      <DeleteIcon
                        className={classes.icon}
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




      <Popup
        title="Insert Details"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <PhotoForm
          reload={reload}
          setOpenPopup={setOpenPopup}
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit} />

      </Popup>
      <PopupImage openImage={openImage}
        setOpenImage={setOpenImage}
        imageId={imageId} />

      <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

    </>
  );

}


