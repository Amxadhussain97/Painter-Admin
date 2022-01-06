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
import { Route,Switch } from "react-router-dom";
import Protected from "../../Protected";
import Photos from "./Gallery/Photos";
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
    indicatorColor:'#fff',
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
    let { id} = useParams();
    console.log("id aise ",id);
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = ({ props }) => {
        setMobileOpen(!mobileOpen);

    };

    const { match, history } = props;
    const { params } = match;
    const { type } = params;

    const tabNameToIndex = {
        0: "Eptools",
        1: "Certificates",
        2: "Insurances",
        3: "Galleries",
        4: "Subpainters",
        5: "LinkedDealers",
    };

    const indexToTabName = {
        Eptools: 0,
        Certificates: 1,
        Insurances: 2,
        Galleries: 3,
        Subpainters: 4,
        inkedDealers:5
    };

    const [selectedTab, setSelectedTab] = React.useState(indexToTabName[type]);

    const handleChange = (event, newValue) => {
        history.push(`/home/moreinfo/${id}/${tabNameToIndex[newValue]}`);
        setSelectedTab(newValue);
    };

    return (
        <>
            <Navbar handleDrawerToggle={handleDrawerToggle} />
            <SideNav position="fixed" mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

            <Box className={classes.wrapper}>

                <Paper elevation={2} >
                    <AntTabs    value={selectedTab} onChange={handleChange}>
                        <AntTab  label="Eptools" />
                        <AntTab  label="Certificates" />
                        <AntTab  label="Insurances" />
                        <AntTab  label="Galleries" />
                        <AntTab  label="Subpainters" />
                        <AntTab  label="LinkedDealers" />
                    </AntTabs>
                    {selectedTab === 0 && <Eptool/>}
                    {selectedTab === 1 && <Certificate/>}
                    {selectedTab === 2 && <Insurance/>}
                    {selectedTab === 3 && <Gallery/>}
                    {selectedTab === 4 && <Subuser/>}
                    {selectedTab === 5 && <Linkeduser/>}
                </Paper>

            </Box>
         
        </>

    );
};

export default MoreInfo;
