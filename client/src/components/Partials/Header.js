import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HeaderSkeleton from "../SkeletonLoader/HeaderSkeleton";
import { useRecoilState } from 'recoil'
import { overlayState, showMenu, aboutUs } from '@atoms';
import { useSecondModal } from "@helpers/hooks/useSecondModal";
import useWindowDimensions from "@helpers/hooks/windowDemensions";

export default function Header() {
  const [_, setOverlay] = useRecoilState(overlayState);
  const [menuShow, setMenuShow] = useRecoilState(showMenu);
  const [skeleton, setSkeleton] = useState(true);
  const [aboutStatus, setAboutUs] = useRecoilState(aboutUs);
  const modal = useSecondModal();
  const { width } = useWindowDimensions();
  
  const menushow = () => {
    setMenuShow(true);
    setOverlay(true);
  };
  setTimeout(() => {
    setSkeleton(false);
  }, 1000);

  const menuhide = () => {
    setMenuShow(false);
    setOverlay(false);
  };

  const handelHeaderLinkToHome = () => {
    window.location.href = '/';
  };

  const handleAboutUsModal = (type) => {
    setAboutUs(type)
    if (width > 768) {
      modal('open', 'aboutUs')
    } else {
      modal('open', 'aboutUsMobile');
    }
  }

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
                  <img 
                    src="/assets/images/wtsap.svg" 
                    alt="" 
                    onClick={() => {
                      if (width > 767) {
                        modal('open', 'whatsApp');
                      } else {
                        modal('open', 'whatsAppMobile');
                      }
                    }}
                  style={{cursor: "pointer"}} />
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
              <li style={{marginBottom: "0px"}}>
                <NavLink to='upload-your-image'><b>התחל הזמנה</b></NavLink>
                <img src="/assets/images/arr.svg" alt="תמונות קיר ללא מסמרים"/>
              </li>
              <li style={{marginBottom: "0px"}}>
                <span>דברו איתנו במסנג’ר</span>
                <img src="/assets/images/mcon1.svg" alt="" />
              </li>
              <li style={{marginBottom: "0px"}}>
                <a href="https://wa.me/message/PRRDISOYMEUEB1" alt="" target="_blank" rel="noreferrer"><span>דברו איתנו בוואצאפ</span></a>
                <img src="/assets/images/mcon2.svg" alt="" />
              </li>
              <li style={{marginBottom: "0px"}} onClick={() => handleAboutUsModal('CQ')}>
                <span>שאלות נפוצות</span>
              </li>
            </ul>
            <div
              style={{
                position: "absolute",
                bottom: "20.5px",
                textAlign: "center",
                width: "360px",
                paddingRight: "55px"
              }}
            >
              <span style={{fontSize: "14px", color: "#C8C8C8", fontWeight: "300", lineHeight: "36px", textDecorationLine: "underline"}} onClick={() => handleAboutUsModal('AS')}>הצהרת נגישות</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{fontSize: "14px", color: "#C8C8C8", fontWeight: "300", lineHeight: "36px", textDecorationLine: "underline"}} onClick={() => handleAboutUsModal('PP')}>מדיניות פרטיות</span>
            </div>
          </div>
          </>
        )}
      </React.Fragment>
    </>
  );
}
