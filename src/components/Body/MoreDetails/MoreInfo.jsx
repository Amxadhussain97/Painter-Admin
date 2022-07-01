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
import Eptool from "./Eptool/Eptool";
import Certificate from "./Certificate/Certificate";
import Gallery from "./Gallery/Gallery";
import Subuser from "./Subuser/Subuser";
import Linkeduser from "./Linkeduser/Linkeduser";
import Insurance from "./Insurance/Insurance";
import { useParams } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Protected from "../../Protected";
import Photos from "./Gallery/Photos";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom'


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





const MoreInfo = props => {
    let { id } = useParams();
    let userId = id;
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = ({ props }) => {
        setMobileOpen(!mobileOpen);

    };
    let location = useLocation()
    const { match, history } = props;
    const { params } = match;
    const { type } = params;
    let role = "Admin";
    
    if(location.state)  role = location.state.role
    // if (location.state!== null || location.state!== undefined) role = location.state.role

    let subuser = "SubUser", linkeduser = "LinkedUser"

    if (role === 'Painter') {
        subuser = "SubPainter"
        linkeduser = "LinkedDealer"
    }
    else if (role === 'Dealer') {
        subuser = "SubDealer"
        linkeduser = "LinkedPainter"
    }

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
        0:"BuisnessInfo",
        1: "Eptools",
        2: "Certificates",
        3: "Insurances",
        4: "Galleries",
        5: "SubUser",
        6: "LinkedUser",
    };

    const indexToTabName = {
        BuisnessInfo: 0,
        Eptools: 1,
        Certificates: 2,
        Insurances: 3,
        Galleries: 4,
        SubUser:5,
        LinkedUser:6,
    };

    const [selectedTab, setSelectedTab] = React.useState(indexToTabName[type]);


    useEffect(()=>{
        console.log("firest type ",type)
      setSelectedTab(indexToTabName[type])
    },[type])




    const handleChange = (event, newValue) => {
        history.push({
            pathname: `/home/moreinfo/${id}/${tabNameToIndex[newValue]}`,
            state: { role: role }
        });
        setSelectedTab(newValue);
    };

    return (
        <>
            <Navbar handleDrawerToggle={handleDrawerToggle} />
            <SideNav position="fixed" mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

            <Box className={classes.wrapper}>

                <Paper elevation={2} >
                    <AntTabs variant="scrollable" value={selectedTab} onChange={handleChange}>
                        <AntTab label="Buisness Info" />
                        <AntTab label="Eptools" />
                        <AntTab label="Certificates" />
                        <AntTab label="Insurances" />
                        <AntTab label="Galleries" />
                        <AntTab label={subuser}/>
                        <AntTab label={linkeduser} />
                    </AntTabs>
                    {selectedTab === 0 && <BuisnessInfo id={id} />}
                    {selectedTab === 1 && <Eptool userId={userId} />}
                    {selectedTab === 2 && <Certificate userId={userId} />}
                    {selectedTab === 3 && <Insurance userId={userId} />}
                    {selectedTab === 4 && <Gallery userId={userId} />}
                    {selectedTab === 5 && <Subuser userId={userId} />}
                    {selectedTab === 6 && <Linkeduser userId={userId}/>}
                </Paper>

            </Box>

        </>

    );
};

export default MoreInfo;
