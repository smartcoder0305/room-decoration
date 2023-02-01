import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import StyledSelect from "@shared/components/Select";
import Input from "@shared/components/Input2";
import Textarea from "@shared/components/Textarea";
import cityData from "@data/cityData";
import { object, string, number } from "yup";
import { useSecondModal } from "@helpers/hooks/useSecondModal";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { selectedShippingAddress } from "@atoms";
import axios from 'axios';

import "./style.css";

const AddAddressModal = () => {
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
      phone: "",
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: object({
      fullName: string().required("Required"),
      phoneNumber: number().required("Required"),
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
    modal("close", "addAddress");
  };
  return (
    <>
      <form className="add-address-modal" onSubmit={formik.handleSubmit}>
        <div className="add-address-modal__header">
          <span>נא להזין את פרטי המשלוח</span>
        </div>
        <div className="add-address-modal__content rtl">
          <div className="form-column">
            <div className="form__row">
              <Input
                label="שם פרטי ושם משפחה"
                name="fullName"
                placeholder="שם פרטי ושם משפחה"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                error={formik.errors.fullName}
                autoFocus={true}
                icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#727272" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
                  <path d="M14.3333 14.8667C14.3333 11.9211 11.9456 9.53334 8.99996 9.53334C6.05436 9.53334 3.66663 11.9211 3.66663 14.8667" stroke="#727272" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
                  <path d="M9.00005 9.53333C10.7674 9.53333 12.2 8.10064 12.2 6.33333C12.2 4.56602 10.7674 3.13333 9.00005 3.13333C7.23274 3.13333 5.80005 4.56602 5.80005 6.33333C5.80005 8.10064 7.23274 9.53333 9.00005 9.53333Z" stroke="#727272" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
                </svg>}

              />
            </div>
            <div className="form__row">
              <Input
                label="טלפון"
                name="phoneNumber"
                placeholder="טלפון"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={formik.errors.phoneNumber}
                icon={<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.216 4.29206L13.7025 0.806553L13.h291 0.398814C12.7592 -0.132938 11.8301 -0.132938 11.2983 0.398814L9.80827 1.88885C9.54146 2.15566 9.3949 2.50985 9.3949 2.88565C9.3949 3.26144 9.54146 3.61563 9.80639 3.88151L10.216 4.29206Z" fill="#727272"/>
                  <path d="M3.89513 9.7937C3.36338 9.26194 2.43422 9.26194 1.90247 9.7937L0.412436 11.2837C0.14656 11.5505 0 11.9047 0 12.2805C0 12.6563 0.146561 13.0105 0.414315 13.2783L0.824873 13.6841L4.30381 10.2052L3.89513 9.7937Z" fill="#727272"/>
                  <path d="M14.9727 2.08047L14.6401 1.74789L11.1564 5.23153L11.7671 5.84126C11.8564 5.93051 11.9043 6.04795 11.9043 6.17384C11.9043 6.29973 11.8554 6.41716 11.7671 6.50642L6.51912 11.7544C6.34156 11.931 6.03246 11.932 5.8549 11.7544L5.24423 11.1437L1.76624 14.6293L2.09882 14.9618C2.34308 15.2061 3.26942 16 4.9699 16C6.48812 16 8.96837 15.3311 12.157 12.1434C18.5202 5.77831 15.1239 2.23173 14.9727 2.08047Z" fill="#727272"/>
                </svg>}
                maxLength={10}
              />
            </div>
            <div className="form__row">
              <Input
                label="אימייל"
                name="email"
                placeholder="אימייל"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
                icon={<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.3846 3.69231C15.2214 3.69231 15.0649 3.75714 14.9495 3.87255C14.8341 3.98796 14.7692 4.14448 14.7692 4.30769V9.23077C14.7692 9.39398 14.7044 9.5505 14.589 9.66591C14.4736 9.78132 14.3171 9.84615 14.1538 9.84615H1.84615C1.68294 9.84615 1.52642 9.78132 1.41101 9.66591C1.2956 9.5505 1.23077 9.39398 1.23077 9.23077V4.30769C1.23077 4.14448 1.16593 3.98796 1.05053 3.87255C0.93512 3.75714 0.778595 3.69231 0.615385 3.69231C0.452174 3.69231 0.295649 3.75714 0.180242 3.87255C0.064835 3.98796 0 4.14448 0 4.30769V9.23077C0.000430897 9.72023 0.195219 10.1895 0.541539 10.5354C0.887427 10.8817 1.35669 11.0765 1.84615 11.0769H14.1538C14.6433 11.0765 15.1126 10.8817 15.4585 10.5354C15.8048 10.1895 15.9996 9.72023 16 9.23077V4.30769C16 4.14448 15.9352 3.98796 15.8198 3.87255C15.7044 3.75714 15.5478 3.69231 15.3846 3.69231Z" fill="#727272"/>
                  <path d="M7.63085 7.26154C7.73737 7.34143 7.86693 7.38461 8.00008 7.38461C8.13323 7.38461 8.26279 7.34143 8.36931 7.26154L15.637 1.80923C15.7504 1.72373 15.8307 1.60166 15.8644 1.46371C15.898 1.32575 15.8829 1.1804 15.8216 1.05231C15.73 0.862967 15.6072 0.69032 15.4585 0.541538C15.1127 0.195219 14.6434 0.000430897 14.1539 0H1.84624C1.35677 0.000430897 0.88751 0.195219 0.541621 0.541538C0.392917 0.69032 0.270192 0.862967 0.178544 1.05231C0.117262 1.1804 0.102165 1.32575 0.135813 1.46371C0.16946 1.60166 0.249782 1.72373 0.36316 1.80923L7.63085 7.26154ZM1.84624 1.23077H14.1539C14.211 1.22178 14.2692 1.22178 14.3262 1.23077L8.00008 6L1.67393 1.23077C1.73101 1.22178 1.78915 1.22178 1.84624 1.23077Z" fill="#727272"/>
                </svg>}
              />
            </div>
            <div className="form__row">
              <Input
                label="רחוב ומספר בית או תא דואר"
                name="address"
                placeholder="רחוב ומספר בית או תא דואר"
                onChange={formik.handleChange}
                value={formik.values.address}
                error={formik.errors.address}
                icon={<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.3851 17H2.84647V9.61531H1.76031C1.05999 9.61531 0.73322 8.74207 1.26061 8.28114L8.4656 1.45831C9.11053 0.847229 10.1204 0.847229 10.7653 1.45831L17.9697 8.28114C18.4977 8.74146 18.1709 9.61531 17.47 9.61531H16.3851V17Z" stroke="#727272" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.0773 17H7.15417V13.3077C7.15417 11.9483 8.25634 10.8461 9.61574 10.8461C10.9751 10.8461 12.0773 11.9483 12.0773 13.3077V17Z" stroke="#727272" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                }
              />
            </div>
          </div>
          <div className="add-address-modal__content-divider">
          </div>
          <div className="form-column">
            <div className="form__row">
              <Input
                label="דירה, כניסה, קומה"
                name="addressDetails"
                placeholder="דירה, כניסה, קומה"
                onChange={formik.handleChange}
                value={formik.values.address}
                error={formik.errors.address}
              />
            </div>
            <div className="form__row column">
              <StyledSelect
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
                // menuPlacement="top"
              />
              <Input
                name="zipCode"
                onChange={formik.handleChange}
                label="מיקוד"
                placeholder="מיקוד"
                value={formik.values.zipCode}
                error={formik.errors.zipCode}
                maxLength={7}
                icon={<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.7333 6.86667C12.7333 5.31073 12.1152 3.81852 11.015 2.71831C9.91481 1.61809 8.4226 1 6.86667 1C5.31073 1 3.81852 1.61809 2.71831 2.71831C1.61809 3.81852 1 5.31073 1 6.86667C1 12.2 6.86667 17 6.86667 17C6.86667 17 12.7333 12.2 12.7333 6.86667Z" stroke="#727272" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.86668 9.53333C8.33944 9.53333 9.53335 8.33942 9.53335 6.86666C9.53335 5.3939 8.33944 4.2 6.86668 4.2C5.39392 4.2 4.20001 5.3939 4.20001 6.86666C4.20001 8.33942 5.39392 9.53333 6.86668 9.53333Z" stroke="#727272" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                }
                style={{width: "127px"}}
              />
            </div>
            <div className="form__row" style={{paddingTop: "10px"}}>
              <Textarea
                label="הוראות הגעה (אופציונלי)"
                placeholder="הערות, העדפות, קוד לבניין ועוד הוראות לשליח"
                value={formik.values.arrivalInstructions}
                onChange={formik.handleChange}
                name="arrivalInstructions"
                style={{maxHeight: "73px !important"}}
              />
            </div>
          </div>
        </div>
        <div className="add-address-modal__footer">
			    <div className="add-address-modal__submit" onClick={formik.handleSubmit}>
					  אישור פרטים	
					</div>
					<div className="add-address-modal__quit" onClick={() => handleCloseModal()}>
					  ביטול
					</div>
        </div>
      </form>
    </>
  );
};

export default AddAddressModal;
