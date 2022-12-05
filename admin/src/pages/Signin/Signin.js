import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import './signin.css'


function Signin() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [email, setEmail] = useState('');
    const [password, setPssword] = useState('');
    const [loading,setLoading] = useState(false);
    let navigate = useNavigate();


    const handelFormSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(`${BASE_URL}/admin/signin`, { email, password })
            if (response.data.status === 200) {
                toast.success(response.data.message)
                localStorage.setItem('userToken',response.data.token)
                navigate("/dashbord");
                console.log(response.data)
            } else {
                toast.error(response.data.error)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }

    }


    const isAlreadyLogin =async () =>{
        const user =localStorage.getItem('userToken') 
        if(user){
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': user
                }
        
              }
              const response = await axios.post(`${BASE_URL}/admin/verfy`, {}, config)
              if(response.data.status===200){
                navigate("/dashbord");
              }
        }
    
    }


    useEffect(()=>{
        isAlreadyLogin()
    },[])


    return (
        <>
            <div className='mymainBody'
            // style={{display:'flex',height:'100vh'}}
            >
                <div className="form">
                    <div className="top text-center">
                        <h1>Login</h1>
                    </div>
                    <form onSubmit={(e) => { handelFormSubmit(e) }}>
                        <div className="data text-center">
                            <input type="email" className="form-control" value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required />
                            <input type="password" className="form-control" value={password} placeholder="Password" onChange={(e) => setPssword(e.target.value)} required />

                            {/* <div className="text-left mrgnw">
                                <a href="#" className="forgotpsw">Forgot Password?</a>
                            </div> */}
                            
                        </div>
                        <div className="submitdiv">
                            <button type="submit" className="submitbtn">{loading?('Loading...'):('Login')} </button>
                            <div style={{marginTop: '20px'}}>
                            <Link to='/admin/changepassword'>Change Password</Link>
                            </div>
                        </div>
                    </form>
                    <Toaster position="bottom-center" reverseOrder={true} />
                        
                    {/* <div className="login_btm text-center">
                        <p>Not a member? <a href="#" className="signupbtn">Signup now</a></p>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Signin