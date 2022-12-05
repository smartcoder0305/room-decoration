import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { UilMessage } from '@iconscout/react-unicons'
import toast, { Toaster } from 'react-hot-toast';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
function SingleCustomer() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const MAIN_URL = process.env.REACT_APP_MAIN_URL;
    const token = localStorage.getItem('userToken')
    const params = useParams()
    let navigate = useNavigate();
    const [myData, setMyData] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [pin, setPin] = useState('')




    const getData = async () => {
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
            const response = await axios.get(`${BASE_URL}/getusersdatabyId/${params.uid}`, config)
            console.log(response.data)
            if (response.status === 200) {

                setName(response.data.usersData[0]?.fullName)
                setEmail(response.data.usersData[0]?.email)
                setPhone(response.data.usersData[0]?.phone)
                setAddress(response.data.usersData[0]?.address1)
                setCity(response.data.usersData[0]?.city)
                setPin(response.data.usersData[0]?.postalCode)
                // console.log(myData)
                setMyData(response.data.usersData)
            }

        } catch (error) {
            console.log('something wrong')
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const handelInput = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        } else if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'phone') {
            setPhone(e.target.value)
        } else if (e.target.name === 'address') {
            setAddress(e.target.value)
        } else if (e.target.name === 'city') {
            setCity(e.target.value)
        } else if (e.target.name === 'pin') {
            setPin(e.target.value)
        }
    }

    const handelForm = async(e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            }
            const response = await axios.post(`${BASE_URL}/admin/customer/shipping/update`, { uid: myData[0]?.uid, name, email, phone, address, city, pin, }, config)
            if(response.data.status===200){
                toast.success('Updated Sucessfully')
            }else{
                toast.error('Something went wrong')
            }
        } catch (error) {

        }
    }
    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar />
                <div className="MainDash" style={{ overflowX: 'auto', display: 'flex' }}>
                    <div className="col-lg-5">
                        <div className="right_bx">
                        <h1 className='main-Header'>Edit Customer</h1>
                            <form style={{ marginBottom: '35px' }}>

                                {myData.length > 0 ? (<>
                                    <div className="form_row">

                                        <div className="col-lg-6 my-padd">
                                            <div className="form-group data">
                                                <label className="form-label">Name</label>
                                                <input type="text" className="form-control" name='name' value={name} onChange={(e) => { handelInput(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 my-padd">
                                            <div className="form-group data">
                                                <label className="form-label">Email</label>
                                                <input type="text" className="form-control" name='email' value={email} onChange={(e) => { handelInput(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 my-padd">
                                            <div className="form-group data">
                                                <label className="form-label">Phone</label>
                                                <input type="text" className="form-control" name='phone' value={phone} onChange={(e) => { handelInput(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 my-padd">
                                            <div className="form-group data">
                                                <label className="form-label">Address</label>
                                                <input type="text" className="form-control" name='address' value={address} onChange={(e) => { handelInput(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 my-padd">
                                            <div className="form-group data">
                                                <label className="form-label">City</label>
                                                <input type="text" className="form-control" name='city' value={city} onChange={(e) => { handelInput(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 my-padd">
                                            <div className="form-group data">
                                                <label className="form-label">Postal Code</label>
                                                <input type="text" className="form-control" name='pin' value={pin} onChange={(e) => { handelInput(e) }} />
                                            </div>
                                        </div>
                                    </div>
                                </>) : (null)}
                                <div className='center-update-button'>
                                <Button variant="contained" endIcon={<UilMessage />} onClick={(e) => { handelForm(e) }}>
                                    Update Customer
                                </Button>
                                </div>
                                
                            </form>
                            <Toaster position="bottom-center" reverseOrder={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SingleCustomer