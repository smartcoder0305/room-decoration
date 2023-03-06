import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useWindowDimensions from "@helpers/hooks/windowDemensions";
import { useSecondModal } from "@helpers/hooks/useSecondModal";
import "./footer.css";
import { useRecoilState } from 'recoil'
import { aboutUs } from '@atoms';

const Footer = ({existData}) => {
  const [reviewData, setReviewData] = useState([]);
  const { width } = useWindowDimensions();
  const modal = useSecondModal();
  const [aboutStatus, setAboutUs] = useRecoilState(aboutUs);

  const handleAboutUsModal = (type) => {
    setAboutUs(type)
    if (width > 768) {
      modal('open', 'aboutUs')
    } else {
      modal('open', 'aboutUsMobile');
    }
  }

  return (
    <React.Fragment>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-row">
            <div className="footer-logo">
            <img src="/assets/images/betaSVG.svg" alt="" style={{marginTop: "5px"}}/>
                    &nbsp;&nbsp;
                    <img src="/assets/images/stk_logo.svg" alt="" />
            </div>
            <div className="footer-column" style={{order: "2"}}>
              <div className="foo-content">
                <div className="foo-wrap">
                  <h5>יש לכם שאלה? רוצים לדבר איתנו?</h5>
                  <p>דברו עם נציג מצוות התמיכה והשירות.</p>
                </div>
                <img src="/assets/images/wa.svg" alt="דברו עם בלנדס בוואצאפ" />
                <div className="ex-wrap">
                  <a
                    onClick={() => {
                      if (width > 767) {
                        modal('open', 'whatsApp');
                      } else {
                        modal('open', 'whatsAppMobile');
                      }
                    }}
                    className="link"
                    title="leads to a Q&A screen"
                    style={{color: "white", cursor: "pointer"}}
                  >
                    דברו איתנו
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-column" style={{order: "1", display: width <= 768}}>
              <div
                className="foo-menu-wrap xp"
                style={{ marginBottom: "20px" }}
              >
                <ul className="footer-ul-li">
                  {reviewData.map((data, index) => {
                    return (
                      <li key={index}>
                        <NavLink
                          to={`/page/${data._id}`}
                          title="הפייסבוק של בלנדס"
                        >
                          {data.pname}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="foo-menu-wrap" style={{order: width <= 768 ? 2 : 1 }}>
                <h6>עקבו אחרינו</h6>
                <ul className="footer-ul-li">
                  <li>
                    <img
                    src="/assets/images/facebook.svg" alt="הפייסבוק של בלנדס"></img>
                    &nbsp;&nbsp;
                    <a href="https://www.facebook.com/profile.php?id=100086212847385">
                      פייסבוק
                    </a>
                  </li>
                  <li>
                  <img
                    src="/assets/images/instagram.svg" alt="האינסטגרם של בלנדס"></img>
                    &nbsp;&nbsp;
                    <a href="https://www.instagram.com/blends_il/">
                      אינסטגרם
                    </a>
                  </li>
                </ul>
              </div>
              <div className="foo-menu-wrap" style={{order: width <= 768 ? 1 : 2 }}>
                <h6>אודותינו</h6>
                <ul className="footer-ul-li">
                  <li>
                    <NavLink to="#" onClick={() => handleAboutUsModal('AS')}>
                    הצהרת נגישות
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#" onClick={() => handleAboutUsModal('PP')}>
                    מדיניות פרטיות
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#" onClick={() => handleAboutUsModal('CQ')}>
                    שאלות נפוצות
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#" onClick={() => handleAboutUsModal('SR')}>
                    משלוחים והחזרות
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-column" style={{order: "3"}}>
              <h6>אנחנו עובדים עם</h6>
              <ul className="payment">
                <li>
                  <img src="/assets/images/ApplePay.svg" alt="" />
                </li>
                <li>
                  <img src="/assets/images/pay2.svg" alt="" />
                </li>
                <li>
                  <img src="/assets/images/pay3.svg" alt="" />
                </li>
                <li>
                  <img src="/assets/images/pay5.svg" alt="" />
                </li>
                <li>
                  <img src="/assets/file/images/BitFooter.svg" alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <section className="footer-btm" style={{justifyContent: "center"}}>
        <div style={{display: "flex", maxWidth: "1110px", justifyContent: "center", width: "100%"}}>
          <p style={{lineHeight: "36px", margin: "0"}}>Copyright Blends 2021-{new Date().getFullYear()} &copy;</p>
          <div className="btm-wrap">
            <NavLink
              to="#"
              title="מדיניות פרטיות"
              data-target="#float2"
              data-toggle="modal"
              style={{fontSize: "14px", color: "#C8C8C8", fontWeight: "300", lineHeight: "36px", textDecorationLine: "underline"}}
              onClick={() => handleAboutUsModal('PP')}
            >
              מדיניות פרטיות
            </NavLink>
            <NavLink
              to="#"
              title="הצהרת נגישות"
              data-target="#float3"
              data-toggle="modal"
              style={{fontSize: "14px", color: "#C8C8C8", fontWeight: "300", lineHeight: "36px", textDecorationLine: "underline"}}
              onClick={() => handleAboutUsModal('AS')}
            >
              הצהרת נגישות
            </NavLink>
          </div>
        </div>
      </section>
      <div className="modal fade" id="float3">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4
                className="modal-title"
                style={{ width: "100%", textAlign: "center" }}
              >
                תנאי שימוש
              </h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body" style={{ minHeight: "300px" }}></div>

            <div className="modal-footer text-center justify-content-center">
              <button
                type="button"
                className="btn btn-secondary ftt"
                data-dismiss="modal"
              >
                יקוא
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="float2">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4
                className="modal-title"
                style={{ width: "100%", textAlign: "center" }}
              >
                מדיניות פרטיות
              </h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body" style={{ minHeight: "300px" }}></div>

            <div className="modal-footer text-center justify-content-center">
              <button
                type="button"
                className="btn btn-secondary ftt"
                data-dismiss="modal"
              >
                יקוא
              </button>
            </div>
          </div>
        </div>
      </div>
      {width <= 768 && (
        <div className="mobile-stick-bottom" style={{fontWeight: 300, color: "#727272"}}>
          <p> 
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14H13C14.1 14 15 13.1 15 12V2H6C4.5 2 3.19001 2.82999 2.51001 4.04999" stroke="#727272" strokeWidth="1.5" strokeLinecap="round" strokeLinejoinn="round"/>
              <path d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12" stroke="#727272" strokeWidth="1.5" strokeLinecap="round" strokeLinejoinn="round"/>
              <path d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z" stroke="#727272" strokeWidth="1.5" strokeLinecap="round" strokeLinejoinn="round"/>
              <path d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z" stroke="#727272" strokeWidth="1.5" strokeLinecap="round" strokeLinejoinn="round"/>
              <path d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z" stroke="#727272" strokeWidth="1.5" strokeLinecap="round" strokeLinejoinn="round"/>
              <path d="M2 8H8" stroke="#727272" strokeWidth="1.5" strokeLinecap="round" strokeLinejoinn="round"/>
              <path d="M2 11H6" stroke="#727272" strokeWidth="1.5" strokeLinecap="round" strokeLinejoinn="round"/>
              <path d="M2 14H4" stroke="#727272" strokeWidth="1.5" strokeLinecap="round" strokeLinejoinn="round"/>
            </svg>
            זמני המשלוח מהירים במיוחד השבוע 
           
          </p>
          {existData || localStorage.getItem('dataExist') == 1 ? (
            <NavLink to="/review-your-images" className="site-btn" style={{fontWeight: "700"}}>
              בואו נמשיך
            </NavLink>
            ) : (
            <NavLink to="/upload-your-image" className="site-btn" style={{fontWeight: "700"}}>
              בואו נתחיל
            </NavLink>
            )
          }
        </div>
      )}
    </React.Fragment>
  );
}

export default Footer;