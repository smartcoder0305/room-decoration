import { TabContext, TabList, TabPanel } from '@mui/lab'
import axios from "axios";
import { Box, Tab } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';

function Frame1({ num }) {
  const [value, setValue] = React.useState('1');
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let navigate = useNavigate();
  const token = localStorage.getItem('userToken')
  const varyfyUser = async () => {
    if (!token) {
      toast.error('you are not authorized')
      return navigate("/");
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        }

      }
      const response = await axios.post(`${BASE_URL}/admin/verfy`, {}, config)
      if (response.data.status != 200) {
        toast.error(response.data.message)
        navigate("/");
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    varyfyUser()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="MainDash">
          <h1 className='main-Header'>Frames</h1>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="הצהרת נגישות" value="1" />
                  <Tab label="מדיניות פרטיות" value="2" />
                  <Tab label="תנאי שימוש" value="3" />
                  <Tab label="שאלות נפוצות" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1"><Page1 /></TabPanel>
              <TabPanel value="2"><Page2 /></TabPanel>
              <TabPanel value="3"><Page3 /></TabPanel>
              <TabPanel value="4"><Page4 /></TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Frame1