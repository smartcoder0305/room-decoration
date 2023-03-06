import React from "react";
import { paymentMethods, selectedPaymentMethod, secondaryModals } from '@atoms';
import { useSecondModal } from '@helpers/hooks/useSecondModal';
import { useSetRecoilState, useRecoilValue } from "recoil";

import "./style.css";

const SelectCardModal = ({ style }) => {
  const setModals = useSetRecoilState(secondaryModals);

  const handleOpenNewCardForm = () => {
    setModals(md => ({
      ...md,
      selectCard: { visible: false},
      addCard: { visible: true }
    }))
  }

  return (
    <div className="add-card-modal" style={{ ...style }}>
      <button onClick={() => handleOpenNewCardForm()}>
        תשלום בכרטיס אשראי
        <img src="/assets/images/card-pos.svg" alt="בדיקת כרטיס אשראי" />
      </button>
      {/* {payments.length > 0 && (
      <ul>
      {payments.map(item => (
        <li key={item.cardNumber}>
          <button onClick={() => handleSelectPayment(item)}>{generageItemName(item.cardNumber)} <img src="/assets/images/card-1.jpg" alt="card" /></button>
        </li>
      ))}
      </ul>
      )} */}
    </div>
  );
};

export default SelectCardModal;
