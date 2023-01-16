import React from "react";
import { paymentMethods, selectedPaymentMethod, secondaryModals } from '@atoms';
import { useSecondModal } from '@helpers/hooks/useSecondModal';
import { useSetRecoilState, useRecoilValue } from "recoil";

import "./style.css";

const SelectCardModalMobile = ({ style }) => {
  const payments = useRecoilValue(paymentMethods);
  const setSelectedPayment = useSetRecoilState(selectedPaymentMethod);
  const setModals = useSetRecoilState(secondaryModals);
  const modal = useSecondModal();

  const handleSelectPayment = (id) => {
    setSelectedPayment(id);
    modal('close', 'selectCardMobile');
  }

  const handleOpenNewCardForm = () => {
    setModals(md => ({
      ...md,
      selectCardMobile: { visible: false},
      addCardMobile: { visible: true }
    }))
  }

  const generageItemName = (value) => {
    const firstNumbers = value.slice(0, 4);
    const lastNumbers = value.slice(-4)

    return `${firstNumbers} **** ***** ${lastNumbers}`;
  }
  return (
    <div className="add-card-modal-mobile" style={{ ...style }}>
      <button onClick={() => handleOpenNewCardForm()}>
        נוסיף כרטיס אשראי
        <img src="/assets/images/plus.svg" alt="add-new-card" />
      </button>
      {payments.length > 0 && (
      <ul>
      {payments.map(item => (
        <li key={item.cardNumber}>
          <button onClick={() => handleSelectPayment(item)}>{generageItemName(item.cardNumber)} <img src="/assets/images/card-1.jpg" alt="card" /></button>
        </li>
      ))}
      </ul>
      )}
    </div>
  );
};

export default SelectCardModalMobile;
