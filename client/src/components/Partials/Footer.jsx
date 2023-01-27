import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useWindowDimensions from "@helpers/hooks/windowDemensions";
import { useSecondModal } from "@helpers/hooks/useSecondModal";
import "./footer.css";
import { Grid } from "swiper";

const Footer = ({existData}) => {
  const [reviewData, setReviewData] = useState([]);
  const { width } = useWindowDimensions();
  const modal = useSecondModal();

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const getPages = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(`${BASE_URL}/admin/getAllPages`, config);

      if (response.data.status === 200) {
        setReviewData(response.data.getPage);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getPages();
  }, []);

  const handleAboutUsModal = (type) => {
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
              <img src="/assets/images/stk_logo.svg" alt="" />
            </div>
            <div className="footer-column" style={{order: "1"}}>
              <div className="foo-content">
                <div className="foo-wrap">
                  <h5>יש לכם שאלה? מעוניינים לדבר?</h5>
                  <p>דברו עם נציג מצוות התמיכה והשירות.</p>
                </div>
                <img src="/assets/images/wa.png" alt="" />
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
                    style={{color: "white"}}
                  >
                    דברו איתנו
                  </a>

                  {/* <NavLink
                    to="#"
                    title="leads to ManyChat facebook messenger api"
                  >
                    <img src="/assets/images/fb.svg" alt="" />
                  </NavLink> */}
                </div>
              </div>
            </div>
            {width <= 768 && 
            <div
              className="footer-column" 
              style={{order: "3", marginTop: "-20px"}}
              onClick={() => {
                if (width > 767) {
                  modal('open', 'whatsApp');
                } else {
                  modal('open', 'whatsAppMobile');
                }
              }}>
                <h6 style={{lineHeight: "31px"}}>דברו איתנו &nbsp;<img src="/assets/file/images/whatsapp_black.png" style={{width: "30px", height: "30px"}} /></h6>
            </div>
            }
            <div className="footer-column" style={{order: "2", display: width <= 768 ? "grid" : null}}>
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
                          title="leads to the page in facebook"
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
                    <NavLink to="#" title="leads to the page in facebook">
                      פייסבוק
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#" title="leads to the page in instagram">
                      אינסטגרם
                    </NavLink>
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
                    <NavLink to="#" onClick={() => handleAboutUsModal('PS')}>
                    הצהרת פרטיות
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#" onClick={() => handleAboutUsModal('CQ')}>
                    שאלות נפוצות 
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#" onClick={() => handleAboutUsModal('TU')}>
                    תנאי שימוש 
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
      <section className="footer-btm">
        <p>Copyright Blends 2021-{new Date().getFullYear()} &copy;</p>
        <div className="btm-wrap">
          <NavLink
            to="/privacy-policy"
            title="leads to a floating screen 2"
            data-target="#float2"
            data-toggle="modal"
          >
            {" "}
            מדיניות פרטיות
          </NavLink>
          <NavLink
            to="#"
            title="leads to a floating screen 3"
            data-target="#float3"
            data-toggle="modal"
          >
            {" "}
            תנאי שימוש{" "}
          </NavLink>
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
        <div className="mobile-stick-bottom">
          <p> <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="9" cy="9" r="9" fill="#304036" />
              <path
                d="M8.61488 5.596C8.53488 5.596 8.46688 5.572 8.41088 5.524C8.36288 5.468 8.33887 5.4 8.33887 5.32V4.672C8.33887 4.592 8.36288 4.524 8.41088 4.468C8.46688 4.412 8.53488 4.384 8.61488 4.384H9.37088C9.45088 4.384 9.51888 4.412 9.57488 4.468C9.63088 4.524 9.65888 4.592 9.65888 4.672V5.32C9.65888 5.4 9.63088 5.468 9.57488 5.524C9.51888 5.572 9.45088 5.596 9.37088 5.596H8.61488ZM8.71088 13C8.63088 13 8.56288 12.976 8.50688 12.928C8.45888 12.872 8.43488 12.804 8.43488 12.724V7.036C8.43488 6.956 8.45888 6.892 8.50688 6.844C8.56288 6.788 8.63088 6.76 8.71088 6.76H9.28688C9.36688 6.76 9.43088 6.788 9.47888 6.844C9.53488 6.892 9.56288 6.956 9.56288 7.036V12.724C9.56288 12.804 9.53488 12.872 9.47888 12.928C9.43088 12.976 9.36688 13 9.28688 13H8.71088Z"
                fill="white"
              />
            </svg> 
            זמני המשלוח מהירים במיוחד השבוע 
           
          </p>
          {existData ? (
            <NavLink to="/review-your-images" className="site-btn">
              בואו נמשיך
            </NavLink>
            ) : (
            <NavLink to="/upload-your-image" className="site-btn">
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