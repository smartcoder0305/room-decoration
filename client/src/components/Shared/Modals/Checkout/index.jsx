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
  totalPriceState,
  discountPriceState,
  discountPercentageState,
} from "@atoms/priceCalc";
import { selectedPaymentMethod, selectedShippingAddress } from "@atoms";
import { useSecondModal } from "@helpers/hooks/useSecondModal";
import "./style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Checkout = (props) => {
  const netPrice = useRecoilValue(netPriceState);
  const imagecount = useRecoilValue(imageCountState);
  const selectedPayment = useRecoilValue(selectedPaymentMethod);
  const selectedAddress = useRecoilValue(selectedShippingAddress);
  const { show, handleCloseModal } = props;
  const modal = useSecondModal();

  const [numberOfImages, setNumberOfImages] = useState();
  const [percentages, setPercentages] = useState();
  const [isDisplay, setIsDisplay] = useState();

  const history = useHistory();

  const [paypalButton, setpaypalButton] = useState(false);

  const handlePaymentFormSubmit = async (event) => {
    event.preventDefault();
    const uniqueUserId = props.uniqueUserId;
    const frameQuantity = imagecount;
    const oid = `${Math.floor(Math.random() * 100000000 + 1)}`;
    const cardInfo = JSON.parse(localStorage.getItem("cardNumber"));
    let totalPrice;

    // console.log(totalPrice)
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
      shippingAddressFormValues: "ADD_SHIPPING_ADDRESS",
      oid,
      cardInfo,
      totalPrice: totalPrice,
    };

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
    if (paymentResponse.status) {
      let response = await axios.get(
        `${BASE_URL}/user/addnewordercount`,
        config
      );

      if (response.data.status === 200) {
        localStorage.setItem("userCount", "no");
        localStorage.clear();
        localStorage.setItem(
          "order-details",
          JSON.stringify(paymentResponse.data.odata)
        );
        history.push(paymentResponse.data.sucessUrl);
      }
    }
  };

  const addShippingAddress = async () => {
    const userId = localStorage.getItem("uniqueUserId");
    const userShippingData = JSON.parse(
      localStorage.getItem("userShippingAddress")
    );
    console.log(userShippingData);
    const response = await axios.post(BASE_URL + "/addshippingaddress", {
      userId,
      userShippingData,
    });
    console.log(response);
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
          <img src="assets/file/images/close.png" alt="close" />
        </button>
        <div className="checkout-card-wrapper">
          <div className="card-and-address-buttons">
            <button
              className={cn("", { checked: selectedAddress })}
              onClick={() => openAddCard("addAddress")}
            >
              חולשמל תבותכ{" "}
              <img
                src={
                  selectedAddress
                    ? "assets/images/method_check.svg"
                    : "assets/images/form_address.svg"
                }
                alt="address"
              />
            </button>
            <button
              className={cn("", { checked: selectedPayment })}
              onClick={() => openAddCard("selectCard")}
            >
              םולשת יעצמא{" "}
              <img
                src={
                  selectedPayment
                    ? "assets/images/method_check.svg"
                    : "assets/images/form_card.svg"
                }
                alt="card"
              />
            </button>
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
                <div>{imagecount}</div>
                <div>21x21, {imagecount} </div>
              </div>
              <div className="price__table--row">
                <div>{netPrice}</div>
                <div>משלוח</div>
              </div>
              <div className="price__table--row">
                <div>
                  -
                  {isDisplay
                    ? imagecount >= numberOfImages
                      ? ((netPrice / 100) * percentages).toFixed(2)
                      : 0
                    : 0}
                </div>
                <div>משלוח חינם</div>
              </div>
              <div className="price__table--row total">
                <div>
                  ₪
                  {isDisplay
                    ? imagecount >= numberOfImages
                      ? netPrice - ((netPrice / 100) * percentages).toFixed(2)
                      : netPrice
                    : netPrice}
                </div>
                <div>:כ”הס</div>
              </div>
            </div>
          </div>

          <div className="checkout-button-wrapper">
            <button
              className="checkout-button"
              disabled={!selectedAddress || !selectedPayment}
            >
              נזמין
            </button>
            {(!selectedAddress || !selectedPayment) && (
              <p className="checkout-button-description">
              תחילה נזין את פרטי המשלוח והתשלום
            </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
