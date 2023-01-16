import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import citydata from "../data/cityData.json";

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
  /*   const [netPrice, setNetPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); */

  const isRtl = true;

  const [shippingAddressFormValues, setShippingAddressFormValues] =
    useState(getFormValues);

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

  useEffect(() => {
    localStorage.setItem(
      "userShippingAddress",
      JSON.stringify(shippingAddressFormValues)
    );
  }, [shippingAddressFormValues]);

  function handleShippingAddressFormSubmit(event) {
    event.preventDefault();

    let errors = {};
    let formIsValid = true;

    if (!shippingAddressFormValues["fullName"]) {
      formIsValid = false;
      errors["fullName"] = "Please add your full name.";
    }

    /* if (typeof shippingAddressFormValues["fullName"] !== "undefined") {
      if (!shippingAddressFormValues["fullName"].match(/^[a-zA-Z\s]+$/)) {
        formIsValid = false;
        errors["fullName"] = "Only letters are acceptable for your full name";
      }
    } */

    if (!shippingAddressFormValues["address1"]) {
      formIsValid = false;
      errors["address1"] = "Please provide your address";
    }

    if (!shippingAddressFormValues["postalCode"]) {
      formIsValid = false;
      errors["postalCode"] = "Please provide your postal code";
    }

    if (!shippingAddressFormValues["phone"]) {
      formIsValid = false;
      errors["phone"] = "You should provide your phone number";
    }

    //Email
    if (!shippingAddressFormValues["email"]) {
      formIsValid = false;
      errors["email"] = "Your email is required";
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
        errors["email"] = "Email is not valid";
      }
    }

    setShippingAddressFormValidateErr(errors);

    setShippingAddressFormValues((previousValues) => ({
      ...previousValues,
      ["fromValidate"]: formIsValid,
    }));

    if (formIsValid) {
      closeAddressPopupMobile();
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
    closeAddressPopupMobile();
    closePaymentWithCardFormMobile();
    document.getElementById("myCartMobile").style.display = "block";
    document.getElementById("checkoutOverlayMobile").style.display = "block";
  };

  const overlayClick = () => {
    document.getElementById("myCartMobile").style.display = "none";
    document.getElementById("checkoutOverlayMobile").style.display = "none";
  };

  const elementMyCartMobile = document.getElementById("myCartMobile");
  if(elementMyCartMobile){
    elementMyCartMobile.addEventListener('click', function(e){
    
      if (!document.getElementById('myCartMobileContent').contains(e.target)){
        overlayClick();
      }
    })
  }

  const elementPaymentOptionChoose = document.getElementById("paymentOptionChoose");
  if(elementPaymentOptionChoose){
    elementPaymentOptionChoose.addEventListener('click', function(e){
    
      if (!document.getElementById('paymentOptionChooseContent').contains(e.target)){
        overlayClick();
        document.getElementById("paymentOptionChoose").style.display = "none";
      }   
    })
  }
  

  const closeCheckoutDrawer = () => {
    document.getElementById("myCart").style.width = "0px";
    document.getElementById("checkoutOverlay").style.display = "none";
  };

  const openAddressPopupMobile = () => {
    document.getElementById("myCartMobile").style.display = "none";
    document.getElementById("checkoutOverlayMobile").style.display = "block";
    document.getElementById("addressModalMobile").style.display = "block";
  };

  const closeAddressPopupMobile = () => {
    overlayClick();
    document.getElementById("addressModalMobile").style.display = "none";
  };

  const openPaymentPopupMobile = async () => {
    // if address form not filled and validated
    if (!shippingAddressFormValues.fromValidate) {
      openAddressPopupMobile();
    } else {
      document.getElementById("myCartMobile").style.display = "none";
      document.getElementById("checkoutOverlayMobile").style.display = "block";
      document.getElementById("paymentOptionChoose").style.display = "block";
      
      //document.getElementById("paymentModal").style.display = "block";
      
    }
  };

  const cardPaymentProcess = async () => {
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
        console.log(res.data.data.url);
        localStorage.setItem("paymentProcessId", res.data.data.processId);
        localStorage.setItem("paymentProcessToken", res.data.data.processToken);
        window.location.href = res.data.data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const closePaymentPopup = () => {
    document.getElementById("paymentModal").style.display = "none";
  };

  const selectPaymentOption = (option) => {
    if(option === 'Card'){
      document.getElementById("paymentWithCardFormMobile").style.display = "block";
      document.getElementById("paymentOptionChoose").style.display = "none";
    } else{

    }
  };

  const closePaymentWithCardFormMobile = () => {
    overlayClick();
    document.getElementById("paymentWithCardFormMobile").style.display = "none";
  };



  const renderAddAddressButton = () => {
    if (shippingAddressFormValues.fromValidate) {
      return {
        class: "new-link",
        text:
          shippingAddressFormValues.fullName +
          ", " +
          shippingAddressFormValues.city,
        img: <img src="/assets/file/images/black_tick.png" />,
      };
    } else {
      return {
        class: "new-link",
        text: "חולשמל תבותכ תפסוה",
        img: <img src="/assets/file/images/add.png" width={15}/>,
      };
    }
  };

  return (
    <>
      <div className="sk-foo">
        <p>םניח חולשמל תיאכז רבכ ךלש הנמזהה</p>
        <div className="sk-btn">
          <a
            href="#"
            className="site-btn"
            data-toggle="modal"
            data-target="#rescart"
            onClick={openCheckoutDrawerMobile}
          >
            רכישה
          </a>
        </div>
      </div>

      <div
        id="checkoutOverlayMobile"
        className="overlay_cart"
        style={{ display: "none" }}
        onClick={overlayClick}
      ></div>
      <div className="modal my-modal1" id="myCartMobile" style={{ overflowY: 'scroll' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" id="myCartMobileContent">
            <div className="modal-header">
              <div className="van-wrap">
                <span>בהזמנה זו תקבלו משלוח חינם</span>
                <img src="/assets/file/images/res-van.png" />
              </div>
            </div>

            <div className="modal-body">
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
              <ul className="pro-list">
                <li>
                  <span>₪ {props.netPrice}</span>
                  <span> {props.imagecount} תונומת </span>
                </li>
              </ul>
              <ul className="pro-foo">
                <li>
                  <span>₪ {props.discountPrice}</span>
                  <span>חולשמ</span>
                </li>
                <li>
                  <span>₪ {props.totalPrice}</span>
                  <span>כ”הס</span>
                </li>
              </ul>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary cls"
                onClick={openPaymentPopupMobile}
              >
                תשלום
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Start address modal */}
      <div
        className="modal my-modal2"
        id="addressModalMobile"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: "none", overflowY: 'scroll' }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="van-wrap">
                <span>
                  <a
                    href="#"
                    onClick={openCheckoutDrawerMobile}
                    style={{ color: "#fe007c" }}
                  >
                    אישור
                  </a>
                </span>
                <h5>פרטי הכתובת למשלוח</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={closeAddressPopupMobile}
                >
                  &times;
                </button>
              </div>
            </div>

            <div className="modal-body">
              <form
                className="add_address"
                onSubmit={handleShippingAddressFormSubmit}
              >
                <div className="form-group">
                  <label>שם מלא</label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="form-control"
                    placeholder="שם פרטי ושם משפחה"
                    onChange={handleChange}
                    value={shippingAddressFormValues.fullName}
                    required
                  />
                  <span style={{ color: "red", fontSize: 13 }}>
                    {shippingAddressFormValidateErr["fullName"]}
                  </span>
                </div>
                <div className="form-group">
                  <label>כתובת</label>
                  <input
                    type="text"
                    name="address1"
                    id="address1"
                    className="form-control"
                    placeholder="רחוב ומספר בית"
                    onChange={handleChange}
                    value={shippingAddressFormValues.address1}
                    required
                  />
                  <span style={{ color: "red", fontSize: 13 }}>
                    {shippingAddressFormValidateErr["address1"]}
                  </span>
                </div>
                <div className="form-group">
                  <label>כתובת 2</label>
                  <input
                    type="text"
                    name="address2"
                    id="address2"
                    className="form-control"
                    onChange={handleChange}
                    value={shippingAddressFormValues.address2}
                    
                  />
                </div>
                {/*<div className="form-group">
                  <label>עיר</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="form-control"
                    onChange={handleChange}
                    value={shippingAddressFormValues.city}
                  />
                </div>*/}
                {/*<div className="form-group">
                  <label>עיר</label>
                  <select
                    name="city"
                    id="city"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value={""}>Please select your city</option>
                    {citydata.map((city, index) => {
                      return (
                        <>
                          <option key={city.value} value={city.label}>{city.label}</option>
                        </>
                      );
                    })}
                  </select>
                </div>*/}
                <div className="form-group">
                  <label>עיר</label>
                  <Select
                    placeholder="Please select your city"
                    name="city"
                    id="city"
                    value={citydata.find(
                      (obj) => obj.value === shippingAddressFormValues.city
                    )}
                    options={citydata}
                    onChange={handleChangeCity}
                    isRtl={isRtl}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>מיקוד</label>
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    className="form-control"
                    onChange={handleChange}
                    value={shippingAddressFormValues.postalCode}
                    required
                  />
                  <span style={{ color: "red", fontSize: 13 }}>
                    {shippingAddressFormValidateErr["postalCode"]}
                  </span>
                </div>
                <div className="form-group">
                  <label>מס‘ טלפון</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="form-control"
                    onChange={handleChange}
                    value={shippingAddressFormValues.phone}
                    required
                  />
                  <span style={{ color: "red", fontSize: 13 }}>
                    {shippingAddressFormValidateErr["phone"]}
                  </span>
                </div>
                <div className="form-group">
                  <label>אימייל</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    onChange={handleChange}
                    value={shippingAddressFormValues.email}
                    required
                  />
                  <span style={{ color: "red", fontSize: 13 }}>
                    {shippingAddressFormValidateErr["email"]}
                  </span>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="checkout-btn"
                onClick={handleShippingAddressFormSubmit}
              >
                אישור פרטים
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End address modal */}

      {/* Start payment option choose */}
      <div
        className="modal my-modal1"
        id="paymentOptionChoose"
        style={{ display: "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" id="paymentOptionChooseContent">
            <div className="modal-body p-0">
              <ul className="pay">
                <li
                  id="paid"
                  data-dismiss="modal"
                  data-toggle="modal"
                  onClick={() => {
                    selectPaymentOption("Card");
                  }}
                >
                  תשלום בכרטיס אשראי
                </li>
                <li
                  data-dismiss="modal"
                  data-toggle="modal"
                  onClick={() => {
                    selectPaymentOption("PayPal");
                  }}
                >
                  PayPal תשלום באמצעות{" "}
                  <img src="/assets/file/images/paypal.png" className="file" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End payment option choose */}

      {/* Start payment with card */}
      <div
        className="modal my-modal2"
        id="paymentWithCardFormMobile"
        style={{ display: "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="van-wrap">
                <span>
                  <a href="#" onClick={cardPaymentProcess} style={{ color: "#fe007c" }}>
                    אישור
                  </a>
                </span>
                <h5>פרטי הכתובת למשלוח</h5>
                <button type="button" className="close" data-dismiss="modal" onClick={closePaymentWithCardFormMobile}>
                  &times;
                </button>
              </div>
            </div>

            <div className="modal-body">
              <form className="add_address">
                <div className="form-group">
                  <label>מספר כרטיס</label>
                  <input
                    type="tel" 
                    maxlength="19" 
                    name="name"
                    pattern="\d*"
                    className="form-control cc-number"
                    placeholder="0000 0000 0000 0000"
                    required
                  />
                </div>
                <div className="form-group">
                  <div className="mg-grp">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="123"
                      required
                    />
                  </div>
                  <div className="mg-grp">
                    <label>תוקף</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer" style={{ border: "none" }}>
              <div className="abwrap">
                <img src="/assets/file/images/pay-mini.png" />
                <img src="/assets/file/images/shild.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End payment with card */}
    </>
  );
};

export default CheckoutMobile;
