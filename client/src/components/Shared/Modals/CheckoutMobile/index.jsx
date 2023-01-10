import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "./style.css";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import CardPayment from "./components/CardPayment";
import PaymentOptions from "./components/PaymentOptions";
import PayPal from "./components/PayPal";
import TestPay from "./components/TestPay";
import uniqid from "uniqid";
import AdressModal from "./components/AdressModal";
import { useSecondModal } from "@helpers/hooks/useSecondModal";

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
  const [numberOfImages, setNumberOfImages] = useState();
  const [percentages, setPercentages] = useState();
  const [isDisplay, setIsDisplay] = useState();

  const [checkoutNameColor, setcheckoutNameColor] = useState("");

  const [shippingAddressFormValues, setShippingAddressFormValues] =
    useState(getFormValues);
  const [totalPrice, settotalPrice] = useState(props.netPrice);

  const [fnameFormValidate, setfnameFormValidate] = useState(false);

  const [isCardDetails, setisCardDetails] = useState(false);
  const [cardNumber, setcardNumber] = useState("");
  const [cardDate, setcardDate] = useState("");
  const [cardCvv, setcardCvv] = useState("");
  const [cardHolderId, setcardHolderId] = useState("");

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

  function handleShippingAddressFormSubmit(event) {
    event.preventDefault();
    document.getElementById("fullname").style.display = "block";
    document.getElementById("address11").style.display = "block";
    document.getElementById("postalCode1").style.display = "block";
    document.getElementById("phone1").style.display = "block";
    document.getElementById("email1").style.display = "block";
    let errors = {};
    let formIsValid = true;

    if (!shippingAddressFormValues["fullName"]) {
      formIsValid = false;
      errors["fullName"] = "כאן כותבים שם פרטי ושם משפחה";
    }

    /* if (typeof shippingAddressFormValues["fullName"] !== "undefined") {
      if (!shippingAddressFormValues["fullName"].match(/^[a-zA-Z\s]+$/)) {
        formIsValid = false;
        errors["fullName"] = "Only letters are acceptable for your full name";
      }
    } */

    if (!shippingAddressFormValues["address1"]) {
      formIsValid = false;
      errors["address1"] = "נא לכתוב כתובת למשלוח";
    }

    // if (!shippingAddressFormValues["postalCode"]) {
    //   formIsValid = false;
    //   errors["postalCode"] = "Please provide your postal code";
    // }

    if (!shippingAddressFormValues["city"]) {
      formIsValid = false;
      errors["city"] = "בחרו עיר מהרשימה";
    }

    if (!shippingAddressFormValues["phone"]) {
      formIsValid = false;
      errors["phone"] = "מספר טלפון בבקשה :)";
    }

    //Email
    if (!shippingAddressFormValues["email"]) {
      formIsValid = false;
      errors["email"] = "נא להזין את כתובת המייל שלכם";
    }

    if (typeof shippingAddressFormValues["email"] !== "undefined") {
      let lastAtPos = shippingAddressFormValues["email"].lastIndexOf("@");
      let lastDotPos = shippingAddressFormValues["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          shippingAddressFormValues["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          shippingAddressFormValues["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "נא להזין את כתובת המייל שלכם";
      }
      // console.log('kokokoko')
      if (formIsValid) {
        document.body.classList.remove("overflowhdn");
        openCheckoutDrawerMobile();
        closeAddressPopupMobile();
      }
    }

    setShippingAddressFormValidateErr(errors);

    setShippingAddressFormValues((previousValues) => ({
      ...previousValues,
      ["fromValidate"]: formIsValid,
    }));

    if (formIsValid) {
      document.body.classList.remove("overflowhdn");
      closeAddressPopupMobile();
      openCheckoutDrawerMobile();
    }
  }

  const handlePaymentFormSubmit = async (event) => {
    event.preventDefault();
    const uniqueUserId = props.uniqueUserId;
    const frameQuantity = props.imagecount;

    const paymentData = {
      uniqueUserId: uniqueUserId,
      frameQuantity: frameQuantity,
      shippingAddressFormValues: shippingAddressFormValues,
    };

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios
      .post(BASE_URL + "/payment-processing", paymentData, config)
      .then((res) => {
        console.log(res.data.data.processId);
        localStorage.setItem("paymentProcessId", res.data.data.processId);
        localStorage.setItem("paymentProcessToken", res.data.data.processToken);
        //window.location.href = res.data.data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleChange(event) {
    console.log(event.target.name);
    if (event.target.name === "fullName") {
      if (!event.target.value) {
        document.getElementById("fullname").style.display = "block";
      } else {
        document.getElementById("fullname").style.display = "none";
      }
    }
    if (event.target.name === "address1") {
      if (!event.target.value) {
        document.getElementById("address11").style.display = "block";
      } else {
        document.getElementById("address11").style.display = "none";
      }
    }
    if (event.target.name === "postalCode") {
      if (!event.target.value) {
        document.getElementById("postalCode1").style.display = "block";
      } else {
        document.getElementById("postalCode1").style.display = "none";
      }
    }
    if (event.target.name === "phone") {
      if (!event.target.value) {
        document.getElementById("phone1").style.display = "block";
      } else {
        document.getElementById("phone1").style.display = "none";
      }
    }
    if (event.target.name === "email") {
      if (!event.target.value) {
        document.getElementById("email1").style.display = "block";
      } else {
        document.getElementById("email1").style.display = "none";
      }
    }

    setShippingAddressFormValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleChangeCity(event) {
    //alert(event.value)
    //alert(event.value)
    setShippingAddressFormValues((previousValues) => ({
      ...previousValues,
      ["city"]: event.value,
    }));
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
    if (shippingAddressFormValues.fromValidate) {
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
          39 * frameQuantity - ((39 * frameQuantity) / 100) * percentages;
      } else {
        totalPrice = 39 * frameQuantity;
      }
    } else {
      totalPrice = 39 * frameQuantity;
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

  const addCardDetails = () => {};

  const closePaymentPopup = () => {
    document.getElementById("paymentModal").style.display = "none";
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
    localStorage.setItem("totalamount", props.netPrice);
    document.getElementById("checkoutOverlayMobile").style.display = "none";
    document.getElementById("paymentWithCardFormMobile").style.display =
      "block";
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
    if (shippingAddressFormValues.fromValidate) {
      return {
        class: "new-link textBlack",
        text:
          shippingAddressFormValues.fullName +
          ", " +
          shippingAddressFormValues.city,
        img: <img src="assets/file/images/black_tick.png" />,
      };
    } else {
      return {
        class: "new-link",
        text: "כתובת למשלוח",
        img: (
          <img
            src="assets/file/images/add.png"
            style={{ marginLeft: "5px" }}
            width={15}
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
                    color: "#84998B",
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
                  >
                    {renderAddAddressButton().text}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {renderAddAddressButton().img}
                  </p>
                </span>
                {isCardDetails ? (
                  <>
                    <span>
                      <p
                        className="new-link add-padd text-black-color"
                        style={{ color: "black" }}
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
                      >
                        אמצעי תשלום &nbsp;&nbsp;&nbsp;&nbsp;
                        <img
                          src="assets/file/images/mycard.svg"
                          style={{ marginLeft: "-5px" }}
                        />
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
              <ul className="pro-list">
                <li>
                  <span>₪ {props.netPrice}</span>
                  <span> תמונות ({props.imagecount})</span>
                </li>
              </ul>
              <ul className="pro-foo">
                <li style={{ paddingBottom: "30px" }}>
                  <span>
                    ₪ -
                    {isDisplay
                      ? props.imagecount >= numberOfImages
                        ? ((props.netPrice / 100) * percentages).toFixed(2)
                        : 0
                      : 0}
                  </span>
                  <span>
                    {" "}
                    (
                    {isDisplay
                      ? props.imagecount >= numberOfImages
                        ? percentages
                        : 0
                      : 0}
                    %) הנחה
                  </span>
                </li>
                <li>
                  <span>
                    ₪{" "}
                    {isDisplay
                      ? props.imagecount >= numberOfImages
                        ? props.netPrice -
                          ((props.netPrice / 100) * percentages).toFixed(2)
                        : props.netPrice
                      : props.netPrice}
                  </span>
                  <span>סה"כ</span>
                </li>
              </ul>
            </div>

            <div className="modal-footer">
              {isCardDetails ? (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary cls pay-by-card-button "
                    onClick={cardPaymentProcess}
                  >
                    ביצוע ההזמנה שלך בשקלים
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary cls pay-by-card-button data-not-full-field"
                    onClick={openPaymentPopupMobile}
                  >
                    ביצוע ההזמנה שלך בשקלים
                  </button>
                </>
              )}
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
  );
};

export default CheckoutMobile;
