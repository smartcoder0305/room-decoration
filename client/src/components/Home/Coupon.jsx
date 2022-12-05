import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Coupon() {
    const [data, setData] = useState()
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const getCoupon = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const getResp = await axios.get(`${BASE_URL}/admin/setting/getcupons`, config);
            console.log(getResp)
            if (getResp.data.status === 200) {
                setData(getResp.data.getCupon.cuponsAvalible)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getCoupon()
    }, [])
    return (
       <>
         {
            data? (<><img className='coupon-img-style' src = "/assets/file/images/Couponbar.svg" /></>): (null)
        }
       </>

    )
}

export default Coupon