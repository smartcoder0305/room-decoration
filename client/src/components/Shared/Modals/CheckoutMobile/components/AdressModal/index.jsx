import React from "react";
import Select from "react-select";
import citydata from "@data/cityData.json";

const AdressModal = (props) => {
  const {
    handleChange,
    handleChangeCity,
    handleShippingAddressFormSubmit,
    shippingAddressFormValidateErr,
    mycloseAddressPopupMobile,
    shippingAddressFormValues,
  } = props;
  return (
    <div
      className="modal my-modal2"
      id="addressModalMobile"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ display: "none", overflowY: "hidden" }}
    >
      <div
        className="modal-dialog fullwidthtwo modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="van-wrap">
              <span>
                <a
                  href="#"
                  // onClick={openCheckoutDrawerMobile}
                  onClick={handleShippingAddressFormSubmit}
                  style={{ color: "#fe007c" }}
                >
                  אישור
                </a>
              </span>
              <h5>פרטי הכתובת למשלוח</h5>
              <button
                type="button"
                className="close crop-close-btn-mob"
                data-dismiss="modal"
                onClick={mycloseAddressPopupMobile}
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
                <span id="fullname" style={{ color: "red", fontSize: 13 }}>
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
                <span id="address11" style={{ color: "red", fontSize: 13 }}>
                  {shippingAddressFormValidateErr["address1"]}
                </span>
              </div>
              {/* <div className="form-group">
                  <label>כתובת 2</label>
                  <input
                    type="text"
                    name="address2"
                    id="address2"
                    className="form-control"
                    onChange={handleChange}
                    value={shippingAddressFormValues.address2}
                    required
                  />
                </div> */}
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
              <div className="form-group text-right mob-city-select-style">
                <label className="mob-address-city-label">עיר</label>
                <Select
                  placeholder="אנא בחר את העיר שלך"
                  className="mob-address-city-option"
                  name="city"
                  id="city"
                  value={citydata.find(
                    (obj) => obj.value === shippingAddressFormValues.city
                  )}
                  options={citydata}
                  onChange={handleChangeCity}
                  isRtl={true}
                  required
                />
              </div>
              <span
                className="address-city-warning"
                id="city"
                style={{ color: "red", fontSize: 13 }}
              >
                {shippingAddressFormValidateErr["city"]}
              </span>
              <div className="form-group">
                <label>מיקוד</label>
                <input
                  type="tel"
                  name="postalCode"
                  id="postalCode"
                  maxlength="7"
                  className="form-control"
                  onChange={handleChange}
                  value={shippingAddressFormValues.postalCode}
                  required
                />
                <span id="postalCode1" style={{ color: "red", fontSize: 13 }}>
                  {shippingAddressFormValidateErr["postalCode"]}
                </span>
              </div>
              <div className="form-group">
                <label>מס‘ טלפון</label>
                <input
                  type="tel"
                  name="phone"
                  maxlength="10"
                  id="phone"
                  className="form-control"
                  onChange={handleChange}
                  value={shippingAddressFormValues.phone}
                  required
                />
                <span id="phone1" style={{ color: "red", fontSize: 13 }}>
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
                <span id="email1" style={{ color: "red", fontSize: 13 }}>
                  {shippingAddressFormValidateErr["email"]}
                </span>
              </div>
            </form>
          </div>
          {/* <div className="modal-footer">
              <button
                type="button"
                className="checkout-btn"
                onClick={handleShippingAddressFormSubmit}
              >
                אישור פרטים
              </button>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdressModal;
