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
import { useHistory, NavLink } from "react-router-dom";
import { useRouteMatch } from 'react-router';
import AddIcon from '../../../SVG/AddIcon';
import EditIcon from '../../../SVG/EditIcon';
import MoreIcon from '../../../SVG/MoreIcon';
import { Box, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';


const tableIcons = {
    Add: forwardRef((props, ref) => <AddIcon  {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline style={{ marginRight: '-5px' }} {...props} ref={ref} />),
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

export default function EptoolDetails() {
    let history = useHistory();
    let { id } = useParams();
    let { path, url } = useRouteMatch();
    const [data, setData] = useState();
    const [reload, setReload] = useState(true);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    let token = localStorage.getItem('token');
    token = token.replace(/^\"(.+)\"$/, "$1");

    useEffect(async () => {
        await fetch(`http://amaderlab.xyz/api/eptools?user_id=${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                setData(data.eptools);
            })
            .catch(error => {

            })

    }, [reload])


    const columns = [

        { title: "ID", field: "id", editable: false },
        { title: "Name", field: "name" },
        { title: "Model", field: "model" },
        { title: "Description", field: 'description' },

        {
            title: 'MoreInfo',
            render: rowData => {
                return <NavLink to={`${url}/${rowData.id}/photos`}><MoreIcon /></NavLink>
                //  <Box sx={{ ml: 3 }} style={{}} onClick={() => console.log(rowData.id)}> <MoreIcon /> </Box>
            }
        },
    ]

    return (
        <>

            <MaterialTable
                style={{ paddingLeft: '5px', fontFamily: 'Open Sans', color: '#007BFF', fontWeight: 'bold' }}
                title="User 01"
                data={data}
                columns={columns}
                icons={tableIcons}
                //  pagination.labelRowsPerPage=""

                editable={{

                    onRowAdd: (newRow) => new Promise((resolve, reject) => {

                        let result = fetch(`http://amaderlab.xyz/api/eptools?user_id=${id}`, {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${token}`,
                                "Content-Type": "application/json",
                                "Accept": "application/json"

                            },
                            body: JSON.stringify(newRow)
                        })
                            .then(() => {
                                setReload(!reload);


                            })
                            .catch(error => {
                                setNotify({
                                    isOpen: true,
                                    message: error.message,
                                    type: 'error'
                                })

                            })
                        setTimeout(() => {


                            resolve()
                        }, 1000)



                    }),
                    onRowDelete: selectedRow => new Promise((resolve, reject) => {
                        const index = selectedRow.tableData.id;
                        // console.log(" id ",selectedRow.id);
                        // const updatedRows = [...data]
                        // updatedRows.splice(index, 1)

                        let result = fetch(`http://amaderlab.xyz/api/eptools/${selectedRow.id}`, {
                            method: "DELETE",
                            headers: {
                                "Authorization": `Bearer ${token}`,
                            },
                        })
                            .then(() => {
                                setNotify({
                                    isOpen: true,
                                    message: 'Deleted Successfully',
                                    type: 'success'
                                })
                                setReload(!reload);
                            })
                            .catch(error => {
                                setNotify({
                                    isOpen: true,
                                    message: error.message,
                                    type: 'error'
                                })

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


                        let result = fetch(`http://amaderlab.xyz/api/eptools/${updatedRow.id}`, {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${token}`,

                            },
                            body: formData
                        })
                            .then(() => {
                                setTimeout(() => {
                                    setReload(!reload);
                                    resolve()
                                    setNotify({
                                        isOpen: true,
                                        message: 'Updated Successfully',
                                        type: 'success'
                                    })

                                }, 2000)


                            })
                            .catch(error => {
                                setNotify({
                                    isOpen: true,
                                    message: error.message,
                                    type: 'error'
                                })

                            })
                        updatedRows[index] = updatedRow
                        setTimeout(() => {
                            setData(updatedRows)
                            setReload(!reload);
                            resolve()
                        }, 2000)
                    })

                }}
                options={{
                    actionsColumnIndex: 10, addRowPosition: "first",
                    padding: "dense",
                    // filtering: true,
                    rowStyle: {
                        fontFamily: 'Open Sans',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: '#313F5E',
                        height: '50px',
                        margin: '0 auto',
                        textAlign: 'center'



                    },
                    headerStyle: {
                        backgroundColor: ' #F4F4FB',
                        color: '#8F8CAE',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        lineHeight: '24px',
                        padding: '15px',
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

                    // rowData => ({
                    //     icon: () => <NavLink style={{ textDecoration: 'none', color: 'black', paddingTop: '5px' }} to={`${path}/${rowData.id}/eptools`}>< ReadMoreIcon /></NavLink>,
                    //     tooltip: 'More Details',
                    // })

                ]}
                localization={{
                    pagination: {
                        labelRowsPerPage: 10,
                    }
                }}

            />


        </>
    )
}

