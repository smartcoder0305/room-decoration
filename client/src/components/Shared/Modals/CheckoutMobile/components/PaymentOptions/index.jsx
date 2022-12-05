import React from 'react';
import PropTypes from 'prop-types';


const PaymentOptions = (props) => {

  const { selectPaymentOption } = props;
    return (
        <div
        className="modal my-modal1"
        id="paymentOptionChoose"
        style={{ display: "none" }}
      >
        <div className="modal-dialog modal_fixed fullwidthsmall modal-dialog-centered">
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
                {/* <li
                  data-toggle="modal" data-target="#exampleModalCenter"
                  onClick={() => {
                    selectPaymentOption("PayPal");
                  }}
                >
                  PayPal תשלום באמצעות{" "}
                  <img src="assets/file/images/paypal.png" className="file" />
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
};



export default PaymentOptions;
