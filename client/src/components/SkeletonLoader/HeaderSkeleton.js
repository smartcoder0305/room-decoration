import React from 'react'
import { NavLink } from 'react-router-dom';

function HeaderSkeleton() {
  return (
    <>
      <header className="site-header fixed-top" style={{ zIndex: 98 }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-1 col-md-4 order-2 order-md-1 text-md-left text-right">
              {/* <img src="/assets/images/wtsap.svg" alt="" /> */}
              <span className="skeleton-loader first-sk-loader-header"></span>
            </div>

            <div className="col-9 col-md-4 text-left text-md-center order-1 order-md-2">
              <NavLink to="/">
                <img src="/assets/images/stk_logo.svg" alt="" />
              </NavLink>
            </div>

            <div className="col-2 col-md-4 text-right order-3 order-md-3">
              {/* <img
                src="/assets/images/bar.svg"
                alt=""
                id="menu"
                onClick={() => {
                  //   menushow();
                }}
              /> */}
              <span className="skeleton-loader first-sk-loader-header"></span>
            </div>
          </div>
          <div className="menu"
          //   style={{ right: width }}
          >
            <div className="menu-head text-center">
              <img
                src="/assets/images/menu-crs.png"
                alt=""
                className="crs"
                onClick={() => {
                  //   menuhide();
                }}
              />
              <img src="/assets/images/stk_logo.svg" alt="" />
            </div>
            <ul>
              <li>
                <b>התחלת הזמנה</b>
                <img src="/assets/images/arr.svg" alt="" />
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
        </div>
      </header>
    </>
  )
}

export default HeaderSkeleton