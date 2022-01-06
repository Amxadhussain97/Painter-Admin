import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import Controls from '../components/controls/Controls';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))



export default function PopupImage(props) {

    const { imageId,title, children, openImage, setOpenImage } = props;
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = (value) => {
        setOpenImage(false);
      };


    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (

        <Dialog onClose={handleClose} open={openImage}>
            <img
                src={`http://amaderlab.xyz/${imageId}?w=164&h=104&fit=crop&auto=format`}
                srcSet={`http://amaderlab.xyz/${imageId}?w=164&h=104&fit=crop&auto=format&dpr=2 2x`}
                alt={`title`}
                loading="lazy"
            />
        </Dialog>

        // <Dialog open={openPopup} maxWidth="sm" classes={{ paper: classes.dialogWrapper }}>
        //     <DialogTitle className={classes.dialogTitle}>
        //         <div style={{ display: 'flex' }}>
        //             <Typography variant="h6" component="div" style={{  flexGrow: 1,color:'#313F5E',fontWeight:'bold' }}>
        //                 {title}
        //             </Typography>
        //             {/* <Controls.ActionButton
        //                 color="secondary"
        //                 onClick={()=>{setOpenPopup(false)}}>
        //                 <CloseIcon />
        //             </Controls.ActionButton> */}

        //         </div>
        //     </DialogTitle>
        //     <DialogContent sx={{p:4}} dividers>
        //     {children}
        //     </DialogContent>
        // </Dialog>
    )
}
