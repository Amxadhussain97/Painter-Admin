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
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@mui/material/Toolbar';
import Controls from '../../../controls/Controls';
import Popup from '../../../Popup';

import { DealerForm } from './DealerForm';


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
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
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
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




export default function Dealers(props) {
    const classes = useStyles();

    let { id } = useParams();
    let { path, url } = useRouteMatch();
    const [data, setData] = useState();
    const [reload, setReload] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openPopup, setOpenPopup] = useState(false);
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [dealers, setDealers] = useState();
    const [records, setRecords] = useState()
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })





    let token = localStorage.getItem('token');
    token = token.replace(/^\"(.+)\"$/, "$1");


    useEffect(async () => {
        await fetch(`http://amaderlab.xyz/api/dealers?user_id=${id}`, {
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



    async function addOrEdit(dealer, resetForm) {
        const formData = new FormData();
        formData.append('phone', dealer.phone);
        formData.append('name', dealer.name);
        formData.append('email', dealer.email);
        formData.append('area', dealer.area);
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
            console.log("aise");

            await fetch(`http://amaderlab.xyz/api/dealers?user_id=${id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            })
                .then(res => res.json())
                .catch(error => {
                    console.log(error.message);

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

            render: rowData => <img src={`http://amaderlab.xyz/${rowData.imagePath}`} alt="" height="50" width="50" style={{
                borderRadius: '50%',
            }} />
        },



        { title: "ID", field: "id", editable: false },
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Gender", field: 'gender', },
        { title: "Phone", field: 'phone', },
        { title: "BirthDate", field: 'birthDate', },
        { title: "Area", field: 'area', },
        { title: "BankName", field: 'bankName', },
        { title: "Rocket", field: 'rocket', },
        { title: "Bkash", field: 'bkash', },
        { title: "Nogod", field: 'nogod', },
        {
            title: "role", field: "role",
            lookup: { Painter: 'Painter', Dealer: 'Dealer', Admin: 'Admin' },
        }
    ]


    return (
        <>
            <Toolbar>

                <Controls.Button
                    text="Add New"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className={classes.newButton}
                    onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                />
            </Toolbar>

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
                        const index = selectedRow.tableData.id;
                        // console.log(" id ",selectedRow.id);
                        // const updatedRows = [...data]
                        // updatedRows.splice(index, 1)

                        let result = fetch(`http://amaderlab.xyz/api/dealers/${selectedRow.id}?user_id=${id}`, {

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

                        let result = fetch("http://amaderlab.xyz/api/users/" + updatedRow.id, {
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
                    //   filtering: true,
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
                <DealerForm
                    reload={reload}
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                />


                {/* <GalleryForm
                    reload={reload}
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} /> */}

            </Popup>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />



        </>

    );


}

