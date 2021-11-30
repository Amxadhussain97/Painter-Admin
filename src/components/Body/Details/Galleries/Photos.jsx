import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { makeStyles } from '@material-ui/core/styles';
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
import { PhotoForm } from './PhotoForm';
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


export default function Photos() {
  let history = useHistory();

  let token = localStorage.getItem('token');
  token = token.replace(/^\"(.+)\"$/, "$1");
  const { galleryid } = useParams();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openPopup, setOpenPopup] = useState(false);
  const [reload, setReload] = useState(true);
  const [photos, setPhotos] = useState();
  const [records, setRecords] = useState()
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

  let { path, url } = useRouteMatch();

  useEffect(async () => {
    let result = await fetch(`http://amaderlab.xyz/api/galleries/${galleryid}/photos`, {
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

    formData.append('image_id', photo.image_id);
    if (recordForEdit != null) {
      await fetch(`http://amaderlab.xyz/api/galleries/${galleryid}/photos/${photo.id}`, {
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

      await fetch(`http://amaderlab.xyz/api/galleries/${galleryid}/photos`, {
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
    await fetch(`http://amaderlab.xyz/api/galleries/${galleryid}/photos/${photo_id}`, {
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
      </ImageList>

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



{/* <ImageListItem key={i}>
              <img
                src={`http://127.0.0.1:8000/${photo.image_id}?w=248&fit=crop&auto=format`}
                srcSet={`http://127.0.0.1:8000/${photo.image_id}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt='image'
         
              />
              <ImageListItemBar

                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about asds`}
                  >
                    <EditIcon onClick={() => { setOpenPopup(true); setRecordForEdit(photo); }} style={{ marginRight: '10px',marginRight:'15px' }} />
                    <DeleteIcon onClick={() => { deletePhoto(photo.id); }} />

                  </IconButton>
                }
              />
            </ImageListItem> */}