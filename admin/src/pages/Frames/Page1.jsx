import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import './pages.css'
import { Button } from '@mui/material';

function Page1() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [value, setValue] = useState('');
  let navigate = useNavigate();
  const token = localStorage.getItem('userToken')

console.log(value)
  const handelSubmitData = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      }

    }
    try {
      const submitPage = await axios.post(`${BASE_URL}/admin/addPages`, { pname: 'page1', data: value }, config)
      if(submitPage.data.status===200){
        window.location.reload();
      }else{
        toast.error('Somthing went wrong')
      }
     
    } catch (error) {

    }
  }


  const getData = async () => {
    if (!token) {
      toast.error('you are not authorized')
      return navigate("/");
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const getPage = await axios.post(`${BASE_URL}/admin/getPages`, { pname: 'page1'}, config)
      if(getPage.data.status===200){
        setValue(getPage.data.getPage.data)
      }
      console.log(getPage)
    } catch (error) {

    }
  }

  useEffect(()=>{
    getData()
  },[])



  return (
    <>
      <ReactQuill theme="snow" value={value} onChange={setValue}
      modules={{
					toolbar: [
						[{ 'header': [] }, { 'font': [] }],
						[{ size: [] }],
						['bold', 'italic', 'underline', 'strike', 'blockquote'],
						[
							{ 'list': 'ordered' },
							{ 'list': 'bullet' },
							{ 'indent': '-1' },
							{ 'indent': '+1' },
						],
						['link', 'image', 'video'],
						['clean'],
						[{ 'color': [] }, { 'background': [] }],
						[{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
						// [],
					]
				}}
				formats={[
					'header', 'font', 'size', 'color',
					'bold', 'italic', 'underline', 'strike', 'blockquote',
					'list', 'bullet', 'indent',
					'link', 'image', 'video',
					'align',
				]}
				style={{
					backgroundColor: '#fff',
					color: '#000',
					minHeight: '500px',
				}}
      />
      <div className='upload-page-btn'>
      <Button variant="contained" component="span" onClick={()=>{handelSubmitData()}}>
        Upload
      </Button>
      <Toaster position="bottom-center" reverseOrder={true} />
      </div>
      
    </>
  )
}

export default Page1