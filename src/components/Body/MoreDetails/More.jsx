import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

/////////////////////////////////////////
//////
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const tabList = [
  {
    _id: 1,
    label: "Buisness Info",
  },
  {
    _id: 2,
    label: "EpTools",
  },
  {
    _id: 4,
    label: "Certificates",
  },
  {
    _id: 7,
    label: "Insurances",
  },
  {
    _id: 8,
    label: "ফিংগারপ্রিন্ট",
    pathName: "fingerprint",
  },
];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
//////
export default function TeacherProfile() {
  const { teacherID } = useParams();
  const [value, setValue] = useState(0);
  const { setNotify } = useUtility();
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loader, setLoader] = useState(false);
  //

  useEffect(async () => {
    setLoader(true);
    try {
      await getDepartments().then((res) => {
        setDepartments(res.data.departments);
      });
      await getDesignations().then((res) => {
        setDesignations(res.data.designations);
      });
      setLoader(false);
    } catch (e) {
      const { message: errorMessage } = errorHandler(e);
      setNotify({
        isOpen: true,
        message: errorMessage,
        type: "error",
      });
      setLoader(false);
    }
  }, []);

  const nestedComponents = [
    <TeacherPersonalInfo setNotify={setNotify} teacherID={teacherID} />,
    <TeacherInstituteInfo
      setNotify={setNotify}
      teacherID={teacherID}
      designations={designations}
    />,
    <TeacherTransaction setNotify={setNotify} teacherID={teacherID} />,
    <TeacherNotes setNotify={setNotify} teacherID={teacherID} />,
    <QRCode teacher id={teacherID}/>
  ];
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", m: "auto" }}>
      <Box className="white-color-style">
        <Typography
          style={{ fontSize: "1.3rem", fontWeight: "700", color: "#728FB4" }}
        >
          শিক্ষকের প্রোফাইল বিভাগ
        </Typography>
      </Box>
      <Box className="white-color-style">
        <Box sx={{ borderBottom: 1, borderColor: "divider", my: 2 }}>
          <Tabs
            value={value}
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleChange}
          >
            {tabList.map((tab, i) => (
              <Tab
                sx={{ fontSize: "1rem", fontWeight: "600", px: 3 }}
                {...a11yProps(i)}
                key={tab._id}
                style={{ fontWeight: "bold" }}
                label={tab.label}
              />
            ))}
          </Tabs>
        </Box>
        <Box>
          <Box>
            {nestedComponents.map((nestedComponent, i) => (
              <TabPanel value={value} index={i} key={i}>
                {nestedComponent}
              </TabPanel>
            ))}
          </Box>
        </Box>
        <BackButton />
      </Box>
    </Box>
  );
}
