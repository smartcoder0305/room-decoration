import React, { useEffect, useState, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import SliderHome from "../Partials/SliderHome";
import useWindowDimensions from "@helpers/hooks/windowDemensions";
import { useModal } from "@helpers/hooks/useModal";
import HeartLoader from "@shared/HeartLoader";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PaymentSuccess = () => {
  console.log("hi from sucess");
  const [orderDeteils, setOrderDeteils] = useState({});
  const [isLoading, setLoading] = useState(false);
  const modal = useModal();
  const { orderId } = useParams();
  const { height, width } = useWindowDimensions();

  const getOrder = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/user/getorder/${orderId}`);
        if (res.data.status === 200) {
            console.log('----success-----')
        }
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
  }

  const loadData = async () => {
    const orderData = await getOrder();
    if (!orderData) {
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

  const isMobile = useMemo(() => {
    return width < 768;
  })

  return (
    <>
      <div className="container" style={{marginTop: "60px"}}>
        <div className="row">
          <div className="col-md-12">
            <div className="success_img" style={{marginTop: "60px"}}>
              <img
                src="/assets/file/images/Successful icon.png"
                alt="payment-success-icon"
                style={{ width: isMobile ? "241.28px" : "332.99px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{textAlign: "center", fontSize: isMobile ? "20px" : "24px", fontWeight: "700",  marginTop: isMobile ? "0px": "-39px"}}>התשלום התקבל</div>
      <div style={{textAlign: "center", fontSize: "14.4px", fontWeight: "500", marginTop: isMobile ? "9px" : "40px"}}>ההזמנה התקבלה בהצלחה, תכף תקבלו אישור למייל</div>
      <div style={{textAlign: "center", fontSize: "14.4px", fontWeight: "400", marginTop: "9px", color: "#727272"}}>{orderId} :מס׳ הזמנה</div>
      <div style={{textAlign: "center", fontSize: "14hpx", fontWeight: "700",  marginTop: isMobile ? "23px" : "39px", marginBottom: isMobile ? "23px" : "41px"}}>
        <NavLink to="/upload-your-image" 
          style={{
            backgroundColor: "#CCCCCC", 
            borderRadius: "8px", 
            height: "45px", 
            width: "241.07px", 
            display: "inline-block", 
            lineHeight: "45px",
            color: "white"
          }}
          >התחל הזמנה חדשה</NavLink>
      </div>
      

      <div className="slider-section--wrapper" style={{paddingBottom: "8px"}}>
        <div style={{textAlign: "center", marginBottom: isMobile ? null : "30px"}}>
          <h1 style={{fontSize: isMobile ? "24px" : "36px", fontWeight: "700", color: "#304036"}}>קבלו רעיונות מלקוחות שלנו</h1>
        </div>
        <div className="container homepage-container">
          <div className="swiper_left"></div>
          <div className="swiper_right"></div>
          <div></div>
          <SliderHome />
        </div>
        <div style={{textAlign: "center", marginTop: "25px", marginBottom: "5px"}}>
        </div>
      </div>
      {

      }
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
