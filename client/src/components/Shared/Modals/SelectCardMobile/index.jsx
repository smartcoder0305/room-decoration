import React from "react";
import { secondaryModals } from '@atoms';
import { useSetRecoilState } from "recoil";

import "./style.css";

const SelectCardModalMobile = ({ style }) => {
  const setModals = useSetRecoilState(secondaryModals);

  const handleOpenNewCardForm = () => {
    setModals(md => ({
      ...md,
      selectCardMobile: { visible: false},
      addCardMobile: { visible: true }
    }))
  }

  return (
    <div className="add-card-modal-mobile" style={{ ...style }}>
      <button onClick={() => handleOpenNewCardForm()} style={{color: "black", fontWeight: "700"}}>
      תשלום בכרטיס אשראי
        <img src="/assets/images/plus.svg" alt="add-new-card" />
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

export default SelectCardModalMobile;
