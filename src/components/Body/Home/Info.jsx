import React from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import PersonaIInfo from "../Details/PersonalInfo";
import BuisnessInfo from "../Details/BuisnessInfo";
import Navbar from "../../Header/Navbar";
import SideNav from "../../Header/SideNav";
import { useStyles } from "../../Header/HeaderStyle";
import { styled } from '@mui/material/styles';
import { Box } from "@mui/material/node_modules/@mui/system";
import { Paper } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const AntTabs = styled(Tabs)({
    borderBottom: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
        backgroundColor: '#1890ff',
    },
});


const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,

    [theme.breakpoints.up('sm')]: {
        minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    width: 220,
    indicatorColor: '#fff',
    color: '#08386A',
    fontWeight: 'bold',
    fontFamily: [
        'Open Sans',
        'sans-serif',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        color: '#40a9ff',
        opacity: 1,
    },
    '&.Mui-selected': {
        color: ' #08386A',
        fontWeight: 'bold',
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },

}));





const Info = props => {

    const search = useLocation().search;
    const user = new URLSearchParams(search).get('user');


    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);



    const handleDrawerToggle = ({ props }) => {
        setMobileOpen(!mobileOpen);

    };

    // const { match, history } = props;
    // const { params } = match;
    // const { page } = params;
    
    let history = useHistory();

    let { page } = useParams();


    useEffect(() => {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token');
            const {
                exp
            } = jwt_decode(token)

            const expirationTime = (exp * 1000) - 60000
            if (Date.now() >= expirationTime) {
                localStorage.removeItem('token');
                history.push("/login");

            }
        }
        else history.push("/login");
    });

    const tabNameToIndex = {
        0: "personalinfo",
        1: "buisnessinfo"
    };

    const indexToTabName = {
        personalinfo: 0,
        buisnessinfo: 1
    };

    const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

    const handleChange = (event, newValue) => {
        user?history.push(`/home/info/${tabNameToIndex[newValue]}?user=${user}`):history.push(`/home/info/${tabNameToIndex[newValue]}`);
        
        setSelectedTab(newValue);
    };

    return (
        <>
            <Navbar handleDrawerToggle={handleDrawerToggle} />
            <SideNav position="fixed" mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

            <Box className={classes.wrapper}>

                <Paper elevation={2} >
                    <AntTabs value={selectedTab} onChange={handleChange}>
                        <AntTab label="Personal Info" />
                        <AntTab label="Buisness Info" />
                    </AntTabs>
                    {selectedTab === 0 && <PersonaIInfo />}
                    {selectedTab === 1 && <BuisnessInfo />}
                </Paper>

            </Box>
        </>

    );
};

export default Info;
