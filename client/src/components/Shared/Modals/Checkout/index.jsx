import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import cn from "classnames";
import axios from "axios";
import Select from "react-select";
import citydata from "../../../data/cityData.json";
import InputMask from "react-input-mask";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  netPriceState,
  imageCountState,
} from "@atoms/priceCalc";
import { selectedPaymentMethod, selectedShippingAddress } from "@atoms";
import { useSecondModal } from "@helpers/hooks/useSecondModal";
import "./style.css";
import { nextTuesday } from "@helpers/date";

const BASE_URL = process.env.REACT_APP_BASE_URL;


const Checkout = (props) => {
  const netPrice = useRecoilValue(netPriceState);
  const imagecount = useRecoilValue(imageCountState);
  const selectedPayment = useRecoilValue(selectedPaymentMethod);
  const selectedAddress = useRecoilValue(selectedShippingAddress);
  const { show, handleCloseModal } = props;
  const modal = useSecondModal();
  console.log(selectedPayment);

  const [numberOfImages, setNumberOfImages] = useState();
  const [percentages, setPercentages] = useState();
  const [isDisplay, setIsDisplay] = useState();
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

  const [paypalButton, setpaypalButton] = useState(false);

  const creatOrder = async (data) => {
      try {
          const config = {
              headers: {
                  'Content-Type': 'application/json'
              }
          }
          const res = await axios.post(`${BASE_URL}/user/createorder`, data, config);
          if (res.data.status === 200) {
              console.log('----success-----')
          }
          console.log('####################', res);
          return res.data;
      } catch (error) {
          console.log(error)
          return null;
      }
  }

  const getCardExpDate = (month, year) => {
    const shortYear = year % 100;
    let shortYearStr = shortYear < 10 ? '0' + shortYear.toString() : shortYear.toString();
    return `${month}${shortYearStr}`;
  }

  const handleTranzilarPayment = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const {paymentData} = await axios.post(BASE_URL+'/payment/do', {
        card: {
          no: selectedPayment.cardNumber.replace(/\s/g, ''),
          expdate: getCardExpDate(selectedPayment.expiriedMonth, selectedPayment.expiriedYear),
          cvv: selectedPayment.cvv,
        },
        amount: netPrice,
      });
      console.log(paymentData);
      const orderData = await creatOrder({...selectedAddress, uid: localStorage.getItem('uniqueUserId')});
      console.log('orderData', orderData);
      if (!orderData) {
        throw new Error('Creating order failed.');
      }
      console.log(orderData);
      setLoading(false);
      history.push(`/payment-success/${orderData.oid}`);
    } catch (err) {
      console.log(err);
      modal("open", 'errorCart');
      setLoading(false);
    }
  }

  const getCuponData = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const cuponData = await axios.get(
        `${BASE_URL}/admin/setting/getcupons`,
        config
      );
      if (cuponData.data.status === 200) {
        setNumberOfImages(cuponData.data.getCupon.numberOfImages);
        setPercentages(cuponData.data.getCupon.percentage);
        setIsDisplay(cuponData.data.getCupon.cuponsAvalible);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCuponData();
  }, []);

  const openAddCard = (name) => {
    modal("open", name);
  };

  const renderCounts = () => {
    return <><span>{imagecount} </span>בלנדס בגודל<span> 20x20</span></> 
  }

  return (
    <div>
      <div
        id="myCart"
        className="cart_sidebar"
        style={{ left: show ? "0px" : "-370px" }}
      >
        <button
          className="closebtn"
          onClick={() => handleCloseModal("checkout")}
        >
          <img src="/assets/file/images/close.png" alt="close" />
        </button>
        <div className="checkout-card-wrapper">
          <div className="card-and-address-buttons">
            <button
              className={cn("", { checked: selectedAddress })}
              style={{fontSize: "16px", fontWeight: selectedAddress ? 400 : 700,}}
              onClick={() => openAddCard("addAddress")}
            >
              {selectedAddress ? selectedAddress.city + " ," + selectedAddress.fullName: "פרטים אישיים" }
              {selectedAddress ? (
                <img src="/assets/file/images/Check.png" style={{marginBottom: "2px", marginRight: "8px"}}/> 
              ) : (
                <img src={"/assets/images/form_address.svg"} style={{width: "25px", height: "25px"}} />
              )}
            </button>
            <button
              className={cn("", { checked: selectedPayment })}
              style={{fontSize: "16px", fontWeight: selectedPayment ? 400 : 700}}
              onClick={() => openAddCard("selectCard")}
            >
              {selectedPayment ? selectedPayment.hebrewType + ' ' + selectedPayment.cardNumber.substring(15, 19) : 'תשלום באשראי'}
              {selectedPayment ? (
                <img src="/assets/file/images/Check.png" style={{marginBottom: "2px", marginRight: "8px"}}/> 
              ) : (
                <img src={"/assets/images/form_card.svg"} style={{width: "25px", height: "25px"}} />
              )}
            </button>
          </div>

          <div className="checkout-calculation">
            <div className="checkout-calculation__info" style={{marginBottom: "30px"}}>
              <p style={{fontWeight: 400, fontSize: "16px"}}>ההזמנה שלכם זכאית ל<span style={{fontWeight: 500}}>משלוח חינם,&nbsp;<br/></span>
                המשלוח צפוי
                להגיע אליכם עד 
                <span style={{fontWeight: 500, direction: "ltr !important"}}>{nextTuesday()}</span>
              </p>
              <img src="/assets/images/checkout_check.svg" alt="check" style={{width: "25px", height: "25px"}}/>
            </div>

            <div className="price__table">
              <div className="price__table--row"  style={{fontWeight: "400"}}>
                <div>{netPrice}</div>
                <div style={{direction: "rtl"}}>{renderCounts()}</div>
              </div>
              <div className="price__table--row"  style={{fontWeight: "400"}}>
                <div>35</div>
                <div>משלוח</div>
              </div>
              <div className="price__table--row"  style={{fontWeight: "400"}}>
                <div>-35</div>
                <div>הטבת כמות</div>
              </div>
              <div className="price__table--row total">
                <div style={{fontSize: "16px", fontWeight: "700 !important"}}>
                  ₪
                  {isDisplay
                    ? imagecount >= numberOfImages
                      ? netPrice - ((netPrice / 100) * percentages).toFixed(2)
                      : netPrice
                    : netPrice}
                </div>
                <div style={{fontSize: "16px", fontWeight: "700 !important"}}>סה”כ</div>
              </div>
            </div>
          </div>

          <div className="checkout-button-wrapper">
            <button
              className="checkout-button"
              disabled={!selectedAddress || !selectedPayment}
              onClick={handleTranzilarPayment}
              style={{width: "199.91px", fontSize: "14px", fontWeight: "700"}}
            >
              המשך לאישור הזמנה
            </button>
            {(!selectedAddress || !selectedPayment) && (
              <p className="checkout-button-description" style={{fontWeight: "400", fontSize: "14px"}}>
                הזינו את פרטי המשלוח והתשלום כדי להמשיך
              </p>
            )}
          </div>
        </div>
      </div>
      {isLoading &&
        <div
          className="modal loaderbg"
          id="mainImageLoaderModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: isLoading }}
        >
          <div className="modal-dialog review-image-loader" role="document">
            <div className="loadingio-spinner-heart-btbrqan8295">
              <div className="ldio-kv0ui0pfesk">
                <div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Checkout;
