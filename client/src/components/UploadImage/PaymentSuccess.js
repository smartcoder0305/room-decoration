import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderEle from "./HeaderEle";
import SliderNew from "../Partials/SliderNew";

import { useModal } from "@helpers/hooks/useModal";
import HeartLoader from "@shared/HeartLoader";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const convertToDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return mm + '/' + dd + '/' + yyyy;
}

const PaymentSuccess = () => {
  console.log("hi from sucess");
  const [orderDeteils, setOrderDeteils] = useState({});
  const [isLoading, setLoading] = useState(false);

  const modal = useModal();

  const { orderId } = useParams();

  const orderid = orderId;

  const getOrder = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/user/getorder/${orderId}`);
        if (res.data.status === 200) {
            console.log('----success-----')
        }
        return res.data;
    } catch (error) {
        console.log(error)
        // window.location.href = '/';
        return null;
    }
  }

  const loadData = async () => {
    const orderData = await getOrder();
    if (!orderData) {
      // window.location.href = '/'
    }
    setLoading(false);
    setOrderDeteils(orderData);
  };

  console.log(orderDeteils);
  useEffect(() => {
    setLoading(true);
    modal("close", "checkout");
    modal("close", "mobileCheckout");
    loadData();
  }, []);

  const againShoping = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      {/* <HeaderEle /> */}
      <div className="container" style={{marginTop: "60px"}}>
        <div className="row">
          <div className="col-md-12">
            <div className="success_img">
              <h2 className="success_text xy">התשלום הצליח</h2>
              <img
                src="/assets/file/images/success-mark.PNG"
                alt="payment-success-icon"
                style={{ width: "80px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container xy">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="success_des">
              <div className="date_time" style={{direction: "rtl"}}>
              {convertToDate()}&nbsp;
              :תאריך
              </div>

              <div className="success_card_txt">
                <p>
                סה”כ:
                ₪{(orderDeteils?.imageCount || 0) * 45}</p>
                <p>מס‘ הזמנה:&nbsp;
                  {orderid} </p>
              </div>
              <div className="success_other">
                <p>
                  בחרתם {orderDeteils?.imageCount} תמונות ואנחנו כבר מתחילים להכין את החבילה
                  למשלוח{" "}
                </p>
                <p style={{direction: "ltr"}}>{orderDeteils?.order?.shippingAddress?.email} :בעוד מספר דקות תקבלו גם אישור אל </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container xp res-suc">
        <div className="row text-center">
          <h2 className="w-100 text-center sucess-page-header">
            {" "}
            {orderDeteils?.imageCount} תמונות
          </h2>
          <p className="sucess-page-desc">
            .ההזמנה התקבלה בהצלחה בעוד מספר דקות תקבלו אישור למייל{" "}
            <span>
              {orderDeteils?.shippingAddress?.emailmail}
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
      <br/>
      <br/>
       
      <SliderNew />
      <div className="container xy">
        <div className="row justify-content-center">
          <div className="class_fy sucess-page-btn">
            <br />
            <button
              className="btn succ_btn"
              style={{fontSize: "15px"}}
              onClick={() => {
                againShoping();
              }}
            >
              ביצוע הזמנה נוספת
            </button>
            <p>עיצבתם קיר מושלם? תייגו אותנו!</p>
            <br />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-enter xp py-3">
            <p className="text-center sccess-page-last-footer-text">
              !ונתוא וגיית ?םלשומ ריק םתבציע
            </p>
          </div>
          <div className="col-md-2 col-3 text-md-left text-center py-md-3 sucesspage-social-links-main" style={{maxWidth: "150px"}}>
            <img
              src="/assets/file/images/sucess-page-insta-icon.svg"
              className="xp bb"
              alt=""
            />
            <img
              src="/assets/file/images/sucess-page-insta-icon.svg"
              className="xy dd"
              alt=""
            />
            <div className="sucesspage-social-links-heading">stickable.il</div>
          </div>
          <div className="col-md-2 col-3 text-md-left text-center py-md-3 sucesspage-social-links-main" style={{maxWidth: "150px"}}>
            <img
              src="/assets/file/images/sucess-page-fb-icon.svg"
              className="xp bb"
              alt=""
            />
            <img
              src="/assets/file/images/sucess-page-fb-icon.svg"
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
      <HeartLoader isLoading={isLoading}/>
    </>
  );
};

export default PaymentSuccess;
