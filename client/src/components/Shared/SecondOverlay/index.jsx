import React from "react";
import { useRecoilState } from "recoil";
import { secondOverlayState } from "@atoms";
import "./style.css";

const SecondOverlay = () => {
  const [overlay, setOverlay] = useRecoilState(secondOverlayState);
  const closeByOverlayClick = (e) => {
    if (e.target.className === "second-overlay show") {
      setOverlay(false);
    }
  };

  return (
    <div
      onClick={(e) => closeByOverlayClick(e)}
      id="checkoutOverlay"
      className={`second-overlay ${overlay ? 'show' : 'hide'}`}
    ></div>
  );
};
export default SecondOverlay;
