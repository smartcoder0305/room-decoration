import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import cn from "classnames";
import { nextTuesday } from "@helpers/date";
import { useSecondModal } from "@helpers/hooks/useSecondModal";
import { useRecoilValue } from "recoil";
import {
  netPriceState,
  imageCountState,
} from "@atoms/priceCalc";
import { selectedPaymentMethod, selectedShippingAddress } from "@atoms";
import "./style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function getFormValues() {
  const storedValues = localStorage.getItem("userShippingAddress");

  if (!storedValues)
    return {
      fullName: "",
      address1: "",
      address2: "",
      city: "",
      postalCode: "",
      phone: "",
      email: "",
      fromValidate: false,
    };
  return JSON.parse(storedValues);
}

const CheckoutMobile = (props) => {
  const { style } = props;
  const netPrice = useRecoilValue(netPriceState);
  const imagecount = useRecoilValue(imageCountState);
  const [numberOfImages, setNumberOfImages] = useState();
  const [percentages, setPercentages] = useState();
  const [isDisplay, setIsDisplay] = useState();

  const [shippingAddressFormValues, setShippingAddressFormValues] = useState(getFormValues);

  const [isLoading, setLoading] = useState(false);
  const selectedAddress = useRecoilValue(selectedShippingAddress);
  const selectedPayment = useRecoilValue(selectedPaymentMethod);
  console.log('selectedAddress', selectedAddress)
  console.log('selectedPayment', selectedPayment)

  const modal = useSecondModal();

  useEffect(() => {
    localStorage.setItem(
      "userShippingAddress",
      JSON.stringify(shippingAddressFormValues)
    );
  }, [shippingAddressFormValues]);

  const queryParams = new URLSearchParams(window.location.search);
  const myPaymentError = queryParams.get("data");
  const history = useHistory();
  if (myPaymentError) {
    history.push("/review-your-images");
  }

  const openAddressPopupMobile = () => {
    modal("open", 'addAddressMobile');
  };

  const mySaveCardPopUp = () => {
    modal("open", 'selectCardMobile');
  };


  const renderAddAddressButton = () => {
    if (selectedAddress) {
      return {
        class: cn("", { checked: selectedAddress }),
        text:
          selectedAddress.fullName +
          ", " +
          selectedAddress.city,
        img: <img src="/assets/file/images/Check.png" style={{marginBottom: "2px"}} alt=""/>,
      };
    } else {
      return {
        class: "new-link",
        text: "פרטים אישיים",
        img: (
          <img
            src="/assets/images/form_address.svg"
            style={{ marginLeft: "5px", width: "25px", height: "25px"}}
            alt="form_address"
          />
        ),
      };
    }
  };

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
          email: selectedAddress.email,
        },
        amount: imagecount >= numberOfImages ? netPrice : netPrice + 29.90,
      });
      console.log(paymentData);
      const orderData = await creatOrder({...selectedAddress, uid: localStorage.getItem('uniqueUserId')});
      if (!orderData) {
        throw new Error('Creating order failed.');
      }
      console.log(orderData);
      setLoading(false);
      localStorage.clear();
      history.push(`/payment-success/${orderData.oid}`);
    } catch (err) {
      setLoading(false);
      modal("open", 'errorCart');
    }
  }

  const renderCounts = () => {
    return <><span>{imagecount} </span>בלנדס בגודל<span> 20x20</span></> 
  }

  return (
    <div className="mobile-checkout-modal" style={{ ...style }}>
      <div
        id="mobile-checkout-wrapper"
        style={{ overflowY: "scroll" }}
      >
        <div className="">
          <div className="" id="myCartMobileContent">
            <div className="" style={{ paddingBottom: "0px" }}>
              <div className="van-wrap" style={{verticalAligh: "middle"}}>
                <span
                  style={{
                    marginRight: "5px",
                    color: "#000000",
                    fontWeight: "400",
                    fontFamily: "rubik",
                    fontSize: "14px",
                    lineHeight: "25px",
                  }}
                >
                  אני רוצה שתארזו לי את המשלוח כמתנה
                </span>&nbsp;
                <input type="checkbox" style={{width: "14px", height: "25px"}}/>
                <img src="/assets/file/images/gift.png" style={{width: "25px", height: "25px"}} alt=""/>
              </div>
            </div>

            <div className="modal-body">
              <div className="checkout-name-credit-main-div">
                <span>
                  {selectedAddress ? (
                    <p
                      className={renderAddAddressButton().class.toString()}
                      data-dismiss="modal"
                      data-toggle="modal"
                      data-target="#addwin"
                      onClick={openAddressPopupMobile}
                      style={{paddingTop: "26px", fontWeight: 400, fontSize: "14px", verticalAlign: "middle"}}
                    >&nbsp;&nbsp;
                      {renderAddAddressButton().img}
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      {renderAddAddressButton().text}
                    </p>
                  ) : (
                    <p
                      className={renderAddAddressButton().class.toString()}
                      data-dismiss="modal"
                      data-toggle="modal"
                      data-target="#addwin"
                      onClick={openAddressPopupMobile}
                      style={{paddingTop: "26px", fontWeight: 700, fontSize: "14px"}}
                    >
                      {renderAddAddressButton().img}
                      &nbsp;&nbsp;&nbsp;
                      {renderAddAddressButton().text}
                    </p>
                  )}
                </span>
                {selectedPayment ? (
                  <>
                    <span>
                      <p
                        className="new-link add-padd text-black-color"
                        style={{ color: "black", paddingTop: "26px", fontWeight: 400, fontSize: "14px"}}
                        data-dismiss="modal"
                        data-toggle="modal"
                        data-target="#addwin"
                        onClick={mySaveCardPopUp}
                      > &nbsp;&nbsp;
                        <img src="/assets/file/images/Check.png" style={{marginBottom: "2px"}} alt=""/>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {selectedPayment.hebrewType + ' ' +selectedPayment.cardNumber.substring(15, 19)}
                      </p>
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      <p
                        className="new-link add-padd"
                        data-dismiss="modal"
                        data-toggle="modal"
                        data-target="#addwin"
                        onClick={mySaveCardPopUp}
                        style={{marginBottom: "26px", fontWeight: 700, fontSize: "14px"}}
                      >
                        <img
                          src="/assets/file/images/mycard.svg"
                          style={{width: "25px", height: "16.42px"}}
                          alt=""
                        />
                        &nbsp;&nbsp;&nbsp;
                        תשלום באשראי
                      </p>
                    </span>
                  </>
                )}
              </div>
              <div className="checkout-calculation">
                <div className="checkout-calculation__info" style={{fontWeight: 400, marginBottom: "22px", justifyContent:"flex-end"}}>
                  <p>
                    ההזמנה שלכם זכאית ל
                    <span style={{fontWeight: 500}}>משלוח חינם,&nbsp;</span>
                    המשלוח צפוי
                    <br />להגיע אליכם עד
                    <span style={{fontWeight: 500}}>{nextTuesday()}</span>
                  </p>
                  <img src="/assets/images/checkout_check.svg" alt="check" />
                </div>

                <div className="price__table">
                  <div className="price__table--row" style={{fontSize: "14px", fontWeight: 400}}>
                    <div>₪ {netPrice}</div>
                    <div style={{direction: "rtl"}}>{renderCounts()}</div>
                  </div>
                  <div className="price__table--row" style={{fontSize: "14px",  fontWeight: 400}}>
                    {imagecount <= 2 && <div>₪&nbsp;29.90</div>}
                    {imagecount > 2 && <div>חינם</div>}
                    <div>משלוח</div>
                  </div>
                  <div className="price__table--row" style={{fontWeight: "700", fontSize: "14px"}}>
                    <div>
                      ₪&nbsp;
                      {imagecount >= numberOfImages
                      ? netPrice
                      : (netPrice + 29.90)
                     }
                    </div>
                    <div>סה”כ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-checkout-pay-btn-container" style={{fontSize: "14px"}}>
        {selectedAddress && selectedPayment ? (
          <>
            <button
              type="button"
              className="btn cls pay-by-card-button "
              onClick={handleTranzilarPayment}
            >
              המשך לאישור הזמנה
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn cls pay-by-card-button data-not-full-field"
              // onClick={openPaymentPopupMobile}
              style={{fontWeight: 400, color: "FF1F84"}}
            >
              הזינו את פרטי המשלוח והתשלום כדי להמשיך
            </button>
          </>
        )}
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

export default CheckoutMobile;
