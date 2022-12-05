import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import HeaderEle from "./HeaderEle";
import Slider from "react-slick";


const PaymentCancel = (props) => {
  const [payStatusMessage, setPayStatusMessage] = useState("");
  const [payerEmail, setPayerEmail] = useState("");
  const [payAmount, setPayAmount] = useState("");
  const location = useLocation();
  const history = useHistory()
  const PAGE_CODE = "26ba17d7e4f6";
  const PROCESS_ID = localStorage.getItem("paymentProcessId"); //365174
  const PROCESS_TOKEN = localStorage.getItem("paymentProcessToken"); //a5d26d69235ead8e43a62ccfbd29562d
  const API_URL = `/api/light/server/1.0/getPaymentProcessInfo/?pageCode=${PAGE_CODE}&processId=${PROCESS_ID}&processToken=${PROCESS_TOKEN}`;

  console.log(location.state)


  useEffect(() => {
    loadData();
  }, []);

document.getElementById('mainBody').classList.remove("overflowhdn")
  const loadData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    setPayStatusMessage(data.data.transactions[0].status);
    setPayerEmail(data.data.transactions[0].payerEmail);
    setPayAmount(data.data.transactions[0].sum);
  }

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <HeaderEle />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="success_img">
              <img
                src="assets/file/images/cancel_tick.png"
                alt="payment-success-icon"
              />
            </div>
            <h2 className="success_text xy">{payStatusMessage}</h2>
          </div>
        </div>
      </div>
      <div className="container xy">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="success_des">
              <div className="date_time">dd/mm/yy :תאריך</div>

              <div className="success_card_txt">
                <p>₪ {payAmount} :סה”כ </p>
                <p>551551 :מס‘ הזמנה </p>
              </div>
              <div className="success_other">
                <p>בחרתם 5 תמונות ואנחנו כבר מתחילים להכין את החבילה למשלוח </p>
                <p>{payerEmail} :בעוד מספר דקות תקבלו גם אישור אל </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container xp res-suc">
        <div className="row text-center">
          <h2 className="w-100 text-center">תונומת 6</h2>
          <p>
            .החלצהב הלבקתה הנמזהה ליימל רושיא ולבקת תוקד רפסמ דועב
            <span>youremail@gmail.com</span>
          </p>
          <span className="d-block text-right w-100 hb">551551 :הנמזה ‘סמ</span>
          <div className="class_fy text-center" style={{ width: "100%" }}>
            <br />
            <div
              className="bt-wrap text-center"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <a
                onClick={() => { history.push('/') }}
                className="btn succ_btn"
                style={{ fontWeight: 700, margin: "auto" }}
              >
                אני רוצה להזמין עוד
              </a>
              <p style={{ width: "100%",marginTop:'20px' }}>תיבה ףדל הרזח</p>
            </div>
            <br />
          </div>
        </div>
      </div>

      <div className="container xy">
        <div className="row justify-content-center">
          <div className="class_fy">
            <br />
            <a className="btn succ_btn" onClick={() => { history.push('/') }}>ביצוע הזמנה נוספת</a>
            <p>חזרה לדף הבית </p>
            <br />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <Slider {...settings}>
          <div>
            <div className="each-post">
              <div className="post-head">
                <img src="assets/images/slider-user.png" alt="" />
                <div className="head-txt">
                  <h6>talfeinstein</h6>
                  <p>Raanana, Israel</p>
                </div>
              </div>
              <img src="assets/images/slider-img1.png" alt="" />
              <div className="inst-info">
                <div className="info-grp">
                  <img src="assets/images/insccon1.svg" alt="" />
                  <img src="assets/images/insccon2.svg" alt="" />
                  <img src="assets/images/insccon3.svg" alt="" />
                </div>
                <p>
                  <b style={{ marginRight: "5px" }}>talfeinstein</b>במננעגד רקק כדש
                  דגש כדגש כגדש כגדשכגשד
                  <br /> דגש כדגש כגדש כגדשכגשד{" "}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="each-post">
              <div className="post-head">
                <img src="assets/images/slider-user.png" alt="" />
                <div className="head-txt">
                  <h6>talfeinstein</h6>
                  <p>Raanana, Israel</p>
                </div>
              </div>
              <img src="assets/images/slider-img1.png" alt="" />
              <div className="inst-info">
                <div className="info-grp">
                  <img src="assets/images/insccon1.svg" alt="" />
                  <img src="assets/images/insccon2.svg" alt="" />
                  <img src="assets/images/insccon3.svg" alt="" />
                </div>
                <p>
                  <b style={{ marginRight: "5px" }}>talfeinstein</b>במננעגד רקק כדש
                  דגש כדגש כגדש כגדשכגשד
                  <br /> דגש כדגש כגדש כגדשכגשד{" "}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="each-post">
              <div className="post-head">
                <img src="assets/images/slider-user.png" alt="" />
                <div className="head-txt">
                  <h6>talfeinstein</h6>
                  <p>Raanana, Israel</p>
                </div>
              </div>
              <img src="assets/images/slider-img1.png" alt="" />
              <div className="inst-info">
                <div className="info-grp">
                  <img src="assets/images/insccon1.svg" alt="" />
                  <img src="assets/images/insccon2.svg" alt="" />
                  <img src="assets/images/insccon3.svg" alt="" />
                </div>
                <p>
                  <b style={{ marginRight: "5px" }}>talfeinstein</b>במננעגד רקק כדש
                  דגש כדגש כגדש כגדשכגשד
                  <br /> דגש כדגש כגדש כגדשכגשד{" "}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="each-post">
              <div className="post-head">
                <img src="assets/images/slider-user.png" alt="" />
                <div className="head-txt">
                  <h6>talfeinstein</h6>
                  <p>Raanana, Israel</p>
                </div>
              </div>
              <img src="assets/images/slider-img1.png" alt="" />
              <div className="inst-info">
                <div className="info-grp">
                  <img src="assets/images/insccon1.svg" alt="" />
                  <img src="assets/images/insccon2.svg" alt="" />
                  <img src="assets/images/insccon3.svg" alt="" />
                </div>
                <p>
                  <b style={{ marginRight: "5px" }}>talfeinstein</b>במננעגד רקק כדש
                  דגש כדגש כגדש כגדשכגשד
                  <br /> דגש כדגש כגדש כגדשכגשד{" "}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="each-post">
              <div className="post-head">
                <img src="assets/images/slider-user.png" alt="" />
                <div className="head-txt">
                  <h6>talfeinstein</h6>
                  <p>Raanana, Israel</p>
                </div>
              </div>
              <img src="assets/images/slider-img1.png" alt="" />
              <div className="inst-info">
                <div className="info-grp">
                  <img src="assets/images/insccon1.svg" alt="" />
                  <img src="assets/images/insccon2.svg" alt="" />
                  <img src="assets/images/insccon3.svg" alt="" />
                </div>
                <p>
                  <b style={{ marginRight: "5px" }}>talfeinstein</b>במננעגד רקק כדש
                  דגש כדגש כגדש כגדשכגשד
                  <br /> דגש כדגש כגדש כגדשכגשד{" "}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="each-post">
              <div className="post-head">
                <img src="assets/images/slider-user.png" alt="" />
                <div className="head-txt">
                  <h6>talfeinstein</h6>
                  <p>Raanana, Israel</p>
                </div>
              </div>
              <img src="assets/images/slider-img1.png" alt="" />
              <div className="inst-info">
                <div className="info-grp">
                  <img src="assets/images/insccon1.svg" alt="" />
                  <img src="assets/images/insccon2.svg" alt="" />
                  <img src="assets/images/insccon3.svg" alt="" />
                </div>
                <p>
                  <b style={{ marginRight: "5px" }}>talfeinstein</b>במננעגד רקק כדש
                  דגש כדגש כגדש כגדשכגשד
                  <br /> דגש כדגש כגדש כגדשכגשד{" "}
                </p>
              </div>
            </div>
          </div>
        </Slider>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-enter xp py-3">
            <p className="text-center">עיצבתם קיר מושלם? תייגו אותנו!</p>
          </div>
          <div className="col-md-2 col-3 text-md-left text-center py-md-3 sucesspage-social-links-main">
            <img src="assets/file/images/res-so1.svg" className="xp bb" />
            <img src="assets/file/images/fb.png" className="xy dd" />
            <div className="sucesspage-social-links-heading">stickable.il</div>
          </div>
          <div className="col-md-2 col-3 text-md-left text-center py-md-3 sucesspage-social-links-main">
            <img src="assets/file/images/res-so2.svg" className="xp bb" />
            <img src="assets/file/images/instagram.png" className="xy dd" />
            <div className="sucesspage-social-links-heading">Stickable</div>
          </div>
        </div>
      </div>

      <div className="bottom_border text-center bgbg"></div>

      <section className="footer-btm xy">
        <p> &copy; Stickable 2022</p>
        <div className="btm-wrap">
          <a
            href="#"
            title="leads to a floating screen 2"
            data-target="#float2"
            data-toggle="modal"
          >
            מדיניות פרטיות
          </a>
          <a
            href="#"
            title="leads to a floating screen 3"
            data-target="#float3"
            data-toggle="modal"
          >
            תנאי שימוש
          </a>
        </div>
      </section>
    </>
  );
};

export default PaymentCancel;
