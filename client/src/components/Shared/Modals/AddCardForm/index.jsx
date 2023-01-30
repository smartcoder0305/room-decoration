import React, {useState} from "react";
import { useFormik } from "formik";
import valid from "card-validator";
import axios from "axios";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import StyledSelect from "@shared/components/Select";
import Input from "@shared/components/Input";
import HeartLoader from "@shared/HeartLoader";
import { paymentMethods, secondaryModals, selectedPaymentMethod, secondOverlayState } from '@atoms';
import {
  netPriceState,
} from "@atoms/priceCalc";
import "./style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AddCardForm = () => {
  const [cardErr, setCardErr] = useState({
    cardNumberErr: false,
    cardHolderErr: false,
    cardExpMonErr: false,
    cardExpYearErr: false,
    cardCVVErr: false,
  });
  const [isLoading, setLoading] = useState(false);
  const [verifyErr, setVerifyErr] = useState('');
  const setPaymentsMethod = useSetRecoilState(paymentMethods);
  const setSelectedPayment = useSetRecoilState(selectedPaymentMethod);
  const setModals = useSetRecoilState(secondaryModals);
  const netPrice = useRecoilValue(netPriceState);
  const selectedPayment = useRecoilValue(selectedPaymentMethod);
  const [_, setOverlay] = useRecoilState(secondOverlayState);

  const getCardExpDate = (month, year) => {
    const shortYear = year % 100;
    let shortYearStr = shortYear < 10 ? '0' + shortYear.toString() : shortYear.toString();
    return `${month}${shortYearStr}`;
  }
  const verifyCard = async (card) => {
    try {
      const res = await axios.post(BASE_URL+'/payment/cardverify', {
        card: {
          no: card.cardNumber.replace(/\s/g, ''),
          expdate: getCardExpDate(card.expiriedMonth, card.expiriedYear),
          cvv: card.cvv,
        },
        amount: netPrice,
      });
      console.log(res)
      if (res?.status === 200) return true;
      return false;
    } catch (err) {
      console.log(err)
      return false;
    }
  }

  const formik = useFormik({
    initialValues: {
      cardHolder: "",
      cardNumber: "",
      expiriedMonth: "",
      expiriedYear: "",
      cvv: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      console.log('values------------------------', values);
      const numberValidation = valid.number(values.cardNumber.replace(/s/g, '').replace(/_/g, '')).isPotentiallyValid && !!values.cardNumber;
      const holderValidation = valid.cardholderName(values.cardHolder).isPotentiallyValid && !!values.cardHolder;
      const expMonValidation = valid.expirationMonth(values.expiriedMonth).isPotentiallyValid && !!values.expiriedMonth;
      const expYearValidation = valid.expirationYear(values.expiriedYear.toString()).isPotentiallyValid && !!values.expiriedYear.toString();
      const cvvValidation = valid.cvv(values.cvv).isPotentiallyValid && !!values.cvv;
      console.log(numberValidation, holderValidation, expMonValidation, expYearValidation, cvvValidation);
      if (!numberValidation || !holderValidation || !expMonValidation || !expYearValidation || !cvvValidation) {
        setCardErr({
          cardNumberErr: !numberValidation,
          cardHolderErr: !holderValidation,
          cardExpMonErr: !expMonValidation,
          cardExpYearErr: !expYearValidation,
          cardCVVErr: !cvvValidation,
        })
        setLoading(false);
        return;
      }
      const isValid = await verifyCard(values);
      console.log('isValid', isValid);

      if (!isValid) {
        setVerifyErr('Card Verfication failed.');
        setLoading(false);
        return;
      }
      let hebrewType = '';
      const cardType = valid.number(values.cardNumber.replace(/s/g, '')).card.type;
      console.log('cartType', cardType);
      console.log(cardType);
      if (cardType === 'visa') hebrewType = 'ויזה';
      else if (cardType === 'mastercard') hebrewType = 'מאסטרקארד';
      else if (cardType === 'diners') hebrewType = 'דיינרס';
      else if (cardType === 'amex') hebrewType = 'אמריקן אקספרס';
      else hebrewType = 'כרטיס אשרא';
      // setPaymentsMethod(methods => ( [...methods, {...values, hebrewType}]));
      setSelectedPayment({...values, hebrewType});
      setLoading(false);
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
    const min = new Date().getFullYear()
    const max = min + 10
    const years = []
  
    for (var i = min - 1; i <= max; i++) {
      years.push({ value: i, label: i })
    }
    return years
  }

  const handleCloseCardForm = () => {
    setModals(state => ({
      ...state,
      addCard: { visible: false },
        selectCard: { visible: false },
    }))
    setOverlay(false);
  }
  
  return (
    <form className="add-new-card-form" onSubmit={formik.handleSubmit}>
      <div className="add-new-card-form__header">הקלד את פרטי הכרטיס שלך</div>
      <div className="add-new-card-form__content">
        <div className="form__description rtl" style={{fontSize: "14px"}}>
          בלנדס מאשרת את כל סוגי שיטות התשלום וכרטיסי האשראי הגדולים:
          <div className="card__examples" style={{paddingLeft: "30px", paddingTop: "15px"}}>
            <img src="/assets/file/images/card-brands.PNG" width="100%" />
          </div>
        </div>
        <div className="form__fields">
          <div className="form__fields--row">
            <div style={cardErr.cardNumberErr ? {border: "1px solid red", borderRadius: "6px"} : {}}>
              <Input
                name="cardNumber"
                mask=""
                type="tel"
                alwaysShowMask={false}
                onChange={(e) => {
                  let number = e.target.value.replace(/\s/g, '').replace(/_/g, '');
                  if (number.startsWith('34') || number.startsWith('37') || number.startsWith('123')) {
                    setCardErr({...cardErr, cardNumberErr: true});
                  } else {
                    setCardErr({...cardErr, cardNumberErr: false});
                  }
                  if (number.length > 8) {
                    if (cardErr.cardNumberErr) {
                      e.target.value = number.substr(0, 8);
                      number = number.substr(0, 8);
                    }
                  }
                  const joy = number.match(/.{1,4}/g);
                  if (joy) e.target.value = joy.join(' ');
                  console.log('target value', e.target.value);
                  formik.handleChange(e)}
                }
                placeholder=""
                value={formik.values.cardNumber}
                autoFocus={true}
                maxLength={19}
              />
            </div>
            <span>מספר כרטיס</span>
          </div>
          <div className="form__fields--row">
            <div style={cardErr.cardHolderErr ? {border: "1px solid red", borderRadius: "6px"} : {}}>
              <Input
                name="cardHolder"
                onChange={formik.handleChange}
                value={formik.values.cardHolder}
              />
            </div>
            <span>שם בעל הכרטיס</span>
          </div>
          <div className="form__fields--row">
            <div className="selects" style={(cardErr.cardExpMonErr || cardErr.cardExpYearErr) ? {border: "1px solid red", borderRadius: "6px"} : {}}>
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
            <div className="cvv_content" style={cardErr.cardCVVErr ? {border: "1px solid red", borderRadius: "6px"} : {}}>
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
          {verifyErr && (
            <div className="form__fields--row" style={{color: "red"}}>
              {verifyErr}
            </div>
            )
          }
        </div>
      </div>
      <div className="add-new-card-form__footer">
        <button className="submit" type="submit">
          הכנס כרטיס
        </button>
        <button onClick={() => handleCloseCardForm()} type="button">ביטול</button>
      </div>
      <HeartLoader isLoading={isLoading}/>
    </form>
  );
};

export default AddCardForm;
