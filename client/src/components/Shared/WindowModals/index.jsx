import React from "react";
import { useRecoilState } from "recoil";
import EditImage from "@modals/EditImage";
import UploadOptions from "@modals/UploadOptions";
import ImageLoader from "@modals/ImageLoader";
import ImageOptionsMobile from "@modals/ImageOptionsMobile";
import DeleteConfirm from "@modals/DeleteConfirm";
import Checkout from "@modals/Checkout";
import CheckoutMobile from "@modals/CheckoutMobile";
import { modalWindows, overlayState } from "@atoms";
import { Transition, CSSTransition } from "react-transition-group";

import cn from "classnames";
import "./style.css";

const WindowModals = () => {
  const [modals, setModals] = useRecoilState(modalWindows);
  const [_, setOverlay] = useRecoilState(overlayState);
  const handleCloseModal = (name) => {
    setModals((modal) => ({ ...modal, [name]: { visible: false, data: modal[name].data } }));
    setOverlay(false);
  };

  const closeByOverlayClick = (e) => {
    if (e.target.className === "modal-overlay show") {
      setModals(state => ({
        editImage: { visible: false, data: state.editImage.data },
        uploadOptions: { visible: false },
        imageLoader: { visible: false },
        imageOptions: { visible: false },
        deleteConfirm: { visible: false, data: state.deleteConfirm.data },
        checkout: { visible: false },
        mobileCheckout: { visible: false },
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
    entering: { bottom: "15px" },
    entered: { bottom: "15px" },
    exiting: { bottom: "-150%" },
    exited: { bottom: "-150%" },
  };

  const transitionStylesZeroBottom = {
    entering: { bottom: "0px" },
    entered: { bottom: "0px" },
    exiting: { bottom: "-150%" },
    exited: { bottom: "-150%" },
  };
  return (
    <div
      className={cn("modal-overlay", {
        show: isShow,
        hide: !isShow,
      })}
      onClick={(e) => closeByOverlayClick(e)}
    >
      <CSSTransition
        in={modals.editImage.visible}
        timeout={duration}
        classNames="css-transition"
        unmountOnExit
      >
        <EditImage handleCloseModal={handleCloseModal} modalData={modals.editImage.data}/>
      </CSSTransition>

      <CSSTransition
        in={modals.deleteConfirm.visible}
        timeout={duration}
        classNames="css-transition"
        unmountOnExit
      >
        <DeleteConfirm
          handleCloseModal={handleCloseModal}
          modalData={modals.deleteConfirm.data}
        />
      </CSSTransition>

      {modals.imageLoader.visible && <ImageLoader />}

      <Transition
        classNames="bounce-down"
        timeout={duration}
        in={modals.uploadOptions.visible}
      >
        {(state) => (
          <UploadOptions
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            isOpen={modals.uploadOptions.visible}
          />
        )}
      </Transition>

      <Transition
        classNames="bounce-down"
        timeout={duration}
        in={modals.imageOptions.visible}
      >
        {(state) => (
          <ImageOptionsMobile
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            options={modals.imageOptions.data}
            isOpen={modals.imageOptions.visible}
          />
        )}
      </Transition>
      
      <Transition
        classNames="bounce-down"
        timeout={duration}
        in={modals.mobileCheckout.visible}
      >
        {(state) => (
          <CheckoutMobile
            style={{
              ...defaultStyle,
              ...transitionStylesZeroBottom[state],
            }}
            options={modals.mobileCheckout.data}
            isOpen={modals.mobileCheckout.visible}
          />
        )}
      </Transition>

      <Checkout show={modals.checkout.visible} handleCloseModal={handleCloseModal}/>
    </div>
  );
};

export default WindowModals;
