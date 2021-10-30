
import React, {useState, useEffect} from 'react'
import {DataGrid} from '@material-ui/data-grid'
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






const empList = [
  { avatar:"https://reqres.in/img/faces/1-image.jpg", id: 1, name: "Neeraj", email: 'neeraj@gmail.com', phone: 9876543210, city: "Bangalore" },
  { avatar:"https://reqres.in/img/faces/1-image.jpg",id: 2, name: "Raj", email: 'raj@gmail.com', phone: 9812345678, city: "Chennai" },
  { avatar:"https://reqres.in/img/faces/1-image.jpg",id: 3, name: "David", email: 'david342@gmail.com', phone: 7896536289, city: "Jaipur" },
  { avatar:"https://reqres.in/img/faces/1-image.jpg",id: 4, name: "Vikas", email: 'vikas75@gmail.com', phone: 9087654321, city: "Hyderabad" },
]


export default function UserComponent(props)  {
  console.log(props);
  const classes = useStyles();

  const [data, setData] = useState(empList)
  const columns = [
    {
      title: 'Avatar',
      field: 'avatar',
      render: rowData => (
        <img
          style={{ height: 36, borderRadius: '50%' }}
          src={rowData.avatar}
        />
      ),
    },
    { title: "ID", field: "id", editable: false },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone Number", field: 'phone', },
    { title: "City", field: "city",
    lookup: { Bangalore: 'Bangalore', Chennai: 'Chennai' }, 
   }
  ]


  return (
    <div >
      <MaterialTable
        title="User Data"
        data={data}
        columns={columns}
        icons={tableIcons}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
           
            updatedRows[index]=updatedRow
            console.log(updatedRows[index].id);
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          })

        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first",
          filtering: true,
        }}
      />
    </div>
  );


}











// const columns = [
//   {field: 'id', headerName: 'ID'},
//   {field: 'title', headerName: 'Title', width: 300},
//   {field: 'body', headerName: 'Body', width: 600}
// ]

// export default function UserComponent()  {

//   const [tableData, setTableData] = useState([])

//  useEffect(() => {
//    fetch("https://jsonplaceholder.typicode.com/posts")
//     .then((data) => data.json())
//     .then((data) => setTableData(data))
//  })

//   return (
//     <div style={{height: 700, width: '100%'}}>
//       <DataGrid 
//         onRowClick={ (item) => console.log(item.row) }
//         rows={tableData}
//         columns={columns}
//         pageSize={12}
//         checkboxSelection
        
//       />
//     </div>
//   )
// }

// export default DataTable