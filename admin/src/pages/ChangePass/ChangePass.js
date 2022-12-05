import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../Signin/signin.css";

function ChangePass() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = useState("");
  const [password, setPssword] = useState("");
  const [newPassword, setNewPssword] = useState("");
  const [cnewPassword, setCnewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handelFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password || !newPassword || !cnewPassword) {
        toast.error("plz fill all filds");
      } else {
        const response = await axios.post(`${BASE_URL}/admin/changepassword`, {
          email,
          password,
          newPassword,
          cnewPassword,
        });
        if (response.data.status === 200) {
          toast.success(response.data.message);
          setLoading(false);
          setEmail("");
          setPssword("");
          setNewPssword("");
          setCnewPassword("");
          console.log(response.data);
        } else {
          toast.error(response.data.error);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="mymainBody"
        // style={{display:'flex',height:'100vh'}}
      >
        <div className="form">
          <div className="top text-center">
            <h1>Change Password</h1>
          </div>
          <form
            onSubmit={(e) => {
              handelFormSubmit(e);
            }}
          >
            <div className="data text-center">
              <input
                type="email"
                className="form-control"
                value={email}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control"
                value={password}
                placeholder="Password"
                onChange={(e) => setPssword(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control"
                value={newPassword}
                placeholder="New Password"
                onChange={(e) => setNewPssword(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control"
                value={cnewPassword}
                placeholder="Confirm New Password"
                onChange={(e) => setCnewPassword(e.target.value)}
                required
              />

              {/* <div className="text-left mrgnw">
                                <a href="#" className="forgotpsw">Forgot Password?</a>
                            </div> */}
            </div>
            <div className="submitdiv">
              <button type="submit" className="submitbtn">
                {loading ? "Loading..." : "Update Password"}{" "}
              </button>
              <div style={{ marginTop: "20px" }}>
                <Link to="/">Login</Link>
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
  );
}

export default ChangePass;
