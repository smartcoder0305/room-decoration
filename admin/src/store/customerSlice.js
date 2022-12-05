import { IconButton } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import SingleOrderButton from "../pages/Order/SingleOrderButton";
import { UilTrashAlt } from '@iconscout/react-unicons'

const STATUSES = Object.freeze({    ///Object.freeze() use for read on object it can't be modified
    SUCCESS: 'success',
    LOADING: 'loading',
    ERROR: 'error'
})

const token = localStorage.getItem('userToken')
const BASE_URL = process.env.REACT_APP_BASE_URL;

const customerSlice = createSlice({
    name: 'Customers',
    initialState: {
        data: null,
        status: STATUSES,
    },
    reducers: {
        setCustomer(state, action) {
            //DO NOT DO THIS BECAUSE REDUX CALL SYNC
            // const res = await fetch('https://fakestoreapi.com/products');
            state.data = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        },
        deleteOneCustomer(state, action) {
            state.data = action.payload.customer.filter((item) => {
                return item.uid !== action.payload.uid;
            })
        }
    },
})
export const { setCustomer, setStatus, deleteOneCustomer } = customerSlice.actions
export default customerSlice.reducer;


export function fetchCustomers() {


    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            }

            const res = await axios.get(`${BASE_URL}/getallusersdata`, config)
            console.log('redux')
            // console.log(res)
            const myData = res.data.usersData.map((data) => {
                let dataObj = {
                    address: data.address1,
                    city: data.city,
                    email: data.email,
                    fullName: data.fullName,
                    phone: data.phone,
                    postalCode: data.postalCode,
                    status: data.status,
                    finalPrice: data.totalSpending,
                    paymentdetails_id: data.paymentdetails[0].paymentInfo.cardHolderId,
                    frame: data.images[0].frame,
                    totalImages: data.images.length,
                    uid: data.uid,
                    action:(<>
                          <SingleOrderButton sent={true} url={'/orders/order/'} uid={data.paymentdetails[0].oid} /> <span></span>
                    </>),
                    linkTo: (<>
                        <SingleOrderButton sent={true} url={'/customers/customer/edit/'} uid={data.uid} /> <span>
                            <IconButton color="error" aria-label="upload picture" onClick={() => { deleteCustomer(data.uid) }} component="span"><UilTrashAlt /></IconButton></span>
                    </>)
                }
                return dataObj
            })
            dispatch(setCustomer(myData))
            dispatch(setStatus(STATUSES.SUCCESS))



            const deleteCustomer = async (uid) => {
                let customer = getState()

                try {

                   let a= window.confirm("Are You Sure ?")
                   if(a){
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': token
                        }
                    }
                    const res = await axios.get(`${BASE_URL}/user/delete/${uid}`, config)
                    if (res.data.status === 200) {
                        // dispatch(deleteOneCustomer({ uid,customer: customer.customer.data }))
                        window.location.reload();
                    }
                   }
                   
                } catch (error) {

                }
            }

        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}