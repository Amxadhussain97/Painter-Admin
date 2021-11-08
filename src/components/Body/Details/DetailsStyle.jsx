import { makeStyles } from '@material-ui/core/styles';
import { blue, blueGrey, red } from '@mui/material/colors';



export const useStyles = makeStyles((theme) => ({

  

    //wrapper of main component
    wrapper: {
        // marginTop:'10px',
        height:"100vh",
        background:"red",
        fontSize:"1rem",
        color:"#f9f9f9",
        [theme.breakpoints.down("sm")]:{
            padding: theme.spacing(2,2),
         
        }
    }

}));