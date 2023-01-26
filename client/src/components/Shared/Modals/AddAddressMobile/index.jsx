import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import StyledSelect from "@shared/components/Select";
import Input from "@shared/components/Input";
import Textarea from "@shared/components/Textarea";
import cityData from "@data/cityData";
import { object, string, number } from "yup";
import { useSecondModal } from "@helpers/hooks/useSecondModal";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { selectedShippingAddress } from "@atoms";
import axios from 'axios';

import "./style.css";

const AddAddressModalMobile = () => {
  const modal = useSecondModal();
  const setAddress = useSetRecoilState(selectedShippingAddress);
  const selectedAddress = useRecoilValue(selectedShippingAddress);
  const [isLoading, setLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const postData = async (data) => {
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
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
    selectedAddress && formik.setValues(selectedAddress);
  }, []);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      addressDetails: "",
      zipCode: "",
      city: "",
      arrivalInstructions: "",
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: object({
      fullName: string().required("Required"),
      phoneNumber: string().required("Required"),
      email: string().required("Required"),
      address: string().required("Required"),
      addressDetails: string().required("Required"),
      zipCode: number().required("Required"),
      city: string().required("Required"),
      arrivalInstructions: "",
    }),
    onSubmit: async (values) => {
      if (!Object.keys(formik.errors).length) {
        setLoading(true);
        setAddress(values);
        console.log(values);
        // await postData({...values, uid:localStorage.getItem('uniqueUserId')});
        setLoading(false);
        handleCloseModal();
      }
    },
  });
  const handleCloseModal = () => {
    modal("close", "addAddressMobile");
  };
  return (
    <>
      <form className="add-address-modal-mobile" onSubmit={formik.handleSubmit}>
        <div className="add-address-modal-mobile__header">
          <span>נא להזין את פרטי המשלוח</span>
          <img
            onClick={() => handleCloseModal()}
            src="/assets/file/images/cross.svg"
            alt="cross"
          />
        </div>
        <div className="add-address-modal-mobile__content rtl">
          <div className="form__row">
            <Input
              label="שם מלא"
              name="fullName"
              placeholder="שם פרטי ושם משפחה"
              onChange={formik.handleChange}
              value={formik.values.fullName}
              error={formik.errors.fullName}
              autoFocus={true}
            />
          </div>
          <div className="form__row">
            <Input
              name="phoneNumber"
              type="tel"
              mask="999-999-9999"
              label="מספר טלפון"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.errors.phoneNumber}
            />
          </div>
          <div className="form__row">
            <Input
              name="email"
              type="email"
              label="כתובת אימייל"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
          </div>
          <div className="form__row">
            <Input
              name="address"
              label="כתובת מגורים למשלוח"
              placeholder="רחוב ומספר בית או תא דואר"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.errors.address}
            />
            <Input
              name="addressDetails"
              placeholder="דירה, כניסה, קומה"
              onChange={formik.handleChange}
              value={formik.values.addressDetails}
              error={formik.errors.addressDetails}
            />
          </div>
          <div className="form__row column">
            <StyledSelect
              label="עיר"
              name="city"
              placeholder={false}
              search
              options={cityData}
              onChange={(i) => formik.setFieldValue("city", i.value)}
              value={cityData.find((itm) => itm.value === formik.values.city)}
              defaultValue={cityData.find(
                (itm) => itm.value === formik.values.city
              )}
              error={formik.errors.city}
              menuPlacement="top"
            />
            <Input
              name="zipCode"
              onChange={formik.handleChange}
              label="מיקוד"
              value={formik.values.zipCode}
              error={formik.errors.zipCode}
              maxLength={7}
            />
          </div>
          <div className="form__row">
            <Textarea
              label="הוראות הגעה (אופציונלי)"
              placeholder="הערות, העדפות, קוד לבניין ועוד"
              value={formik.values.arrivalInstructions}
              onChange={formik.handleChange}
              name="arrivalInstructions"
              style={{minHeight: 0}}
              rows="1"
            />
          </div>
          <div className="form_row">
            <button type="submit" className="submit">
            אישור 
            </button>
          </div>
        </div>
      </form>
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
    </>
  );
};

export default AddAddressModalMobile;
