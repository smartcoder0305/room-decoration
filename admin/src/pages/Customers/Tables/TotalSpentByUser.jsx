import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Ctable from '../../../components/Ctable/Ctable'
import Sidebar from '../../../components/Sidebar'
import { NavLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import '../style.css'
import Stable from '../../../components/Stable/Stable';
import { display } from '@mui/system';
import TotalSpentTable from './TotalSpentTable';

function TotalSpentByUser() {
    let navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [myData, setMyData] = useState([])
    // const [showData, setShowData] = useState('1');
    const [value, setValue] = useState('1');
    const getData = async () => {

        const token = localStorage.getItem('userToken')
        if (!token) {
            toast.error('you are not authorized')
            return navigate("/");
        }
        console.log(token)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }

            }
            const response = await axios.get(`${BASE_URL}/getall/filter/totaLspentbyuser`, config)
            console.log(response.data.usersData)
            if (response.status === 200) {
                setMyData(response.data.usersData)
            }

        } catch (error) {

        }
    }

    const columns = [
        {
            name: 'Phone Number'
        },
        {
            name: 'Total Amount Spend'
        },
        {
            name: 'Total Amount Spend'
        }
    ]

    useEffect(() => {
        getData()
    }, [])
    const handleChange = (data) => {
        if (data === '1') {
            return navigate("/customers");
        }
    };
    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar />
                <div className="MainDash" style={{ overflowX: 'auto', display: 'block' }}>
                    <h1 className='main-Header'>Customers</h1>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList aria-label="lab API tabs example">
                                <Tab label="Customers" onClick={() => { handleChange('1') }} />
                                <Tab label="Customers By Total Spend" value='1' onClick={() => { handleChange('2') }} />
                            </TabList>
                        </Box>
                    </TabContext>
                    {/* <Ctable myData={myData} header={columns} /> */}
                    <TotalSpentTable header={columns} myData={myData} />
                </div>
            </div>
        </div>
    )
}

export default TotalSpentByUser