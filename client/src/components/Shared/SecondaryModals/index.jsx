import React from "react";
import { secondaryModals, secondOverlayState } from "@atoms";
import cn from "classnames";
import { Transition, CSSTransition } from "react-transition-group";
import { useRecoilState } from "recoil";
import SelectCardModal from "@modals/SelectCard";
import SelectCardModalMobile from "@modals/SelectCardMobile";
import AddAddressModal from "@modals/AddAddress";
import AddAddressModalMobile from "@modals/AddAddressMobile";
import AddCardForm from '@modals/AddCardForm';
import AddCardFormMobile from '@modals/AddCardFormMobile';
import './style.css';

const SecondaryModals = () => {
  const [modals, setModals] = useRecoilState(secondaryModals);
  const [_, setOverlay] = useRecoilState(secondOverlayState);

  const handleCloseModal = (name) => {
    setModals((modal) => ({
      ...modal,
      [name]: { visible: false, data: modal[name]?.data },
    }));
    setOverlay(false);
  };

  const closeByOverlayClick = (e) => {
    if (e.target.className === "second-modal-overlay show") {
      setModals((state) => ({
        addCard: { visible: false },
        selectCard: { visible: false },
        addAddress: { visible: false },
        addCardMobile: { visible: false },
        selectCardMobile: { visible: false },
        addAddressMobile: { visible: false },
      }));
      setOverlay(false);
    }
  };

  const isShow = Object.values(modals).find((i) => i.visible);

  const duration = 300;

  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
  };

  const transitionStyles = {
    entering: { bottom: "60px" },
    entered: { bottom: "60px" },
    exiting: { bottom: "-150%" },
    exited: { bottom: "-150%" },
  };

  const transitionStylesMobile = {
    entering: { bottom: "10px" },
    entered: { bottom: "10px" },
    exiting: { bottom: "-150%" },
    exited: { bottom: "-150%" },
  };

  return (
    <div
      className={cn("second-modal-overlay", {
        show: isShow,
        hide: !isShow,
      })}
      onClick={(e) => closeByOverlayClick(e)}
    >
      <CSSTransition
        in={modals.addCard.visible}
        timeout={duration}
        classNames="css-transition"
        unmountOnExit
      >
        <AddCardForm
          handleCloseModal={handleCloseModal}
        />
      </CSSTransition>

      <CSSTransition
        in={modals.addCardMobile.visible}
        timeout={duration}
        classNames="css-transition"
        unmountOnExit
      >
        <AddCardFormMobile
          handleCloseModal={handleCloseModal}
        />
      </CSSTransition>

      <Transition
        classNames="bounce-down"
        timeout={duration}
        in={modals.selectCard.visible}
      >
        {(state) => (
          <SelectCardModal
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            isOpen={modals.selectCard.visible}
          />
        )}
      </Transition>
      <Transition
        classNames="bounce-down"
        timeout={duration}
        in={modals.selectCardMobile.visible}
      >
        {(state) => (
          <SelectCardModalMobile
            style={{
              ...defaultStyle,
              ...transitionStylesMobile[state],
            }}
            isOpen={!modals.selectCardMobile.visible}
          />
        )}
      </Transition>
      <CSSTransition
        in={modals.addAddress.visible}
        timeout={duration}
        classNames="css-transition"
        unmountOnExit
      >
        <AddAddressModal
          handleCloseModal={handleCloseModal}
        />
      </CSSTransition>
      <CSSTransition
        in={modals.addAddressMobile.visible}
        timeout={duration}
        classNames="css-transition"
        unmountOnExit
      >
        <AddAddressModalMobile
          handleCloseModal={handleCloseModal}
        />
      </CSSTransition>
    </div>
  );
};

export default SecondaryModals;
