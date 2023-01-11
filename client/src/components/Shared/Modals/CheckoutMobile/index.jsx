import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import cn from "classnames";

import "./style.css";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import CardPayment from "./components/CardPayment";
import PaymentOptions from "./components/PaymentOptions";
import PayPal from "./components/PayPal";
import TestPay from "./components/TestPay";
import uniqid from "uniqid";
import AdressModal from "./components/AdressModal";
import { useSecondModal } from "@helpers/hooks/useSecondModal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  netPriceState,
  imageCountState,
  totalPriceState,
  discountPriceState,
  discountPercentageState,
} from "@atoms/priceCalc";
import { selectedPaymentMethod, selectedShippingAddress } from "@atoms";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const digit = /[0-9]/;

const mdigit = /[0-1]/;
function subform(e) {
  console.log(e.target.value);
}
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
  /*   const [netPrice, setNetPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); */

  // const []=useState('')
  const { style } = props;
  const netPrice = useRecoilValue(netPriceState);
  const imagecount = useRecoilValue(imageCountState);
  const [numberOfImages, setNumberOfImages] = useState();
  const [percentages, setPercentages] = useState();
  const [isDisplay, setIsDisplay] = useState();

  const [checkoutNameColor, setcheckoutNameColor] = useState("");

  const [shippingAddressFormValues, setShippingAddressFormValues] = useState(getFormValues);
  const [totalPrice, settotalPrice] = useState(props.netPrice);

  const [fnameFormValidate, setfnameFormValidate] = useState(false);

  const [isCardDetails, setisCardDetails] = useState(false);
  const [cardNumber, setcardNumber] = useState("");
  const [cardDate, setcardDate] = useState("");
  const [cardCvv, setcardCvv] = useState("");
  const [cardHolderId, setcardHolderId] = useState("");
  const selectedAddress = useRecoilValue(selectedShippingAddress);
  console.log('selectedAddress', selectedAddress)
  const [shippingAddressFormValidateErr, setShippingAddressFormValidateErr] =
    useState(() => {
      return {
        fullName: "",
        address1: "",
        address2: "",
        city: "",
        postalCode: "",
        phone: "",
        email: "",
      };
    });

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
    // alert('הזן שם מלא ומספר טלפון')
    history.push("/review-your-images");
  }

  const openCheckoutDrawerMobile = () => {
    document.body.classList.add("overflowhdn");
    closeAddressPopupMobile();
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

  const closeAddressPopupMobile = () => {
   
  };

  const openPaymentPopupMobile = async () => {
    // if address form not filled and validated
    if (selectedAddress) {
      openAddressPopupMobile();
    }
  };

  const cardPaymentProcess = async () => {
    const uniqueUserId = props.uniqueUserId;
    const frameQuantity = props.imagecount;
    const oid = `${Math.floor(Math.random() * 100000000 + 1)}`;
    const cardInfo = JSON.parse(localStorage.getItem("cardNumber"));
    let totalPrice;
    if (isDisplay) {
      if (frameQuantity >= numberOfImages) {
        totalPrice =
          45 * frameQuantity - ((45 * frameQuantity) / 100) * percentages;
      } else {
        totalPrice = 45 * frameQuantity;
      }
    } else {
      totalPrice = 45 * frameQuantity;
    }

    const paymentData = {
      uniqueUserId: uniqueUserId,
      frameQuantity: frameQuantity,
      shippingAddressFormValues: shippingAddressFormValues,
      oid,
      cardInfo,
      totalPrice: totalPrice,
    };
    console.log("paymentData");
    console.log(paymentData);
    console.log("paymentData");

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios.post(BASE_URL + "/user/addordercount");
    const paymentResponse = await await axios.post(
      BASE_URL + "/payment-processing",
      paymentData,
      config
    );
    console.log();
    if (paymentResponse.status) {
      let response = await axios.get(
        `${BASE_URL}/user/addnewordercount`,
        config
      );
      if (response.data.status === 200) {
        localStorage.clear();
        localStorage.setItem(
          "order-details",
          JSON.stringify(paymentResponse.data.odata)
        );
        history.push(paymentResponse.data.sucessUrl);
      }
    }

    // .then((res) => {
    //   console.log('payment ho gaya')
    //   // console.log(res.data.data.url);
    //   localStorage.setItem("paymentProcessId", res.data.data.processId);
    //   localStorage.setItem("paymentProcessToken", res.data.data.processToken);
    //   window.location.href = res.data.data.url;
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
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
        img: <img src="assets/images/method_check.svg" />,
      };
    } else {
      return {
        class: "new-link",
        text: "כתובת למשלוח",
        img: (
          <img
            src="assets/images/form_address.svg"
            style={{ marginLeft: "5px" }}
            width={25}
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

  return (
    <div className="mobile-checkout-modal" style={{ ...style }}>
      <div
        id="mobile-checkout-wrapper"
        style={{ overflowY: "scroll" }}
      >
        <div className="">
          <div className="" id="myCartMobileContent">
            <div className="" style={{ paddingBottom: "0px" }}>
              <div className="van-wrap">
                <span
                  style={{
                    marginRight: "5px",
                    fontSize: "16px",
                    color: "#000000",
                    fontWeight: "500",
                    fontFamily: "rubik",
                  }}
                >
                  בהזמנה זו תקבלו משלוח חינם
                </span>
                <img src="assets/file/images/V Cart icon.svg" />
              </div>
            </div>

            <div className="modal-body">
              <div className="checkout-name-credit-main-div">
                <span>
                  {" "}
                  <p
                    className={renderAddAddressButton().class.toString()}
                    data-dismiss="modal"
                    data-toggle="modal"
                    data-target="#addwin"
                    onClick={openAddressPopupMobile}
                    style={{paddingTop: "26px"}}
                  >
                    {renderAddAddressButton().img}
                    &nbsp;&nbsp;&nbsp;
                    {renderAddAddressButton().text}
                  </p>
                </span>
                {isCardDetails ? (
                  <>
                    <span>
                      <p
                        className="new-link add-padd text-black-color"
                        style={{ color: "black", paddingTop: "26px" }}
                        data-dismiss="modal"
                        data-toggle="modal"
                        data-target="#addwin"
                        onClick={mySaveCardPopUp}
                      >
                        {cardNumber.substring(0, 4)}************
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="assets/file/images/black_tick.png" />
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
                        style={{marginBottom: "26px"}}
                      >
                        <img
                          src="assets/file/images/mycard.svg"
                        />
                        &nbsp;&nbsp;&nbsp;
                        אמצעי תשלום
                      </p>
                    </span>
                  </>
                )}
                {/* <p
                  className='new-link add-padd'
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#addwin"
                >
                 
                  הננער ,ימלשורי לארשי
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <img src="assets/file/images/mycard.svg" />
                </p> */}
              </div>
              <div className="checkout-calculation">
                <div className="checkout-calculation__info">
                  <p>
                    ההזמנה שלכם זכאית למשלוח חינם, המשלוח צפוי להגיע עד יום שלישי
                    ה29 ביולי
                  </p>
                  <img src="assets/images/checkout_check.svg" alt="check" />
                </div>

                <div className="price__table">
                  <div className="price__table--row">
                    <div>₪ {netPrice}</div>
                    <div>21*21, {imagecount}</div>
                  </div>
                  <div className="price__table--row">
                    <div>₪ חינם</div>
                    <div>משלוח</div>
                  </div>
                  <div className="price__table--row" style={{fontWeight: "bold"}}>
                    <div>
                      ₪&nbsp;
                      {isDisplay
                        ? imagecount >= numberOfImages
                          ? netPrice - ((netPrice / 100) * percentages).toFixed(2)
                          : netPrice
                        : netPrice}
                    </div>
                    <div>כ”הס</div>
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
      <div className="mobile-checkout-pay-btn-container">
        {isCardDetails ? (
          <>
            <button
              type="button"
              className="btn cls pay-by-card-button "
              onClick={cardPaymentProcess}
            >
              ביצוע ההזמנה שלך בשקלים
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn cls pay-by-card-button data-not-full-field"
              onClick={openPaymentPopupMobile}
            >
              ביצוע ההזמנה שלך בשקלים
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutMobile;
