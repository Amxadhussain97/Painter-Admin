import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemText,ListItemIcon } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { NavLink } from 'react-router-dom';
import { useStyles } from './HeaderStyle';
import { Button } from '@mui/material';
import { useRouteMatch } from 'react-router';

export default function SideNavData({handleDrawerToggle}) {
    const classes = useStyles();
    let { path, url } = useRouteMatch();
    console.log(path);
    const listItemData = [
        { label: "Dashboard",link:"", icon: <MailIcon /> },
        { label: "Users",link:"/user",icon: <MailIcon /> },
        { label: "Logout",link:"/logout", icon: <MailIcon /> },
    ]

    return (
        <List>
            {listItemData.map((item, i) => (
               
               <Button size='small' className={classes.navButton} onClick={handleDrawerToggle}>
                    <ListItem
                    exact
                    component={NavLink}
                    to={`${path}${item.link}`}
                    className={classes.navlinks}
                    activeClassName={classes.activeclasslinks}
                    key={i}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText>
                            {item.label}
                        </ListItemText>
                    </ListItem>
                </Button>

            ))}
        </List>
    )
}
