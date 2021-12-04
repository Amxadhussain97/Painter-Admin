
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import MaterialTable from 'material-table'
// import { useStyles } from '../Header/HeaderStyle'
// Import Material Icons
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



export default function Details() {
    let { id } = useParams();
    let { path, url } = useRouteMatch();
    const [data, setData] = useState();
    const [reload, setReload] = useState(true);
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

                // setFetcherror(error.message);
                // const timer = setTimeout(() => {
                //     setFetcherror();
                // }, 2300);

            })

    }, [reload])

    const columns = [


        { title: "ID", field: "id", editable: false },
        { title: "Name", field: "name" },
        { title: "Model", field: "model" },
        { title: "Description", field: 'description' },

    ]


    return (
        <div >

            <MaterialTable
                title=""
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
                        setTimeout(() => {
                            setReload(!reload);
                            resolve()
                        }, 2000)
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


                        let result = fetch(`http://amaderlab.xyz/api/eptools/${updatedRow.id}`, {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${token}`,

                            },
                            body: formData
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
                    actionsColumnIndex: -1, addRowPosition: "first",
                    //   filtering: true,
                }}
                actions={[
                    rowData => ({
                        icon: () => <NavLink style={{ textDecoration: 'none', color: 'black', paddingTop: '5px' }} to={`${url}/${rowData.id}/photos`}><ImageSearchIcon /></NavLink>,
                        tooltip: 'Images',
                    })

                ]}
                localization={{
                    pagination: {
                        labelRowsPerPage: 10,
                    }
                }}

            />



        </div>

    );


}
