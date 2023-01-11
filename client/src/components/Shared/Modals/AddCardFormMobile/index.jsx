import React from "react";
import { useFormik } from "formik";
import StyledSelect from "@shared/components/Select";
import Input from "@shared/components/Input";
import { useSetRecoilState } from "recoil";
import { paymentMethods, secondaryModals } from '@atoms';
import "./style.css";

const AddCardFormMobile = () => {
  const setPaymentsMethod = useSetRecoilState(paymentMethods);
  const setModals = useSetRecoilState(secondaryModals);
  const formik = useFormik({
    initialValues: {
      cardHolder: "",
      cardNumber: "",
      expiriedMonth: "",
      expiriedYear: "",
      cvv: "",
    },
    onSubmit: (values) => {
      setPaymentsMethod(methods => ( [...methods, values]));
      handleCloseCardForm();
    },
  });

  const monthArray = [...Array(12)].map((_,index) => {
    if (index >= 9) {
      return ({ value: `${index+1}`, label: `${index+1}` })
    }
    return ({ value: `0${index+1}`, label: `0${index+1}` })
  });

  const generateArrayOfYears = () => {
    const max = new Date().getFullYear()
    const min = max - 100
    const years = []
  
    for (var i = max; i >= min; i--) {
      years.push({ value: i, label: i })
    }
    return years
  }

  const handleCloseCardForm = () => {
    setModals(state => ({
      ...state,
      addCardMobile: { visible: false },
      selectCardMobile: { visible: true },
    }))
  }
  
  return (
    <form className="add-new-card-form-mobile" onSubmit={formik.handleSubmit}>
      <div className="add-new-card-form-mobile__header" onClick={() => handleCloseCardForm()}>חזור &nbsp;&nbsp;&nbsp;&gt;</div>
      <div className="add-new-card-form-mobile__content">
        <div className="form__fields-mobile">
          <span style={{lineHeight: "36px", marginRight: "6px", marginBottom: "5px"}}>נזין את פרטי הכרטיס </span>
          <div className="form__fields-mobile--row no-bottom-radius">
            <Input
              name="cardHolder"
              onChange={formik.handleChange}
              value={formik.values.cardHolder}
              placeholder="שם בעל הכרטיס"
            />
          </div>
          <div className="form__fields-mobile--row no-top-radius" style={{marginTop: "-1px"}}>
            <Input
              name="cardNumber"
              mask="9999 9999 9999 9999"
              type="tel"
              alwaysShowMask={false}
              onChange={formik.handleChange}
              placeholder="מספר כרטיס"
              value={formik.values.cardNumber}
            />
          </div>
          <br />
          <div className="form__fields-mobile--row">
            <div className="cvv_content">
              <Input
                name="cvv"
                onChange={formik.handleChange}
                value={formik.values.cvv}
                mask="999"
                type="tel"
                placeholder="קוד בטחון (CVV)"
              />
            </div>
          </div>
          <div className="form__fields-mobile--row">
            <span style={{lineHeight: "36px", marginRight: "6px", marginBottom: "5px"}}>תוקף</span>
            <div className="selects">
              <StyledSelect
                name="expiriedMonth"
                options={monthArray}
                placeholder={false}
                onChange={(i) => formik.setFieldValue('expiriedMonth', i.value)}
                defaultValue={monthArray.find(itm => itm.value === formik.values.expiriedMonth)}
              />
              <StyledSelect
                name="expiriedYear"
                options={generateArrayOfYears()}
                placeholder={false}
                onChange={(i) => formik.setFieldValue('expiriedYear', i.value)}
                defaultValue={generateArrayOfYears().find(itm => itm.value === formik.values.expiriedYear)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="add-new-card-form-mobile__footer">
        <button className="submit" type="submit">
          נוסיף
        </button>
      </div>
      <div style={{display: "flex", padding: "20px", alignItems: "center", justifyContent: "space-between"}}>
        <div style={{width: "135px", height: "0px", border: "1px solid #CECECE"}}></div>
        <img src="assets/file/images/pci_compliance_logo.png" />
        <div style={{width: "135px", height: "0px", border: "1px solid #CECECE"}}></div>
      </div>
    </form>
  );
};

export default AddCardFormMobile;
