
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import MaterialTable from 'material-table'
import { useStyles } from '../Header/HeaderStyle'
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
import Button from '../controls/Button';
import { Typography, TextField } from '@material-ui/core';
import Notification from '../controls/Notification';
import Popup from '../Popup';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect

} from "react-router-dom";
import Details from './Details/Details';





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


export default function UserComponent(props) {
  const classes = useStyles();
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
      .then(data => {
        setData(data.users);
      })
      .catch(error => {

        // setFetcherror(error.message);
        // const timer = setTimeout(() => {
        //     setFetcherror();
        // }, 2300);

      })


  }, [reload])

  const TitleImg = (rowData) => {
    return (
      <div>
        <input type="file" />
      </div>
    )
  };



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
    <div >

      <MaterialTable
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
          // onRowDelete: selectedRow => new Promise((resolve, reject) => {
          //   const index = selectedRow.tableData.id;
          //   // console.log(selectedRow.id);
          //   const updatedRows = [...data]
          //   updatedRows.splice(index, 1)
          //   setTimeout(() => {

          //     setData(updatedRows)
          //     resolve()
          //   }, 2000)
          //   resolve()
          // }),
          onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
            const index = oldRow.tableData.id;
            const updatedRows = [...data]


            const formData = new FormData();
            Object.entries(updatedRow).forEach(([key, value]) => {
              // console.log("key ",key);
              // console.log("value ",value);
              if(key=="imagePath")
              {
                if(value.name) formData.append(key, value);
              }
              else formData.append(key, value);
            });

            let result = fetch("http://amaderlab.xyz/api/users/" + updatedRow.id, {

              method: "POST",
              headers: {
                "Authorization": `Bearer ${token}`,

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
              console.log("data ", data);
              setReload(!reload);
              resolve()
            }, 2000)
          })

        }}
        onRowClick={(evt, selectedRow) => {
          history.push(`${path}/${selectedRow.id}/eptools`);

        }
          //  
        }
        options={{
          actionsColumnIndex: -1, addRowPosition: "first",
          filtering: true,
        }}
        actions={[
          rowData => ({
            icon: () => <NavLink style={{ textDecoration: 'none', color: 'black', paddingTop: '5px' }} to={`${path}/${rowData.id}/eptools`}>< ReadMoreIcon /></NavLink>,
            tooltip: 'More Details',
          })

        ]}
        localization={{
          pagination: {
            labelRowsPerPage: 10,
          }
        }}

      />
      <Notification
        notify={notify}
        setNotify={setNotify}
      />


    </div>

  );


}

// .then(res => res.json())
// .then(res => {
//   if (res.message != "Success") {
//     console.log(res.message);
//     setNotify({
//       isOpen: true,
//       message: 'Image Must be less than 2048mb',
//       type: 'error'
//     })
//   }
//   else {
//     setNotify({
//       isOpen: true,
//       message: 'Inserted Successfully',
//       type: 'success'
//     })
//     setOpenPopup(false);
//   }
// })
// .catch(error => {
//   setNotify({
//     isOpen: true,
//     message: error.message,
//     type: 'error'
//   })









