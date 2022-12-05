import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import Logo from "../imgs/logo.svg";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData, SidebarPagesData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  }
  // console.log(window.innerWidth)



  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let navigate = useNavigate();

  const varyfyUser = async () => {
    const token = localStorage.getItem('userToken')
    if (!token) {
      toast.error('you are not authorized')
      return navigate("/");
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        }

      }
      const response = await axios.post(`${BASE_URL}/admin/verfy`, {}, config)
      if (response.data.status !== 200) {
        toast.error(response.data.message)
        navigate("/");
      }
    } catch (error) {

    }
  }

  const handelLogout = async () => {
    const token = localStorage.getItem('userToken')
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        }
      }
      const response = await axios.post(`${BASE_URL}/admin/logout`, {}, config)
      console.log(response.data)
      if (response.data) {
        toast.success(response.data.message)
        navigate("/");
      }
    } catch (error) {

    }

  }

  useEffect(() => {
    varyfyUser()
  }, [])

  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
        <UilBars />
      </div>
      <motion.div className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          {/* <span>
          Sh<span>o</span>ps
        </span> */}
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            if (item.type === 1) {
              return (
                <NavLink to={item.link}
                  // className={selected === index ? "menuItem active" : "menuItem"}
                  className="menuItem"
                  id={item.id}
                  key={index}
                // onClick={() => handelNavElement(item.id)}
                >
                  <item.icon />
                  <span id={index}>{item.heading}</span>
                </NavLink>
              );
            } else if (item.type === 2) {
              return (<h2>{item.heading}</h2>)
            }

          })}

          {/* {SidebarPagesData.map((item, index) => {
            return (
              <NavLink to={item.link}
                // className={selected === index ? "menuItem active" : "menuItem"}
                className="menuItem"
                id={item.id}
                key={index}
              // onClick={() => handelNavElement(item.id)}
              >
                <item.icon />
                <span id={index}>{item.heading}</span>
              </NavLink>
            );
          })} */}


          
          {/* signoutIcon */}
          <div className="menuItem">
            <UilSignOutAlt /> <span onClick={() => { handelLogout() }}>Logout</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
