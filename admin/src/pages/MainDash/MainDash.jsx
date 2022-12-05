import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards/Cards";
import Sidebar from "../../components/Sidebar";
import Table from "../../components/Table/Table";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from 'react-hot-toast';
// import axios from "axios";
import "./MainDash.css";

const MainDash = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const token = localStorage.getItem("userToken");
  const [mydata, setMydata] = useState([]);

  ///TOTAL ORDER
  const [totalOrder, setTotalOrder] = useState(0);
  const [liveVisitor, setLiveVisitor] = useState(1);
  const [conversion, setConversion] = useState(0);
  const [totalVisitor, setTotalVisitor] = useState(0);

  ///TOTAL TODAY ORDER
  const [todaytotalOrder, setTodayTotalOrder] = useState(0);
  // const [todayliveVisitor, setTodayLiveVisitor] = useState(0);
  const [todayconversion, setTodayConversion] = useState(0);
  const [todaytotalVisitor, setTodayTotalVisitor] = useState(0);

  ///TOTAL WEEK ORDER
  const [weektotalOrder, setWeekTotalOrder] = useState(0);
  // const [weekliveVisitor, setWeekLiveVisitor] = useState(0);
  const [weekconversion, setWeekConversion] = useState(0);
  const [weektotalVisitor, setWeekTotalVisitor] = useState(0);

  ///TOTAL MONTH ORDER
  const [monthtotalOrder, setMonthTotalOrder] = useState(0);
  // const [monthliveVisitor, setMonthLiveVisitor] = useState(0);
  const [monthconversion, setMonthConversion] = useState(0);
  const [monthtotalVisitor, setMonthTotalVisitor] = useState(0);

  const getLatestData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/user/getonlylatestdata`,
        config
      );
      console.log(response.data.result);
      if (response.data.status === 200) {
        console.log(response.data.result);
        setMydata(response.data.result);
      }
    } catch (error) {}
  };

  //total
  const getTotalOrderData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      const allnewusersResponse = await axios.get(
        `${BASE_URL}/user/getallnewusers`,
        config
      );
      const allneworderResponse = await axios.get(
        `${BASE_URL}/user/getallneworder`,
        config
      );
      const liveVisitor = await axios.get(
        `${BASE_URL}/user/getnewuser/week`,
        config
      );

      setTotalOrder(allneworderResponse.data.newUser.length);
      let conversion = (allneworderResponse.data.newUser.length /
      allnewusersResponse.data.newUser.length) *
      100
      setConversion(conversion.toFixed(0));
      setTotalVisitor(allnewusersResponse.data.newUser.length);
    } catch (error) {}
  };

  ///today
  const getTotalOrderToday = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      const allneworderResponse = await axios.get(
        `${BASE_URL}/user/getneworder/day`,
        config
      );
      const allnewusersResponse = await axios.get(
        `${BASE_URL}/user/getnewuser/day`,
        config
      );

      setTodayTotalOrder(allneworderResponse.data.newUser.length);
      let conversion =
        (allneworderResponse.data.newUser.length /
          allnewusersResponse.data.newUser.length) *
        100;
      setTodayConversion(isNaN(conversion)?(`0`):(conversion.toFixed(0)));
      setTodayTotalVisitor(allnewusersResponse.data.newUser.length);
    } catch (error) {}
  };

  ///week
  const getTotalOrderWeek = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      const allneworderResponse = await axios.get(
        `${BASE_URL}/user/getneworder/week`,
        config
      );
      const allnewusersResponse = await axios.get(
        `${BASE_URL}/user/getnewuser/week`,
        config
      );

      setWeekTotalOrder(allneworderResponse.data.newUser.length);
      let conversion =
        (allneworderResponse.data.newUser.length /
          allnewusersResponse.data.newUser.length) *
        100;
      setWeekConversion(isNaN(conversion)?(`0`):(conversion.toFixed(0)));
      setWeekTotalVisitor(allnewusersResponse.data.newUser.length);
    } catch (error) {}
  };

  ////month
  const getTotalOrderMonth = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      const allneworderResponse = await axios.get(
        `${BASE_URL}/user/getneworder/month`,
        config
      );
      const allnewusersResponse = await axios.get(
        `${BASE_URL}/user/getnewuser/month`,
        config
      );

      setMonthTotalOrder(allneworderResponse.data.newUser.length);
      let conversion = (allneworderResponse.data.newUser.length /
      allnewusersResponse.data.newUser.length) *
      100
      setMonthConversion(isNaN(conversion)?(`0`):(conversion.toFixed(0)));
      setMonthTotalVisitor(allnewusersResponse.data.newUser.length);
    } catch (error) {}
  };

  useEffect(() => {
    getLatestData();
    getTotalOrderData();
    getTotalOrderToday();
    getTotalOrderWeek();
    getTotalOrderMonth();
  }, []);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div
          className="MainDash"
          style={{ display: "flex", overflowX: "hidden" }}
        >
          <h1 className="main-Header">Dashboard</h1>

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Order" value="1" />
                  <Tab label="Order Today" value="2" />
                  <Tab label="Order This Week" value="3" />
                  <Tab label="Order This Month" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Cards
                  first={totalVisitor}
                  second={totalOrder}
                  third={conversion}
                  forth={liveVisitor}
                  title={"Total"}
                />
              </TabPanel>
              <TabPanel value="2">
                <Cards
                  first={todaytotalVisitor}
                  second={todaytotalOrder}
                  third={todayconversion}
                  forth={liveVisitor}
                  title={"Today"}
                />
              </TabPanel>
              <TabPanel value="3">
                <Cards
                  first={weektotalVisitor}
                  second={weektotalOrder}
                  third={weekconversion}
                  forth={liveVisitor}
                  title={"Week"}
                />
              </TabPanel>
              <TabPanel value="4">
                <Cards
                  first={monthtotalVisitor}
                  second={monthtotalOrder}
                  third={monthconversion}
                  forth={liveVisitor}
                  title={"Month"}
                />
              </TabPanel>
            </TabContext>
          </Box>
          <Table mydata={mydata} />
        </div>
      </div>
      {/* <Toaster position="bottom-center" reverseOrder={true} /> */}
    </div>
  );
};

export default MainDash;
