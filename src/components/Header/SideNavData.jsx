import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemText, ListItemIcon } from '@mui/material';
// import MailIcon from '@mui/icons-material/Mail';
import { useStyles } from './HeaderStyle';
import { Button } from '@mui/material';
import { useRouteMatch } from 'react-router';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom';

export default function SideNavData({ handleDrawerToggle }) {
    const classes = useStyles();
    let history = useHistory();
    let { path, url } = useRouteMatch();


    return (
        <List>

            <ListItem
                exact
                component={NavLink}
              to={`/home/personalinfo`}

            // className={classes.navlinks}
            // activeClassName={classes.activeclasslinks}
            >
                <ListItemIcon onClick={(handleDrawerToggle)}>
                    <NavLink to={`/home/personalinfo`}>
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="25" cy="25" r="25" fill="#E8F3FF" />
                            <path d="M23.9524 19.1071C23.9524 20.1964 23.5197 21.2411 22.7494 22.0113C21.9792 22.7816 20.9345 23.2143 19.8452 23.2143C18.756 23.2143 17.7113 22.7816 16.941 22.0113C16.1708 21.2411 15.7381 20.1964 15.7381 19.1071C15.7381 18.0179 16.1708 16.9732 16.941 16.203C17.7113 15.4327 18.756 15 19.8452 15C20.9345 15 21.9792 15.4327 22.7494 16.203C23.5197 16.9732 23.9524 18.0179 23.9524 19.1071ZM34.9048 19.1071C34.9048 19.6465 34.7985 20.1806 34.5921 20.6789C34.3857 21.1772 34.0832 21.6299 33.7018 22.0113C33.3204 22.3927 32.8677 22.6952 32.3694 22.9016C31.8711 23.1081 31.337 23.2143 30.7976 23.2143C30.2583 23.2143 29.7242 23.1081 29.2259 22.9016C28.7276 22.6952 28.2748 22.3927 27.8934 22.0113C27.512 21.6299 27.2095 21.1772 27.0031 20.6789C26.7967 20.1806 26.6905 19.6465 26.6905 19.1071C26.6905 18.0179 27.1232 16.9732 27.8934 16.203C28.6637 15.4327 29.7083 15 30.7976 15C31.8869 15 32.9316 15.4327 33.7018 16.203C34.472 16.9732 34.9048 18.0179 34.9048 19.1071ZM29.3327 34.1667C29.3957 33.719 29.4286 33.2631 29.4286 32.7976C29.4317 30.6467 28.7081 28.5577 27.375 26.8696C28.4156 26.2689 29.596 25.9526 30.7976 25.9526C31.9992 25.9525 33.1796 26.2688 34.2202 26.8696C35.2608 27.4704 36.1249 28.3345 36.7257 29.3751C37.3265 30.4156 37.6428 31.596 37.6429 32.7976V34.1667H29.3327ZM19.8452 25.9524C21.6607 25.9524 23.4018 26.6736 24.6856 27.9573C25.9693 29.241 26.6905 30.9821 26.6905 32.7976V34.1667H13V32.7976C13 30.9821 13.7212 29.241 15.0049 27.9573C16.2887 26.6736 18.0298 25.9524 19.8452 25.9524Z" fill="#007BFF" />
                        </svg>
                    </NavLink>


                </ListItemIcon>


            </ListItem>



        </List>
    )
}
