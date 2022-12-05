import React from 'react';
import InputMask from "react-input-mask";


const CardPayment = (props) => {

    const { saveCardDetails, myclosePaymentWithCardFormMobile, handelSaveCardInputs,} = props;
    const digit = /[0-9]/;

const mdigit = /[0-1]/;
    return (
        <div
        className="modal my-modal2"
        id="paymentWithCardFormMobile"
        style={{ display: "none" }}
      >
        <div className="modal-dialog fullwidthtwo modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="van-wrap">
                <span>
                  <a
                    href="#"
                    // onClick={cardPaymentProcess}
                    onClick={saveCardDetails}
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
                  onClick={myclosePaymentWithCardFormMobile}
                >
                  &times;
                </button>
              </div>
            </div>

            <div className="modal-body">
              <form className="add_address">
                <div className="form-group">
                  <label>מספר כרטיס</label>
                  {/* <input
                    type="text"
                    name="name"
                    maxLength={19}
                    className="form-control custompad cc-number-input "
                    placeholder="0000 0000 0000 0000"
                  /> */}
                  {/* <input type="tel"  name="number" maxLength={19}  placeholder="0000 0000 0000 0000" className="input form-control custompad" /> */}

                  <InputMask
                    className="form-control custompad"
                    mask={[
                      digit,
                      digit,
                      digit,
                      digit,
                      "-",
                      digit,
                      digit,
                      digit,
                      digit,
                      "-",
                      digit,
                      digit,
                      digit,
                      digit,
                      "-",
                      digit,
                      digit,
                      digit,
                      digit,
                    ]}
                    maskPlaceholder=""
                    name="cardnumber"
                    type="tel"
                    pattern="/d*"
                    placeholder="0000 0000 0000 0000"
                    autoComplete="off"
                    onChange={(e) => handelSaveCardInputs(e)}
                    value={props.value}
                    required
                  />
                  <span
                    id="customerCardNumber"
                    className="card-detail-validation-style"
                    style={{ color: "red", fontSize: 13 }}
                  >
                    Please enter card number
                  </span>
                </div>

                <div className="form-group">
                  <div className="mg-grp">
                    <label>CVV</label>
                    {/* <input
                     maxLength={3}
                      type="password"
                      name="cvv"
                      className="form-control"
                      placeholder="123"
                    /> */}
                    <InputMask
                      className="form-control"
                      type="tel"
                      name="cardcvv"
                      mask={[digit, digit, digit]}
                      autoComplete="off"
                      pattern="/d*"
                      maskPlaceholder=""
                      placeholder="123"
                      onChange={(e) => handelSaveCardInputs(e)}
                      value={props.value}
                      required
                    />
                  </div>
                  <div className="mg-grp">
                    <label className="card-date-label">תוקף</label>
                    {/* <input
                      type="text"
                      name="date"
                      className="form-control"
                      placeholder="MM/YY"
                    /> */}
                    <InputMask
                      className="form-control payment-card-padd"
                      mask={[mdigit, digit, "/", digit, digit, digit, digit]}
                      maskPlaceholder=""
                      name="carddate"
                      autoComplete="off"
                      type="tel"
                      pattern="/d*"
                      placeholder="MM/YY"
                      onChange={(e) => handelSaveCardInputs(e)}
                      value={props.value}
                      required
                    />
                  </div>
                  <span
                    id="customerCardCvvandDateValidity"
                    className="card-detail-validation-style"
                    style={{ color: "red", fontSize: 13 }}
                  >
                    Please enter card validity and CVV
                  </span>
                </div>
                <div className="form-group">
                  <label>ת.ז בעל הכרטיס</label>
                  <InputMask
                    className="form-control custompad"
                    mask={[
                      digit,
                      digit,
                      digit,
                      "-",
                      digit,
                      digit,
                      digit,
                      "-",
                      digit,
                      digit,
                      digit,
                    ]}
                    maskPlaceholder=""
                    name="cardid"
                    type="tel"
                    pattern="/d*"
                    placeholder="000 000 000"
                    autoComplete="off"
                    onChange={(e) => handelSaveCardInputs(e)}
                    value={props.value}
                    required
                  />
                  <span
                    id="customerCardId"
                    className="card-detail-validation-style"
                    style={{ color: "red", fontSize: 13 }}
                  >
                    ת.ז צריכה להיות בעלת 9 ספרות
                  </span>
                </div>
              </form>
              <div className="abwrap">
                <img src="assets/file/images/pay-mini.png" />
                <img src="assets/file/images/shild.png" />
              </div>
            </div>

            {/* <div className="modal-footer" style={{ border: "none" }}>

            </div> */}
          </div>
        </div>
      </div>
    );
};



export default CardPayment;
