import React from "react";
import { useRecoilState } from "recoil";
import { showMenu, overlayState } from "@atoms";
import "./style.css";

const Overlay = () => {
  const [_menu, setMenuShow] = useRecoilState(showMenu);
  const [overlay, setOverlay] = useRecoilState(overlayState);
  const closeByOverlayClick = (e) => {
    if (e.target.className === "overlay_cart show") {
      setOverlay(false);
      setMenuShow(false);
    }
  };

  return (
    <div
      onClick={(e) => closeByOverlayClick(e)}
      id="checkoutOverlay"
      className={`overlay_cart ${overlay ? 'show' : 'hide'}`}
    ></div>
  );
};
export default Overlay;
