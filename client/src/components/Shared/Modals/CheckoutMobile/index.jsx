import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import cn from "classnames";
import { nextTuesday } from "@helpers/date";
import CardPayment from "./components/CardPayment";
import PaymentOptions from "./components/PaymentOptions";
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
  const [totalPrice, settotalPrice] = useState(props.netPrice);

  const [isCardDetails, setisCardDetails] = useState(false);
  const [cardNumber, setcardNumber] = useState("");
  const [cardDate, setcardDate] = useState("");
  const [cardCvv, setcardCvv] = useState("");
  const [cardHolderId, setcardHolderId] = useState("");
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

  const openCheckoutDrawerMobile = () => {
    document.body.classList.add("overflowhdn");
    closePaymentWithCardFormMobile();
    document.getElementById("checkoutOverlayMobile").style.display = "block";
  };

  const overlayClick = () => {
    document.getElementById("myCartMobile").style.display = "none";
    document.getElementById("checkoutOverlayMobile").style.display = "none";
  };


  const openAddressPopupMobile = () => {
    modal("open", 'addAddressMobile');
  };

  const selectPaymentOption = (option) => {
    console.log("props");
    console.log(props.netPrice);
    settotalPrice(props.netPrice);
    localStorage.setItem("totalamount", props.netPrice);
    console.log("props");
    if (option === "Card") {
      document.body.classList.remove("overflowhdn");
      document.getElementById("paymentWithCardFormMobile").style.display =
        "block";
      document.getElementById("paymentOptionChoose").style.display = "none";
    } else {
      document.getElementById("paypalmodel").style.display = "block";
      document.getElementById("paymentOptionChoose").style.display = "none";
    }
  };

  const mySaveCardPopUp = () => {
    modal("open", 'selectCardMobile');
  };

  const closePaymentWithCardFormMobile = () => {
    overlayClick();
    document.getElementById("paymentWithCardFormMobile").style.display = "none";
  };

  const paypalCloseButton = () => {
    document.getElementById("paypalmodel").style.display = "none";
    document.getElementById("checkoutOverlayMobile").style.display = "none";
    window.location.href = "/review-your-images";
  };

  const renderAddAddressButton = () => {
    if (selectedAddress) {
      return {
        class: cn("", { checked: selectedAddress }),
        text:
          selectedAddress.fullName +
          ", " +
          selectedAddress.city,
        img: <img src="/assets/file/images/Check.png" style={{marginBottom: "2px"}}/>,
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

  const saveCardDetails = () => {
    // console.log({ cardNumber, cardDate, cardCvv, cardHolderId })
    // console.log('cardNumberlength')
    // console.log(cardHolderId)
    // console.log(cardHolderId.length)
    // console.log('cardNumberlength')
    if (!cardNumber) {
      document.getElementById("customerCardNumber").style.display = "block";
    } else if (cardNumber.length != 19) {
      document.getElementById("customerCardNumber").style.display = "block";
    } else if (!cardDate) {
      document.getElementById("customerCardCvvandDateValidity").style.display =
        "block";
    } else if (!cardCvv) {
      document.getElementById("customerCardCvvandDateValidity").style.display =
        "block";
    } else if (!cardHolderId) {
      document.getElementById("customerCardId").style.display = "block";
    } else if (cardHolderId.length != 11) {
      document.getElementById("customerCardId").style.display = "block";
    } else {
      let customerCard = { cardNumber, cardDate, cardCvv, cardHolderId };
      localStorage.setItem("cardNumber", JSON.stringify(customerCard));
      closePaymentWithCardFormMobile();
      openCheckoutDrawerMobile();
      setisCardDetails(true);
    }
  };

  const handelSaveCardInputs = (e) => {
    if (e.target.name === "cardnumber") {
      document.getElementById("customerCardNumber").style.display = "none";
      setcardNumber(e.target.value);
    }
    if (e.target.name === "cardcvv") {
      document.getElementById("customerCardCvvandDateValidity").style.display =
        "none";
      setcardCvv(e.target.value);
    }
    if (e.target.name === "carddate") {
      document.getElementById("customerCardCvvandDateValidity").style.display =
        "none";
      setcardDate(e.target.value);
    }
    if (e.target.name === "cardid") {
      document.getElementById("customerCardId").style.display = "none";
      setcardHolderId(e.target.value);
    }
  };
  const mycloseAddressPopupMobile = () => {
    openCheckoutDrawerMobile();
  };

  const myclosePaymentWithCardFormMobile = () => {
    // closePaymentWithCardFormMobile()
    openCheckoutDrawerMobile();
  };

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
      console.log("-------------------lol----------------");
      console.log(cuponData.data.getCupon.numberOfImages);
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
        amount: netPrice,
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
                <img src="/assets/file/images/gift.png" style={{width: "25px", height: "25px"}}/>
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
                        <img src="/assets/file/images/Check.png" style={{marginBottom: "2px"}}/>
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
                    <div>חינם</div>
                    <div>משלוח</div>
                  </div>
                  <div className="price__table--row" style={{fontWeight: "700", fontSize: "14px"}}>
                    <div>
                      ₪&nbsp;
                      {isDisplay
                        ? imagecount >= numberOfImages
                          ? netPrice - ((netPrice / 100) * percentages).toFixed(2)
                          : netPrice
                        : netPrice}
                    </div>
                    <div>סה”כ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Start payment option choose */}
      <PaymentOptions selectPaymentOption={selectPaymentOption} />
      {/* End payment option choose */}

      {/* Start payment with card */}
      <CardPayment
        saveCardDetails={saveCardDetails}
        myclosePaymentWithCardFormMobile={myclosePaymentWithCardFormMobile}
        handelSaveCardInputs={handelSaveCardInputs}
      />
      {/* End payment with card */}

        <div
          className="modal my-modal1"
          id="paypalmodel"
          // style={{ display: "none" }}
          // id='mob-paypal'
        >
          <div className="modal-dialog modal_fixed fullwidthsmall modal-dialog-centered">
            <div
              className="modal-content paypal-model-style-mob"
              id="paymentOptionChooseContent"
            >
              <div className="modal-body p-0">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    paypalCloseButton();
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                {/* <PayPal totalPrice={props.netPrice} frames={props.imagecount} /> */}
                {/* <TestPay totalPrice={props.netPrice} frames={props.imagecount} /> */}
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
