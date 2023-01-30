import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HeaderSkeleton from "../SkeletonLoader/HeaderSkeleton";
import { useRecoilState } from 'recoil'
import { overlayState, showMenu } from '@atoms';

export default function Header() {
  const [_, setOverlay] = useRecoilState(overlayState);
  const [menuShow, setMenuShow] = useRecoilState(showMenu);
  const [skeleton, setSkeleton] = useState(true);
  const menushow = () => {
    setMenuShow(true);
    setOverlay(true);
  };
  // console.log('jojojojojohhhhhhhhhhhhhh')
  setTimeout(() => {
    setSkeleton(false);
  }, 1000);
  // document.onreadystatechange = function () {

  //   if (document.readyState === 'complete') {

  //   }
  // }

  const menuhide = () => {
    setMenuShow(false);
    setOverlay(false);
  };

  const handelHeaderLinkToHome = () => {
    // localStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      {/* <HeaderSkeleton /> */}
      <React.Fragment>
        <link rel="stylesheet" href="assets/css/style.css"></link>

        {skeleton ? (
          <HeaderSkeleton />
        ) : (
          <>
          <header className="site-header fixed-top" style={{ zIndex: 98 }}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-2 col-md-4 order-md-1 text-md-left text-right">
                  <img src="/assets/images/wtsap.svg" alt="" />
                </div>

                <div className="col-8 col-md-4 text-center text-md-center order-md-2">
                  <NavLink onClick={()=>handelHeaderLinkToHome()} to='/'>
                    <img src="/assets/images/betaSVG.svg" alt="" style={{marginTop: "5px"}}/>
                    &nbsp;&nbsp;
                    <img src="/assets/images/stk_logo.svg" alt="" />
                  </NavLink>
                </div>

                <div className="col-2 col-md-4 text-right order-md-3">
                  <img
                    src="/assets/images/bar.svg"
                    alt=""
                    id="menu"
                    onClick={() => {
                      menushow();
                    }}
                  />
                </div>
              </div>
            </div>
          </header>
          <div className="menu" style={{ right: menuShow ? '0' : '-100%' }}>
                <div className="menu-head text-center">
                  <img
                    src="/assets/images/menu-crs.png"
                    alt=""
                    className="crs"
                    onClick={() => {
                      menuhide();
                    }}
                  />
                  <img src="/assets/images/stk_logo.svg" alt="" />
                </div>
                <ul style={{ display: "grid" }}>
                  <li>
                    <b><a href="/upload-your-image">התחלת הזמנה</a></b>
                    <img src="/assets/images/arr.svg" alt="תמונות קיר ללא מסמרים"/>
                  </li>
                  <li>
                    <span>דברו איתנו במסנג’ר</span>
                    <img src="/assets/images/mcon1.svg" alt="" />
                  </li>
                  <li>
                    <span>דברו איתנו בוואצאפ</span>
                    <img src="/assets/images/mcon2.svg" alt="" />
                  </li>
                  <li>
                    <span>שאלות נפוצות</span>
                  </li>
                </ul>
              </div>
              </>
        )}
      </React.Fragment>
    </>
  );
}
