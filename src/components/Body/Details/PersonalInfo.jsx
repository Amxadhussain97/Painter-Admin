
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
import AddIcon from '../../SVG/AddIcon';
import UpdateIcon from '../../SVG/UpdateIcon';
import MoreIcon from '../../SVG/MoreIcon';
import { Box, Typography } from '@material-ui/core';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddIcon  {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <UpdateIcon {...props} ref={ref} />),
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

export default function PersonaIInfo() {
    let history = useHistory();
    let { path, url } = useRouteMatch();
    const [data, setData] = useState();
    const [reload, setReload] = useState(true);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    let token = localStorage.getItem('token');
    token = token.replace(/^\"(.+)\"$/, "$1");

    useEffect(async () => {

        await fetch("http://amaderlab.xyz/api/users", {

            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(res => res.json())
            .then(res => {

                setData(res.users);
            })
            .catch(error => {

                // setFetcherror(error.message);
                // const timer = setTimeout(() => {
                //     setFetcherror();
                // }, 2300);

            })


    }, [reload])



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
                return <img src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`} alt="" height="40" width="40" style={{
                    borderRadius: '50%'
                }} onClick={() => console.log("okkk")} />
            }
        },
        { title: "ID", field: "id", editable: false },
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Gender", field: 'gender', },
        { title: "Phone", field: 'phone', },
        { title: "BirthDate", field: 'birthDate', },
        { title: "Area", field: 'area', },
        {
            title: "role", field: "role",
            lookup: { Painter: 'Painter', Dealer: 'Dealer', Admin: 'Admin' },
            render: rowData => {
                if (rowData.role === 'Painter') return <Typography style={{ color: '#F2994A', fontWeight: '600' }}>{rowData.role}</Typography>
                else if (rowData.role === 'Dealer') return <Typography style={{ color: '#007BFF', fontWeight: '600' }}>{rowData.role}</Typography>
                else return <Typography style={{ color: '#313F5E', fontWeight: '600' }}>{rowData.role}</Typography>
            }
        },
        {
            title: 'MoreInfo',
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
                return <NavLink style={{ cursor: 'pointer' }} to={`moreinfo/${rowData.id}/Eptools`}><MoreIcon /></NavLink>
                //  <Box sx={{ ml: 3 }} style={{}} onClick={() => console.log(rowData.id)}> <MoreIcon /> </Box>
            }
        },
    ]

    return (
        <>

            <MaterialTable
                style={{ paddingLeft: '5px', fontFamily: 'Open Sans', color: '#007BFF', fontWeight: 'bold' }}
                title="User Data"
                data={data}
                columns={columns}
                icons={tableIcons}
                //  pagination.labelRowsPerPage=""

                editable={{

                    onRowAdd: (newRow) => new Promise((resolve, reject) => {
                        const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
                        setTimeout(() => {
                            setData(updatedRows)
                            resolve()
                        }, 2000)
                    }),
                    onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
                        const index = oldRow.tableData.id;
                        const updatedRows = [...data]
                        const formData = new FormData();
                        Object.entries(updatedRow).forEach(([key, value]) => {
                            if (key == "imagePath" && value) {
                                if (value.name) formData.append(key, value);

                            }
                            else if (value) formData.append(key, value);
                        });

                        fetch("http://amaderlab.xyz/api/users/" + updatedRow.id, {

                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${token}`,
                                "Access-Control-Allow-Origin": "*",
                            },
                            body: formData
                        })
                            .then(res => res.json())
                            .then(res => {
                                if (res.message != "Success") {

                                    setNotify({
                                        isOpen: true,
                                        message: res.message,
                                        type: 'error'
                                    })
                                }
                                else {
                                    setNotify({
                                        isOpen: true,
                                        message: 'Inserted Successfully',
                                        type: 'success'
                                    })

                                }
                            })
                        updatedRows[index] = updatedRow
                        setTimeout(() => {
                            setData(updatedRows)
                            setReload(!reload);
                            resolve();
                        }, 2000)
                    })


                }}
                // onRowClick={(evt, selectedRow) => {
                //     history.push(`${url}/${selectedRow.id}/eptools`);

                // }}
                options={{
                    actionsColumnIndex: 10, addRowPosition: "first",
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
