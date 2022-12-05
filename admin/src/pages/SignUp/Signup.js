import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import '../Signin/signin.css'


function Signup() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPssword] = useState('');
    const [cpassword, setCpssword] = useState('');
    const [loading,setLoading] = useState(false);
    let navigate = useNavigate();


    const handelFormSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(`${BASE_URL}/admin/signup`, { name,email, password,cpassword })
            if (response.data.status === 200) {
                toast.success(response.data.message);
                navigate("/");
            } else {
                toast.error(response.data.message)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <>
            <div className='mymainBody'
            // style={{display:'flex',height:'100vh'}}
            >
                <div className="form">
                    <div className="top text-center">
                        <h1>Sign Up</h1>
                    </div>
                    <form onSubmit={(e) => { handelFormSubmit(e) }}>
                        <div className="data text-center">
                        <input type="text" className="form-control" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} required />
                            <input type="email" className="form-control" value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required />
                            <input type="password" className="form-control" value={password} placeholder="Password" onChange={(e) => setPssword(e.target.value)} required />
                            <input type="password" className="form-control" value={cpassword} placeholder="Confirm Password" onChange={(e) => setCpssword(e.target.value)} required />
                            {/* <div className="text-left mrgnw">
                                <a href="#" className="forgotpsw">Forgot Password?</a>
                            </div> */}
                        </div>
                        <div className="submitdiv">
                            <button type="submit" className="submitbtn">{loading?('Loading...'):('Login')} </button>
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

export default Signup