import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useStyles } from "../HeaderStyle";
import Box from '@mui/material/Box';



export default function Profile() {



    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const dropDownData = [

        // { label: "Logout", icon: <ExitToAppIcon /> }

    ]

    return (
        <Box>
            <Button
                sx={{ cursor: 'pointer' }}
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                // onClick={handleClick}
                startIcon={<Avatar className={classes.navAvatar}>
                    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="22.5" cy="22.5" r="22.5" fill="#50A4FF" />
                        <path d="M22.9081 22.9092C23.879 22.9092 24.8282 22.6213 25.6355 22.0819C26.4428 21.5425 27.072 20.7758 27.4435 19.8788C27.8151 18.9818 27.9123 17.9947 27.7229 17.0424C27.5335 16.0902 27.0659 15.2155 26.3794 14.5289C25.6928 13.8424 24.8181 13.3748 23.8658 13.1854C22.9136 12.996 21.9265 13.0932 21.0295 13.4647C20.1325 13.8363 19.3658 14.4655 18.8264 15.2728C18.2869 16.0801 17.999 17.0292 17.999 18.0002C18.0003 19.3017 18.5179 20.5496 19.4383 21.47C20.3586 22.3903 21.6065 22.9079 22.9081 22.9092ZM22.9081 14.7274C23.5554 14.7274 24.1881 14.9194 24.7263 15.279C25.2645 15.6386 25.684 16.1497 25.9317 16.7477C26.1794 17.3458 26.2442 18.0038 26.118 18.6386C25.9917 19.2735 25.68 19.8566 25.2223 20.3143C24.7646 20.772 24.1814 21.0837 23.5466 21.21C22.9117 21.3363 22.2537 21.2715 21.6557 21.0238C21.0577 20.7761 20.5466 20.3566 20.1869 19.8184C19.8273 19.2802 19.6354 18.6474 19.6354 18.0002C19.6354 17.1322 19.9802 16.2997 20.5939 15.686C21.2077 15.0722 22.0401 14.7274 22.9081 14.7274V14.7274Z" fill="white" />
                        <path d="M22.9086 24.5457C20.9563 24.5478 19.0846 25.3243 17.7041 26.7048C16.3236 28.0853 15.5471 29.957 15.5449 31.9093C15.5449 32.1263 15.6311 32.3344 15.7846 32.4878C15.938 32.6413 16.1461 32.7275 16.3631 32.7275C16.5801 32.7275 16.7882 32.6413 16.9416 32.4878C17.0951 32.3344 17.1813 32.1263 17.1813 31.9093C17.1813 30.3903 17.7847 28.9336 18.8588 27.8595C19.9328 26.7854 21.3896 26.182 22.9086 26.182C24.4275 26.182 25.8843 26.7854 26.9583 27.8595C28.0324 28.9336 28.6358 30.3903 28.6358 31.9093C28.6358 32.1263 28.722 32.3344 28.8755 32.4878C29.0289 32.6413 29.237 32.7275 29.454 32.7275C29.671 32.7275 29.8791 32.6413 30.0326 32.4878C30.186 32.3344 30.2722 32.1263 30.2722 31.9093C30.27 29.957 29.4935 28.0853 28.113 26.7048C26.7326 25.3243 24.8608 24.5478 22.9086 24.5457V24.5457Z" fill="white" />
                    </svg>

                </Avatar>}
            />

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {dropDownData.map((item, i) => (

                    <MenuItem key={i} component={ListItem} onClick={handleClose}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>{item.label}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}
