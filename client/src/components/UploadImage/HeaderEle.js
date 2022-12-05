import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState } from 'recoil'
import { overlayState } from '@atoms';

const HeaderEle = () => {
  const [_, setOverlay] = useRecoilState(overlayState);
  const [rightPosition, setRigthPosition] = useState('-250px');
  const menushow = () => {
    setRigthPosition("0px");
    setOverlay(true);
  };

  const menuhide = () => {
    setRigthPosition("-250px");
    setOverlay(false);
  };
  const handelHeaderLinkToHome = () => {
    localStorage.clear();
  };

  return (
    <>
      <link rel="stylesheet" href="assets/file/css/style2.css"></link>
      <div className="header_section">
        <div className="whatsapp">
          <img src="assets/file/images/whatsapp-icon.svg" alt="img" />
        </div>
        <div className="logo">
          <NavLink onClick={()=> handelHeaderLinkToHome()} to="/">
            <img src="assets/images/stk_logo.svg" alt="img" />
          </NavLink>
        </div>
        <div className="menu">
          <img
            src="assets/file/images/bar.svg"
            alt="img"
            onClick={() => {
              menushow();
            }}
          />
        </div>
      </div>

      <div id="mySidenav" className="sidenav" style={{ right: rightPosition }}>
       
          <img
            src="assets/images/menu-crs.svg"
            className="x"
            alt="img"
            onClick={() => {
              menuhide();
            }}
          />
          <img
            src="assets/images/stk_logo.svg"
            className="menu_logo"
            alt="img"
          />
        
        <img
          src="assets/file/images/Line_32.png"
          className="nav_line"
          alt="img"
        />
        <ul>
          <li>
            <b>הנמזה תלחתה</b> &nbsp;&nbsp;&nbsp;
            <img src="assets/images/arr.svg" alt="" />
          </li>
          <li>
            ר’גנסמב ונתיא ורבד&nbsp;&nbsp;&nbsp;
            <img src="assets/images/mcon1.svg" alt="" />
          </li>
          <li>
            פאצאווב ונתיא ורבד&nbsp;&nbsp;&nbsp;
            <img src="assets/images/mcon2.svg" alt="" />
          </li>
          <li>
            תוצופנ תולאש&nbsp;&nbsp;&nbsp;&nbsp;
            <img src="assets/images/mcon3.svg" alt="" />
          </li>
        </ul>

        <ul>
          <li className="menu_footer">
            <div className="menu_footer_border"></div>
            <u>מדיניות פרטיות</u> <u>תנאי שימוש</u>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeaderEle;
