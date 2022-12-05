import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UilTrashAlt } from '@iconscout/react-unicons'
import { IconButton } from "@mui/material";
import SingleOrderButton from "../pages/Order/SingleOrderButton";



const STATUSES = Object.freeze({    ///Object.freeze() use for read on object it can't be modified
    SUCCESS: 'success',
    LOADING: 'loading',
    ERROR: 'error'
})
const token = localStorage.getItem('userToken')
const BASE_URL = process.env.REACT_APP_BASE_URL;
const orderSlice = createSlice({
    name: 'Order',
    initialState: {
        data: null,
        status: STATUSES,
    },
    reducers: {
        setOrders(state, action) {
            //DO NOT DO THIS BECAUSE REDUX CALL SYNC
            // const res = await fetch('https://fakestoreapi.com/products');
            state.data = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        },
        deleteOneOrder(state, action) {
            state.data = action.payload.order.filter((item) => {
                return item.uid !== action.payload.uid;
            })
        }
    },
})
export const { setOrders, setStatus, deleteOneOrder } = orderSlice.actions
export default orderSlice.reducer;


export function fetchOrders() {
    
    
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            }
            // const res = await axios.get(`${BASE_URL}/getall/filter/order/totalspending/desc`, config)
            const res = await axios.get(`${BASE_URL}/getall/filter/order/totalspending/asce`, config)
            // console.log('redux')
            // console.log(res)
            const myData = res.data.usersData.map((data) => {
                let dataObj = {
                    orderDate:data.createdAt,
                    oid:data.paymentdetails[0].oid,
                    address: data.address1,
                    city: data.city,
                    email: data.email,
                    fullName: data.fullName,
                    phone: data.phone,
                    postalCode: data.postalCode,
                    status: data.status,
                    finalPrice: data.totalSpending,
                    paymentdetails_id: data.paymentdetails[0].paymentInfo.cardHolderId,
                    cardNumber:data.paymentdetails[0].paymentInfo.cardNumber,
                    cardDate:data.paymentdetails[0].paymentInfo.cardDate,
                    cardCvv:data.paymentdetails[0].paymentInfo.cardCvv,
                    frame: data.images[0].frame,
                    imgesDownload:data.images,
                    totalImages: data.images.length,
                    uid: data.uid,
                    linkTo: (<>
                      <SingleOrderButton sent={true} url={'/orders/order/'} uid={data.paymentdetails[0].oid} /> <span>
                            <IconButton color="error" aria-label="upload picture" onClick={() => { deleteOrder(data.uid) }} component="span"><UilTrashAlt /></IconButton></span>
                    </>)
                }
                return dataObj
            })
            dispatch(setOrders(myData))
            dispatch(setStatus(STATUSES.SUCCESS))



            const  deleteOrder=async(uid)=> {
                let order = getState()
               
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
                    if(res.data.status===200){
                        // dispatch(deleteOneOrder({ uid, order:order.order.data }))
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

// const  deleteOrderFun=async (uid)=>{
//     try {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authorization': token
//             }
//         }
//         const res = await axios.get(`${BASE_URL}/getallusersdata`, config)
//     } catch (error) {
        
//     }
// }