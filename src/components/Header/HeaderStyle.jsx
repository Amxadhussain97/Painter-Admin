import { makeStyles } from '@material-ui/core/styles';
import { blue, blueGrey, red } from '@mui/material/colors';



export const useStyles = makeStyles((theme) => ({

    toolebar: {
        display: "flex",
    },
    navAvatar: {
        width: "35px",
        height: "35px",

    },
    //sideNav
    drawer: {
        width: "230px",
        marginTop: "80px",
        fontSize:"1rem",
        borderRadius:'10px',
        [theme.breakpoints.down("xs")]:{
            marginTop: "0px",
        }

    },
    navlinks: {
      

    },
    activeclasslinks: {
        color:"#2b475e",
        "& div": {
            color: "#2b475e",
            
        },
        background:'#f9f9f9',

    },
    navButton:{
      width:"100%",
    },

    //wrapper of main component
    wrapper: {
        // marginTop:'10px',
        height:"100vh",
        background:"#ffffff",
        fontSize:"1rem",
        padding: theme.spacing(10,2, 0, 11),//1 means 8 pixel top,right,bottom,left
        [theme.breakpoints.down("sm")]:{
            padding: theme.spacing(2,2),
            marginTop:'60px',
        }
    }

}));