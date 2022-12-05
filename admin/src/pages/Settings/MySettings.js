import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./mysetting.css";
import Coupons from "./Coupons/Coupons";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import Review from "./Review/Review";

function MySettings() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="MainDash">
          <h1 className="main-Header">Settings</h1>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Review" value="1" />
                  <Tab label="Coupons" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1"><Review /></TabPanel>
              <TabPanel value="2">
              <Coupons />
              {/* <h1>Coupons</h1> */}
              </TabPanel>
            </TabContext>
          </Box>
         
        </div>
      </div>
    </div>
  );
}

export default MySettings;
