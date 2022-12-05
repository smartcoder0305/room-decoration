import { Box, Button, IconButton, Tab } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar'
import Stable from '../../../components/Stable/Stable'
import '../style.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../store/orderSlice';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { fetchOrdersThisWeek } from '../../../store/orderThisWeekSlice';


function OrderThisWeek() {
  const [value, setValue] = React.useState('1');
  const despatch = useDispatch()
  const orders = useSelector((state) =>state.orderWeek.data)
  console.log(orders)
  let navigate = useNavigate();

  const columns = [
    {
      name: 'Order Id'
    },
    {
      name: 'Date & Time'
    },
    {
      name: 'Name'
    },
    {
      name: 'Card Holder ID'
    },
    {
      name:'Card Number'
    },
    {
      name: 'Address'
    },
    {
      name: 'Frame'
    },
    {
      name: 'Images'
    },
    {
      name: 'Amount'
    },
    {
      name: 'Status'
    },
    {
      name: 'Action'
    },
    {
      name: 'Download'
    }
  ]
  const handleChange = (data) => {
    console.log(data)
    if (data === 1) {
      return navigate("/orders");
    }
    if (data === 3) {
      return navigate("/orders/filter/orderthis/month");
    }
  };
  useEffect(() => {
    despatch(fetchOrdersThisWeek())
  }, [])
  console.log(orders)
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="MainDash">
          <h1 className='main-Header'>Orders</h1>
          {/* {orders ? (<>
            <Stable myData={orders} header={columns} />
          </>) : (null)} */}
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList aria-label="lab API tabs example">
                <Tab label="Total Order" onClick={() => { handleChange(1) }} />
                <Tab label="Total Order This Week" value="1" onClick={() => { handleChange(2) }} />
                <Tab label="Total Order This Month" onClick={() => { handleChange(3) }} />
              </TabList>
            </Box>
          </TabContext>
          {orders ? (<>
            <Stable myData={orders} header={columns} />
          </>) : (<h1>No Order This Week</h1>)}
        </div>
      </div>
    </div>
  )
}

export default OrderThisWeek