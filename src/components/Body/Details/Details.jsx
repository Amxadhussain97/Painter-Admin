import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useParams } from 'react-router';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useStyles } from './DetailsStyle';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Certficates from './Certificates/Certificates';
import Insurances from './Insurances/Insurances';
import Eptools from './Eptools/Eptools';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as services from "../../Services/Services"
import { useState, useEffect } from 'react'



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));





export default function Details() {
    let { id } = useParams();
    const [value, setValue] = React.useState(0);
    const [userData, setUserData] = useState([])

    let token = localStorage.getItem('token');
    token = token.replace(/^\"(.+)\"$/, "$1");
    useEffect(async () => {
      let result = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      })
      result = await result.json();
      console.log("paisi",result.user);
      setUserData(result.user);
  
    }, [])



    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const classes = useStyles();
 


    return (

        <Grid container spacing={2}>
            <Grid item xs={4} md={12} sm={12}>
                <Paper>
                    <Card sx={{ maxWidth: 400 }} elevation={0}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {userData.name?userData.name[0]:""}
                                </Avatar>
                            }
                            // action={
                            //     <IconButton aria-label="settings">
                            //         <MoreVertIcon onClick={tryclick} />
                            //     </IconButton>
                            // }
                            title={userData.name?userData.name:""}
                            subheader={userData.role?userData.role:""}
                        />
                    </Card>
                    <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Eptools" {...a11yProps(0)} />
                            <Tab label="Certificates" {...a11yProps(1)} />
                            <Tab label="Insurances" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                       <Eptools id={id} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                       <Certficates id={id} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                       <Insurances id={id} />
                    </TabPanel>
                </Box>

                </Paper>
                

            </Grid>

        </Grid>

    )
}
