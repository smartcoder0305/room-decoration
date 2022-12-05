import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import toast, { Toaster } from 'react-hot-toast';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material';
import { UilMessage } from '@iconscout/react-unicons'

function EditOrder() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const MAIN_URL = process.env.REACT_APP_MAIN_URL;
    const token = localStorage.getItem('userToken')
    const params = useParams()
    let navigate = useNavigate();
    const [myData, setMyData] = useState([])
    const [cstatus, setCstatus] = useState('')
    console.log(cstatus)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [pin, setPin] = useState('')
    const [cardId, setCardId] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardCvv, setCardCvv] = useState('')
    const [cardDate, setCardDate] = useState('')
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
                console.log(response.data.usersData[0]?.status)
                console.log(response.data.usersData[0]?.fullName)
                setName(response.data.usersData[0]?.fullName)
                setEmail(response.data.usersData[0]?.email)
                setPhone(response.data.usersData[0]?.phone)
                setAddress(response.data.usersData[0]?.address1)
                setCity(response.data.usersData[0]?.city)
                setPin(response.data.usersData[0]?.postalCode)
                setCardId(response.data.usersData[0]?.paymentdetails[0]?.paymentInfo.cardHolderId)
                setCardNumber(response.data.usersData[0]?.paymentdetails[0]?.paymentInfo.cardNumber)
                setCardCvv(response.data.usersData[0]?.paymentdetails[0]?.paymentInfo.cardCvv)
                setCardDate(response.data.usersData[0]?.paymentdetails[0]?.paymentInfo.cardDate)
                setCstatus(response.data.usersData[0]?.status)
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

    const handelForm =async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            }
            const response = await axios.post(`${BASE_URL}/admin/customer/update`,{uid:myData[0]?.uid,name,cstatus,email,phone,address,city,pin,cardId,cardNumber,cardCvv,cardDate}, config)
           if(response.data.status===200){
          
            toast.success('Updated Sucessfully')
           }else{
            toast.error('Something went wrong')
           }
            console.log(response)
        } catch (error) {

        }

    }
    function handelInput(e) {
        console.log(e.target.name)
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
        } else if (e.target.name === 'cardid') {
            setCardId(e.target.value)
        } else if (e.target.name === 'cardnumber') {
            setCardNumber(e.target.value)
        } else if (e.target.name === 'cardcvv') {
            setCardCvv(e.target.value)
        } else if (e.target.name === 'carddate') {
            setCardDate(e.target.value)
        }else if (e.target.name === 'status') {
            setCstatus(e.target.value)
        }
    }

    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar />
                <div className="MainDash">
                    <h1 className='main-Header'>Edit Order</h1>
                    <div className="col-lg-5">
                        <div className="right_bx">
                            <h1 className="tableheding">Customer details</h1>
                            <form style={{ marginBottom: '35px' }}>

                                {myData.length > 0 ? (<>
                                    <div className="form_row">
                                        <div className="col-lg-6 my-padd">
                                            <div className="form-group data">
                                                <label className="form-label">Change Status</label>
                                                {/* <input type="text" className="form-control" name='name' value={name} onChange={(e) => { handelInput(e) }} /> */}
                                                <select className="form-control" name='status' onChange={(e) => { handelInput(e) }}>
                                                    <option value={cstatus}>{cstatus}</option>
                                                    <option value="Untouched">Untouched</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Finalized">Finalized</option>
                                                    <option value="Customer complaint">Customer complaint</option>
                                                </select>
                                            </div>
                                        </div>
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
                                        <div className="col-lg-6 my-padd">
                                            <div className="form-group data">
                                                <label className="form-label">Card Holder Id</label>
                                                <input type="text" className="form-control" name='cardid' value={cardId} onChange={(e) => { handelInput(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 my-padd">
                                            <div className="form-group data">
                                                <label className="form-label">Card Number</label>
                                                <input type="text" className="form-control" name='cardnumber' value={cardNumber} onChange={(e) => { handelInput(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 my-padd">
                                            <div className="form-group data">
                                                <label className="form-label">CVV</label>
                                                <input type="text" className="form-control" name='cardcvv' value={cardCvv} onChange={(e) => { handelInput(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 my-padd">
                                            <div className="form-group data">
                                                <label className="form-label">Date</label>
                                                <input type="text" className="form-control" name='carddate' value={cardDate} onChange={(e) => { handelInput(e) }} />
                                            </div>
                                        </div>
                                    </div>
                                </>) : (null)}
                                <Button variant="contained" endIcon={<UilMessage />} onClick={(e) => { handelForm(e) }}>
                                    Send
                                </Button>
                            </form>
                            <Toaster position="bottom-center" reverseOrder={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOrder