import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Header from './FooterComponents/Header'

function Window1() {
    const [value, setValue] = useState('')
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const getData = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const getResp = await axios.post(`${BASE_URL}/admin/getPages`, { pname: 'page1' }, config);
            if (getResp.data.status === 200) {
                setValue(getResp.data.getPage.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <Header name={'תנאי שימוש'} />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div style={{ marginTop: '55px' }}></div>
                        <div class="text_area">
                            {
                                value ? (<>
                                <div className='ql-editor'>
                                <div dangerouslySetInnerHTML={{__html: value}}></div>
                                </div> 
                                </>) : (<><h1>We Publish Page Soon......</h1></>)
                            }
                        </div>
                        <div class="button_bx">
                            <NavLink to="/" class="site-whtbtn">יקוא</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Window1