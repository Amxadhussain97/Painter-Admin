import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useHistory, NavLink } from "react-router-dom";
import { useRouteMatch } from "react-router";
import AddIcon from "../../SVG/AddIcon";
import UpdateIcon from "../../SVG/UpdateIcon";
import MoreIcon from "../../SVG/MoreIcon";
import { Box, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddIcon {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <UpdateIcon {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => (
    <Search style={{ color: "#8F8CAE" }} {...props} ref={ref} />
  )),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function PersonaIInfo() {
  const search = useLocation().search;
  const user = new URLSearchParams(search).get("user");
  let baseUrl = "";
  if (user) baseUrl = `http://amaderlab.xyz/api/users?user=${user}`;
  else baseUrl = `http://amaderlab.xyz/api/users`;

  let history = useHistory();
  let { path, url } = useRouteMatch();
  const [data, setData] = useState();
  const [reload, setReload] = useState(true);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [district, setDistrict] = useState([
    {
      id: 1,
      name: "Dhaka",
    },
    {
      id: 2,
      name: "Chittagong",
    },
    {
      id: 3,
      name: "Sylhet",
    },
  ]);

  const [subdistrict, setSubdistrict] = useState([
    {
      id: 1,
      district_id: 1,
      name: "check",
    },
    {
      id: 2,
      district_id: 2,
      name: "check2",
    },
    {
        id: 3,
        district_id: 3,
        name: "check3",
    }
  ]);

  const [currentSubdistrict, setCurrentSubdistrict] = useState([
    {
      id: 1,
      district_id: 1,
      name: "check",
    },
    {
      id: 2,
      district_id: 2,
      name: "check2",
    },
    {
        id: 3,
        district_id: 3,
        name: "check3",
    }
  ]);

  let token = localStorage.getItem("token");
  token = token.replace(/^\"(.+)\"$/, "$1");

  useEffect(()=>{
    console.log("current ", currentSubdistrict);

  },[currentSubdistrict])

 const handleOnChange =(e,props) => {
    // console.log("check here ",e.target.name," pro ",props);
  
    if(e.targe.name === "district_id"){
        const currentData = subdistrict.filter(item => item.district_id === e.target.value);
        console.log("currentData ", currentData);
        setCurrentSubdistrict(currentData);
    }

    props.onChange(e.target.value);
    


 }

  useEffect(async () => {
    await fetch(baseUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.users);
      })
      .catch((error) => {
        // setFetcherror(error.message);
        // const timer = setTimeout(() => {
        //     setFetcherror();
        // }, 2300);
      });
  }, [reload, baseUrl]);

  const columns = [
    {
      title: "Avatar",
      field: "imagePath",
      filtering: false,
      editComponent: (props) => (
        <input
          // accept="image/*"
          style={{ margin: "10px" }}
          id="imagePath"
          name="imagePath"
          type="file"
          onChange={(e) => props.onChange(e.target.files[0])}
        />
      ),
      render: (rowData) => {
        if (rowData.imagePath) {
          return (
            <img
              src={`http://amaderlab.xyz/${rowData.imagePath}`}
              alt=""
              height="40"
              width="40"
              style={{
                borderRadius: "50%",
              }}
            />
          );
        } else {
          return (
            <img
              src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}
              alt=""
              height="40"
              width="40"
              style={{
                borderRadius: "50%",
              }}
            />
          );
        }
      },
    },
    { title: "Name", field: "name", filtering: false },
    { title: "Email", field: "email", filtering: false },
    { title: "Gender", field: "gender" },
    { title: "Phone", field: "phone" },
    {
      title: "Birth Date",
      field: "birthDate",
      filtering: false,
      editComponent: (props) => (
        <input
          type="date"
          id="BirthDate"
          name="BirthDate"
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    },
    {
        title: "District",
        field: "district",
        filtering: false,
        editComponent: (props) => (
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="district_id"
                // value={}
                label="District"
                onChange={(e) => handleOnChange(e,props)}
               
              >
                {district.map((district) => (
                    <MenuItem key={district.id} value={district.id}>
                        {district.name}
                    </MenuItem>
                ))}

               
              </Select>
            </FormControl>
          </Box>
        ),
      },
      {
        title: "SubDistrict",
        field: "subdistrict",
        filtering: false,
        editComponent: (props) => (
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sub District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="subdistrict_id"
                // value={}
                label="Sub District"
                onChange={(e) => handleOnChange(e,props)}
               
              >
                {currentSubdistrict && currentSubdistrict.map((subdistrict) => (
                    <MenuItem key={subdistrict.id} value={subdistrict.id}>
                        {subdistrict.name}
                    </MenuItem>
                ))}

               
              </Select>
            </FormControl>
          </Box>
        ),
      },
    { title: "Area", field: "area", filtering: false },
    {
      title: "Role",
      field: "role",
      lookup: {
        Painter: "Painter",
        Dealer: "Dealer",
        Admin: "Admin",
        PainterPending: "Painter(Pending)",
        DealerPending: "Dealer(Pending)",
        AdminPending: "Admin(Pending)",
      },
      render: (rowData) => {
        if (rowData.role === "Painter")
          return (
            <Typography style={{ color: "#F2994A", fontWeight: "600" }}>
              {rowData.role}
            </Typography>
          );
        else if (rowData.role === "Dealer")
          return (
            <Typography style={{ color: "#007BFF", fontWeight: "600" }}>
              {rowData.role}
            </Typography>
          );
        else
          return (
            <Typography style={{ color: "#313F5E", fontWeight: "600" }}>
              {rowData.role}
            </Typography>
          );
      },
    },
    {
      title: "More Info",
      editComponent: (props) => (
        <input
          // accept="image/*"
          style={{ margin: "10px" }}
          id="imagePath"
          name="imagePath"
          type="file"
          onChange={(e) => props.onChange(e.target.files[0])}
        />
      ),
      render: (rowData) => {
        return (
          <NavLink
            style={{ cursor: "pointer" }}
            to={{
              pathname: `/home/moreinfo/${rowData.id}/Eptools`,
              state: { role: rowData.role },
            }}
          >
            <MoreIcon />
          </NavLink>
        );
      },
    },
  ];

  return (
    <>
      <MaterialTable
        style={{
          paddingLeft: "5px",
          fontFamily: "Open Sans",
          color: "#007BFF",
          fontWeight: "bold",
        }}
        title="User Data"
        data={data}
        columns={columns}
        icons={tableIcons}
        //  pagination.labelRowsPerPage=""

        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              const updatedRows = [
                ...data,
                { id: Math.floor(Math.random() * 100), ...newRow },
              ];
              setTimeout(() => {
                setData(updatedRows);
                resolve();
              }, 2000);
            }),
          onRowUpdate: (updatedRow, oldRow) =>
            new Promise((resolve, reject) => {
              const index = oldRow.tableData.id;
              console.log("data ", data);
              const updatedRows = [...data];
              console.log("updatedRow  ", updatedRow);
              const formData = new FormData();
              Object.entries(updatedRow).forEach(([key, value]) => {
                if (key == "imagePath" && value) {
                  if (value.name) formData.append(key, value);
                } else if (value) formData.append(key, value);
              });

              fetch("http://amaderlab.xyz/api/users/" + updatedRow.id, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Access-Control-Allow-Origin": "*",
                },
                body: formData,
              })
                .then((res) => res.json())
                .then((res) => {
                  if (res.message != "Success") {
                    setNotify({
                      isOpen: true,
                      message: res.message,
                      type: "error",
                    });
                  } else {
                    setNotify({
                      isOpen: true,
                      message: "Inserted Successfully",
                      type: "success",
                    });
                  }
                });
              updatedRows[index] = updatedRow;
              setTimeout(() => {
                setData(updatedRows);
                setReload(!reload);
                resolve();
              }, 2000);
            }),
        }}
        // onRowClick={(evt, selectedRow) => {
        //     history.push(`${url}/${selectedRow.id}/eptools`);

        // }}
        options={{
          actionsColumnIndex: 10,
          addRowPosition: "first",
          padding: "dense",
          filtering: true,
          rowStyle: {
            fontFamily: "Open Sans",
            fontWeight: 600,
            fontSize: "14px",
            color: "#313F5E",
          },
          headerStyle: {
            backgroundColor:"#F4F4FB",
            color: "#8F8CAE",
            fontWeight: "bold",
            fontSize: "14px",
            lineHeight: "13px",
            padding: "20px",
            maxWidth: "100%",
            lineWidth: "90px",
            width:'90px',
            borderRadius: "5px",
          },

          searchFieldStyle: {
            background: "#F4F4FB",
            border: "1px solid #8F8CAE",
            borderBottom: "",
            borderRadius: "5px",
            padding: "5px",
            marginTop: "-10px",
          },
        }}
        actions={
          [
            // rowData => ({
            //     icon: () => <NavLink style={{ textDecoration: 'none', color: 'black', paddingTop: '5px' }} to={`${path}/${rowData.id}/eptools`}>< ReadMoreIcon /></NavLink>,
            //     tooltip: 'More Details',
            // })
          ]
        }
        localization={{
          pagination: {
            labelRowsPerPage: 10,
          },
        }}
      />
    </>
  );
}
