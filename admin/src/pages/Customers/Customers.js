
import React, { useEffect, useState } from 'react'
import Ctable from '../../components/Ctable/Ctable'
import Sidebar from '../../components/Sidebar'
import { NavLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../store/customerSlice';
function Customers() {
  const [value, setValue] = useState('1');
  const despatch = useDispatch()
  const customers = useSelector((state) => state.customer.data)






  let navigate = useNavigate();

  // const [showData, setShowData] = useState('1');



  

  const columns = [
    {
      name: 'Order Id'
    },
    {
      name: 'Name'
    },
    {
      name: 'Email'
    },
    {
      name: 'Phone'
    },
    {
      name: 'Address'
    },
    {
      name: 'City'
    },
    {
      name: 'Postal Code'
    },
    {
      name: 'Orders'
    },
    {
      name: 'Action'
    },
  ]

  useEffect(() => {
    despatch(fetchCustomers())
  }, [])


  const [showData, setShowData] = useState('1');

  const handleChange = (data) => {
    setShowData(data);
    if (data === '2') {
      return navigate("/customers/totalspend");
    }
  };



  // const handleChange = (event, newValue) => {
  //   setShowData(newValue);
  // };


  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="MainDash" style={{ overflowX: 'auto', display: 'block' }}>
          <h1 className='main-Header'>Customers</h1>
          {/* <TabContext value={showData}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Item One" value="1" />
                <Tab label="Item Two" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
            <h1>Hello World</h1>
            <
            </TabPanel>
            <TabPanel value="2">
            <Ctable myData={myData} header={columns} />
            </TabPanel>
          </TabContext> */}
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList aria-label="lab API tabs example">
                <Tab label="Customers" value='1' onClick={() => { handleChange('1') }} />
                <Tab label="Customers By Total Spend" onClick={() => { handleChange('2') }} />
              </TabList>
            </Box>
          </TabContext>
          {
            customers?(<Ctable myData={customers} header={columns} />):(null)
          }
          

        </div>
      </div>
    </div>
  )
}

export default Customers