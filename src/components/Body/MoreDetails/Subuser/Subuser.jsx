import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import MaterialTable from 'material-table'
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { useParams } from 'react-router';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PhotoCameraTwoToneIcon from '@mui/icons-material/PhotoCameraTwoTone';
import { Divider } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ConfirmDialog from '../../../controls/ConfirmDialog';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { ListItemSecondaryAction } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Controls from '../../../controls/Controls';
import Popup from '../../../Popup';
import { SubuserForm } from './SubuserForm';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '../../../SVG/UpdateIcon';
import MoreIcon from '../../../SVG/MoreIcon';
import Button from '@mui/material/Button';
import Notification from '../../../controls/Notification';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddIcon  {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search style={{ color: '#8F8CAE' }} {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};



const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#fff"
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em"
        }
    },
    blogsContainer: {
        paddingTop: theme.spacing(3)
    },
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3)
    },
    card: {
        width: '230px',
        height: '200px',
    },
    media: {
        height: 80,
        marginTop: '30px'

    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    author: {
        display: "flex"
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center",
        paddingLeft: '15px'
    },
    newButton: {
        position: 'absolute',
        right: '12px'


    },
    filename: {
        display: 'flex',
        justifyContent: 'center'
    }
}));




export default function Subuser(props) {
    const classes = useStyles();

    let { id } = useParams();
    console.log("sub id ", id);
    let { path, url } = useRouteMatch();
    const [data, setData] = useState();
    const [reload, setReload] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openPopup, setOpenPopup] = useState(false);
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [subusers, setSubusers] = useState();
    const [records, setRecords] = useState()
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })





    let token = localStorage.getItem('token');
    token = token.replace(/^\"(.+)\"$/, "$1");


    useEffect(async () => {
        await fetch(`http://amaderlab.xyz/api/subusers?user_id=${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log("data ", data);
                setData(data.list);
            })
            .catch(error => {
                // setFetcherror(error.message);
                // const timer = setTimeout(() => {
                //     setFetcherror();
                // }, 2300);
            })

    }, [reload])



    async function addOrEdit(subuser, resetForm) {
        const formData = new FormData();
        formData.append('phone', subuser.phone);
        formData.append('link', "Painter");
        if (recordForEdit != null) {
            // await fetch(`http://amaderlab.xyz/api/galleries/${gallery.id}`, {
            //     method: "POST",
            //     headers: {
            //         "Authorization": `Bearer ${token}`,
            //     },
            //     body: formData
            // })
            //     .then(res => res.json())
            //     .catch(error => {
            //         console.log("error", error.message);

            //     })


        }

        else {

            await fetch(`http://amaderlab.xyz/api/subusers?user_id=${id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            })
                .then(res => res.json())
                .then(res => {
                    if (res.message != "success") {

                        setNotify({
                            isOpen: true,
                            message: res.message,
                            type: 'error'
                        })
                    }
                    else {
                        setNotify({
                            isOpen: true,
                            message: 'Added Successfully',
                            type: 'success'
                        })
                        setOpenPopup(false);
                    }
                })
                .catch(error => {
                    setNotify({
                        isOpen: true,
                        message: error.message,
                        type: 'error'
                    })

                })
        }
        setReload(!reload);
        setRecordForEdit(null);
        setOpenPopup(false);


    }




    const columns = [
        {
            title: 'Avatar',
            field: 'imagePath',
            filtering: false,
            editComponent: (props) => (
                <input
                    // accept="image/*"
                    style={{ margin: '10px' }}
                    id="imagePath"
                    name="imagePath"
                    type="file"
                    onChange={(e) => props.onChange(e.target.files[0])}
                />

            ),

            render: rowData => {
                if (rowData.imagePath) {
                    return <img src={`http://amaderlab.xyz/${rowData.imagePath}`} alt="" height="40" width="40" style={{
                        borderRadius: '50%'
                    }} onClick={() => console.log("okkk")} />
                }
                else {
                    return <img src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`} alt="" height="40" width="40" style={{
                        borderRadius: '50%'
                    }} onClick={() => console.log("okkk")} />
                }
            }
        },



        { title: "ID", field: "subuser", editable: false },
        { title: "Name", field: "name" },
        { title: "Phone", field: 'phone', },
        {
            title: "role", field: "role",
            lookup: { Painter: 'Painter', Dealer: 'Dealer', Admin: 'Admin' },
        },
        {
            title: 'MoreInfo',
            render: rowData => {
                return <NavLink style={{ cursor: 'pointer' }} to={`/home/info/personalinfo?user=${rowData.subuser}`}><MoreIcon /></NavLink>
             
                // return <NavLink style={{ cursor: 'pointer' }} to={`/home/moreinfo/${rowData.subuser}/Eptools`}><MoreIcon /></NavLink>
     
            }
        },
    ]


    return (
        <>



            <h4 style={{ color: '#007BFF', marginLeft: '14px' }}>User ID {props.userId}</h4>
            <Box maxWidth style={{ position: 'relative ', height: '60px', border: '1px solid #8F8CAE', margin: '10px', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '0px' }}>
                    <Toolbar>
                        <Button style={{ width: '100px', background: '#007BFF', textTransform: 'none' }} variant="contained" startIcon={<AddIcon />}
                            // className={classes.newButton}
                            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                        >
                            Add
                        </Button>

                    </Toolbar>
                </div>
            </Box>

            <MaterialTable
                title=""
                data={data}
                columns={columns}
                icons={tableIcons}
                //  pagination.labelRowsPerPage=""

                editable={{
                    // onRowAdd: (newRow) => new Promise((resolve, reject) => {

                    //     let result = fetch(`http://amaderlab.xyz/api/leads?user_id=${id}`, {
                    //         method: "POST",
                    //         headers: {
                    //             "Authorization": `Bearer ${token}`,
                    //             "Content-Type": "application/json",
                    //             "Accept": "application/json"

                    //         },
                    //         body: JSON.stringify(newRow)
                    //     })
                    //     setTimeout(() => {
                    //         setReload(!reload);
                    //         resolve()
                    //     }, 2000)
                    // }),
                    onRowDelete: selectedRow => new Promise((resolve, reject) => {
                        const index = selectedRow.tableData.subuser;
                        // console.log(" id ",selectedRow.id);
                        // const updatedRows = [...data]
                        // updatedRows.splice(index, 1)

                        fetch(`http://amaderlab.xyz/api/subpainters/${selectedRow.subuser}?user_id=${id}`, {

                            method: "DELETE",
                            headers: {
                                "Authorization": `Bearer ${token}`,
                            },
                        })
                            .then(() => {
                                console.log("delete successfull");
                                setReload(!reload);
                            })
                            .catch(error => {
                                console.log("error", error.message);

                            })

                        resolve()
                    }),
                    onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
                        const index = oldRow.tableData.id;
                        const updatedRows = [...data]
                        const formData = new FormData();
                        Object.entries(updatedRow).forEach(([key, value]) => {
                            if (value) formData.append(key, value);
                        });

                        let result = fetch("http://amaderlab.xyz/api/users/" + updatedRow.subuser, {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${token}`,

                            },
                            body: formData
                        })
                        updatedRows[index] = updatedRow
                        setTimeout(() => {
                            setData(updatedRows)
                            console.log("data ", data);
                            setReload(!reload);
                            resolve()
                        }, 2000)
                    })

                }}
                options={{
                    actionsColumnIndex: -1, addRowPosition: "first",
                    padding: "dense",
                    // filtering: true,
                    rowStyle: {
                        fontFamily: 'Open Sans',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: '#313F5E',



                    },
                    headerStyle: {
                        backgroundColor: ' #F4F4FB',
                        color: '#8F8CAE',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        lineHeight: '24px',
                        padding: '20px',
                        borderRadius: '5px',



                    },

                    searchFieldStyle: {
                        background: '#F4F4FB',
                        border: '1px solid #8F8CAE',
                        borderBottom: '',
                        borderRadius: '5px',
                        padding: '5px',
                        marginTop: '-10px'
                    }


                }}
                actions={[


                ]}
                localization={{
                    pagination: {
                        labelRowsPerPage: 10,
                    }
                }}

            />
            <Popup
                title="Insert Details"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <SubuserForm
                    reload={reload}
                    setOpenPopup={setOpenPopup}
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />


            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />



        </>

    );


}

