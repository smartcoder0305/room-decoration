import React from "react";
import { useFormik } from "formik";
import StyledSelect from "@shared/components/Select";
import Input from "@shared/components/Input";
import { useSetRecoilState } from "recoil";
import { paymentMethods, secondaryModals } from '@atoms';
import "./style.css";

const AddCardForm = () => {
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
      addCard: { visible: false },
        selectCard: { visible: true },
    }))
  }
  
  return (
    <form className="add-new-card-form" onSubmit={formik.handleSubmit}>
      <div className="add-new-card-form__header">הקלד את פרטי הכרטיס שלך</div>
      <div className="add-new-card-form__content">
        <div className="form__description rtl">
          בלנדס מאשרת את כל סוגי שיטות התשלום וכרטיסי האשראי הגדולים:
          <div className="card__examples"></div>
        </div>
        <div className="form__fields">
          <div className="form__fields--row">
            <Input
              name="cardNumber"
              mask="9999 9999 9999 9999"
              type="tel"
              alwaysShowMask={false}
              onChange={formik.handleChange}
              placeholder="0000 0000 0000 0000"
              value={formik.values.cardNumber}
            />
            <span>שם בעל הכרטיס</span>
          </div>
          <div className="form__fields--row">
            <Input
              name="cardHolder"
              onChange={formik.handleChange}
              value={formik.values.cardHolder}
            />
            <span>מספר כרטיס</span>
          </div>
          <div className="form__fields--row">
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
            <span>תוקף</span>
          </div>
          <div className="form__fields--row">
            <div className="cvv_content">
              <Input
                name="cvv"
                onChange={formik.handleChange}
                value={formik.values.cvv}
                mask="999"
                type="tel"
              />
            </div>
            <span>קוד בטחון (CVV)</span>
          </div>
        </div>
      </div>
      <div className="add-new-card-form__footer">
        <button className="submit" type="submit">
          הכנס כרטיס
        </button>
        <button onClick={() => handleCloseCardForm()} type="button">ביטול</button>
      </div>
    </form>
  );
};

export default AddCardForm;
