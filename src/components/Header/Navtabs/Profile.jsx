import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import image from "./tamim.jpg";
import { useStyles } from "../HeaderStyle";
import Box from '@mui/material/Box';




export default function Profile() {



    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dropDownData = [

        { label: "settings", icon: <SettingsIcon /> },
        { label: "Logout", icon: <ExitToAppIcon /> }

    ]

    return (
        <Box>
            <Button 
                sx={{ cursor: 'pointer'}}
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                startIcon={<Avatar  className={classes.navAvatar} src={image} />}
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
