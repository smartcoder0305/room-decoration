import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Header from './FooterComponents/Header';

function FooterPage() {
    const [value,setValue]=useState()
const BASE_URL = process.env.REACT_APP_BASE_URL;
const getPage=async()=>{
try {
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${BASE_URL}/admin/getPagesById`,
        {},
        config
      );
  
      if (response.data.status === 200) {
        setValue(response.data.getPage);
      } 
} catch (error) {
    
}
}
useEffect(()=>{
    getPage()
},[])
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

export default FooterPage