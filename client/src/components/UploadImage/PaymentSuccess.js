import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import HeaderEle from "./HeaderEle";
import SliderReview from "../Partials/SliderReview";
import SliderNew from "../Partials/SliderNew";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PaymentSuccess = () => {
  const history = useHistory();
  console.log("hi from sucess");
  const [orderDeteils, setOrderDeteils] = useState({});
  const queryParams = new URLSearchParams(window.location.search);
  console.log(queryParams);
  // const price = queryParams.get("price");
  // const orderid = queryParams.get("orderid");
  // const email = queryParams.get("email");
  // const imagescount = queryParams.get("imagescount");

  const price = orderDeteils.finalPrice;
  const orderid = orderDeteils.oid;
  const email = orderDeteils.email;
  const imagescount = orderDeteils.frameQuantity;

  const loadData = () => {
    const orderData = JSON.parse(localStorage.getItem("order-details"));
    if (!orderData) {
      history.push("/");
    }
    setOrderDeteils(orderData);

  
  };
  console.log(orderDeteils);
  useEffect(() => {
    loadData();
  }, []);
  const location = useLocation();
  // console.log(location.state)

  // if (!location.state) {
  //   history.push('/')
  // }
  document.getElementById("mainBody").classList.remove("overflowhdn");

  let storageData = JSON.parse(
    window.localStorage.getItem("userShippingAddress")
  );
  console.log(storageData);

  // const loadData = async () => {
  //   const paymentData = {
  //     uniqueUserId: localStorage.getItem("uniqueUserId"),
  //     processId: localStorage.getItem("paymentProcessId"),
  //     processToken: localStorage.getItem("paymentProcessToken"),
  //   };

  //   const config = {
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   };

  //   // await axios
  //   //   .post(BASE_URL + "/payment-processing-information", paymentData, config)
  //   //   .then((res) => {
  //   //     console.log(res.data.data.url);
  //   //     localStorage.removeItem("uniqueUserId");
  //   //     localStorage.removeItem("userShippingAddress");
  //   //     localStorage.removeItem("paymentProcessId");
  //   //     localStorage.removeItem("paymentProcessToken");
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  // };

  const againShoping = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <>
      <HeaderEle />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="success_img">
              <img
                src="assets/file/images/sucess-page-main-icon.svg"
                alt="payment-success-icon"
                style={{ width: "80px" }}
              />
            </div>
            <h2 className="success_text xy">ההזמנה שלכם עברה בהצלחה</h2>
          </div>
        </div>
      </div>
      <div className="container xy">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="success_des">
              <div className="date_time">
                {new Date().toLocaleString()} :תאריך
              </div>

              <div className="success_card_txt">
                <p>₪{price}:סה”כ </p>
                <p>{orderid}:מס‘ הזמנה </p>
              </div>
              <div className="success_other">
                {/* <p>בחרתם 2 תמונות ואנחנו כבר מתחילים להכין את החבילה למשלוח </p>
                <p>example@gmail.com :בעוד מספר דקות תקבלו גם אישור אל </p> */}
                <p>
                  בחרתם {imagescount} תמונות ואנחנו כבר מתחילים להכין את החבילה
                  למשלוח{" "}
                </p>
                <p>{email} :בעוד מספר דקות תקבלו גם אישור אל </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container xp res-suc">
        <div className="row text-center">
          <h2 className="w-100 text-center sucess-page-header">
            {" "}
            {imagescount} תמונות
          </h2>
          <p className="sucess-page-desc">
            .ההזמנה התקבלה בהצלחה בעוד מספר דקות תקבלו אישור למייל{" "}
            <span>
              {/* example@gmail.com */}
              {email}
            </span>
          </p>
          <span className="d-block text-right w-100 hb sucess-page-order">
            {orderid}:מס‘ הזמנה
          </span>
          <div className="class_fy text-center">
            <br />
            <div
              className="bt-wrap  "
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <button
                className="btn succ_btn"
                style={{ fontWeight: 700, margin: "auto" }}
                onClick={() => {
                  againShoping();
                }}
              >
                אני רוצה להזמין עוד
              </button>
              <p
                style={{
                  width: "100%",
                  marginTop: "12px",
                  fontSize: "14px",
                  letterSpacing: "1px",
                  fontFamily: "Rubik",
                }}
              >
                חזרה לדף הבית
              </p>
            </div>
            <br />
          </div>
        </div>
      </div>

      <div className="container xy">
        <div className="row justify-content-center">
          <div className="class_fy sucess-page-btn">
            <br />
            <button
              className="btn succ_btn"
              onClick={() => {
                againShoping();
              }}
            >
              ביצוע הזמנה נוספת
            </button>
            <p>חזרה לדף הבית </p>
            <br />
          </div>
        </div>
      </div>

      {/* <SliderReview /> */}
      <SliderNew />
      {/* <div className="post-slider owl-carousel" id="posts">
        <div className="each-post">
          <div className="post-head">
            <img src="assets/file/images/slider-user.png" alt="" />
            <div className="head-txt">
              <h6>talfeinstein</h6>
              <p>Raanana, Israel</p>
            </div>
          </div>
          <img src="assets/file/images/slider-img1.png" alt="" />
          <div className="inst-info">
            <div className="info-grp">
              <img src="assets/file/images/insccon1.svg" alt="" />
              <img src="assets/file/images/insccon2.svg" alt="" />
              <img src="assets/file/images/insccon3.svg" alt="" />
            </div>
            <p>
              <b style={{ marginRight: "5px" }}>talfeinstein</b>במננעגד רקק כדש
              דגש כדגש כגדש כגדשכגשד
              <br /> דגש כדגש כגדש כגדשכגשד{" "}
            </p>
          </div>
        </div>
        <div className="each-post">
          <div className="post-head">
            <img src="assets/file/images/slider-user.png" alt="" />
            <div className="head-txt">
              <h6>talfeinstein</h6>
              <p>Raanana, Israel</p>
            </div>
          </div>
          <img src="assets/file/images/slider-img1.png" alt="" />
          <div className="inst-info">
            <div className="info-grp">
              <img src="assets/file/images/insccon1.svg" alt="" />
              <img src="assets/file/images/insccon2.svg" alt="" />
              <img src="assets/file/images/insccon3.svg" alt="" />
            </div>
            <p>
              <b style={{ marginRight: "5px" }}>talfeinstein</b>במננעגד רקק כדש
              דגש כדגש כגדש כגדשכגשד
              <br /> דגש כדגש כגדש כגדשכגשד{" "}
            </p>
          </div>
        </div>
        <div className="each-post">
          <div className="post-head">
            <img src="assets/file/images/slider-user.png" alt="" />
            <div className="head-txt">
              <h6>talfeinstein</h6>
              <p>Raanana, Israel</p>
            </div>
          </div>
          <img src="assets/file/images/slider-img2.png" alt="" />
          <div className="inst-info">
            <div className="info-grp">
              <img src="assets/file/images/insccon1.svg" alt="" />
              <img src="assets/file/images/insccon2.svg" alt="" />
              <img src="assets/file/images/insccon3.svg" alt="" />
            </div>
            <p>
              <b style={{ marginRight: "5px" }}>talfeinstein</b>במננעגד רקק כדש
              דגש כדגש כגדש כגדשכגשד
              <br /> דגש כדגש כגדש כגדשכגשד{" "}
            </p>
          </div>
        </div>
        <div className="each-post">
          <div className="post-head">
            <img src="assets/file/images/slider-user.png" alt="" />
            <div className="head-txt">
              <h6>talfeinstein</h6>
              <p>Raanana, Israel</p>
            </div>
          </div>
          <img src="assets/file/images/slider-img3.png" alt="" />
          <div className="inst-info">
            <div className="info-grp">
              <img src="assets/file/images/insccon1.svg" alt="" />
              <img src="assets/file/images/insccon2.svg" alt="" />
              <img src="assets/file/images/insccon3.svg" alt="" />
            </div>
            <p>
              <b style={{ marginRight: "5px" }}>talfeinstein</b>במננעגד רקק כדש
              דגש כדגש כגדש כגדשכגשד
              <br /> דגש כדגש כגדש כגדשכגשד{" "}
            </p>
          </div>
        </div>
        <div className="each-post">
          <div className="post-head">
            <img src="assets/file/images/slider-user.png" alt="" />
            <div className="head-txt">
              <h6>talfeinstein</h6>
              <p>Raanana, Israel</p>
            </div>
          </div>
          <img src="assets/file/images/slider-img1.png" alt="" />
          <div className="inst-info">
            <div className="info-grp">
              <img src="assets/file/images/insccon1.svg" alt="" />
              <img src="assets/file/images/insccon2.svg" alt="" />
              <img src="assets/file/images/insccon3.svg" alt="" />
            </div>
            <p>
              <b style={{ marginRight: "5px" }}>talfeinstein</b>במננעגד רקק כדש
              דגש כדגש כגדש כגדשכגשד
              <br /> דגש כדגש כגדש כגדשכגשד{" "}
            </p>
          </div>
        </div>
        <div className="each-post">
          <div className="post-head">
            <img src="assets/file/images/slider-user.png" alt="" />
            <div className="head-txt">
              <h6>talfeinstein</h6>
              <p>Raanana, Israel</p>
            </div>
          </div>
          <img src="assets/file/images/slider-img1.png" alt="" />
          <div className="inst-info">
            <div className="info-grp">
              <img src="assets/file/images/insccon1.svg" alt="" />
              <img src="assets/file/images/insccon2.svg" alt="" />
              <img src="assets/file/images/insccon3.svg" alt="" />
            </div>
            <p>
              <b style={{ marginRight: "5px" }}>talfeinstein</b>במננעגד רקק כדש
              דגש כדגש כגדש כגדשכגשד
              <br /> דגש כדגש כגדש כגדשכגשד{" "}
            </p>
          </div>
        </div>
        <div className="each-post">
          <div className="post-head">
            <img src="assets/file/images/slider-user.png" alt="" />
            <div className="head-txt">
              <h6>talfeinstein</h6>
              <p>Raanana, Israel</p>
            </div>
          </div>
          <img src="assets/file/images/slider-img2.png" alt="" />
          <div className="inst-info">
            <div className="info-grp">
              <img src="assets/file/images/insccon1.svg" alt="" />
              <img src="assets/file/images/insccon2.svg" alt="" />
              <img src="assets/file/images/insccon3.svg" alt="" />
            </div>
            <p>
              <b style={{ marginRight: "5px" }}>talfeinstein</b>במננעגד רקק כדש
              דגש כדגש כגדש כגדשכגשד
              <br /> דגש כדגש כגדש כגדשכגשד{" "}
            </p>
          </div>
        </div>
        <div className="each-post">
          <div className="post-head">
            <img src="assets/file/images/slider-user.png" alt="" />
            <div className="head-txt">
              <h6>talfeinstein</h6>
              <p>Raanana, Israel</p>
            </div>
          </div>
          <img src="assets/file/images/slider-img3.png" alt="" />
          <div className="inst-info">
            <div className="info-grp">
              <img src="assets/file/images/insccon1.svg" alt="" />
              <img src="assets/file/images/insccon2.svg" alt="" />
              <img src="assets/file/images/insccon3.svg" alt="" />
            </div>
            <p>
              <b style={{ marginRight: "5px" }}>talfeinstein</b>במננעגד רקק כדש
              דגש כדגש כגדש כגדשכגשד
              <br /> דגש כדגש כגדש כגדשכגשד{" "}
            </p>
          </div>
        </div>
      </div> */}

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-enter xp py-3">
            <p className="text-center sccess-page-last-footer-text">
              !ונתוא וגיית ?םלשומ ריק םתבציע
            </p>
          </div>
          {/* <div className="col-md-2 col-3 text-md-left text-center py-md-3">
            <img src="assets/file/images/res-so2.svg" className="xp bb" />
            <img src="assets/file/images/instagram.png" className="xy dd" />
            <span className="ft">
              stickable.il
            </span>
          </div> */}
          {/* <div className="col-md-2 col-3 text-md-left text-center py-md-3">
            <img src="assets/file/images/res-so1.svg" className="xp bb" />
            <img src="assets/file/images/fb.png" className="xy dd" />
            <span className="ft">
              Stickable
            </span>
          </div> */}
          <div className="col-md-2 col-3 text-md-left text-center py-md-3 sucesspage-social-links-main">
            <img
              src="assets/file/images/sucess-page-insta-icon.svg"
              className="xp bb"
              alt=""
            />
            <img
              src="assets/file/images/sucess-page-insta-icon.svg"
              className="xy dd"
              alt=""
            />
            <div className="sucesspage-social-links-heading">stickable.il</div>
          </div>
          <div className="col-md-2 col-3 text-md-left text-center py-md-3 sucesspage-social-links-main">
            <img
              src="assets/file/images/sucess-page-fb-icon.svg"
              className="xp bb"
              alt=""
            />
            <img
              src="assets/file/images/sucess-page-fb-icon.svg"
              className="xy dd"
              alt=""
            />
            <div className="sucesspage-social-links-heading">Stickable</div>
          </div>
        </div>
      </div>

      <div className="bottom_border text-center bgbg"></div>

      <section className="footer-btm xy">
        <p> &copy; Stickable 2021</p>
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

export default PaymentSuccess;
