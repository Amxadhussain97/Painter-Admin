import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemText, ListItemIcon } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { NavLink } from 'react-router-dom';
import { useStyles } from './HeaderStyle';
import { Button } from '@mui/material';
import { useRouteMatch } from 'react-router';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
export default function SideNavData({ handleDrawerToggle }) {
    const classes = useStyles();
    let { path, url } = useRouteMatch();
    const listItemData = [
        { label: "Users", link: "/user", icon: <SupervisedUserCircleIcon /> },

    ]

    return (
        <List>
            {listItemData.map((item, i) => (

                <Button key={i} size='small' className={classes.navButton} onClick={handleDrawerToggle}>
                    <ListItem
                        exact
                        component={NavLink}
                        to={`${path}${item.link}`}
                        className={classes.navlinks}
                        activeClassName={classes.activeclasslinks}
                        key={i}>
                        <ListItemIcon >
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
