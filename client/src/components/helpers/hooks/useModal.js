import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { modalWindows, overlayState } from "@atoms";

export function useModal() {
  const [modal, setModal] = useRecoilState(modalWindows);
  const [isOverlay, setOverlay] = useRecoilState(overlayState);
  const modalRef = useRef(modal);
  const overlayRef = useRef(isOverlay);

  useEffect(() => {
    modalRef.current = modal;
    overlayRef.current = isOverlay;
  }, [modal, isOverlay]);

  function toggleModal(action, name, data, delay) {
    setOverlay(action === "open");
    setTimeout(
      () =>
        setModal((state) => {
          return {
            ...state,
            [name]: { visible: action === "open", data },
          };
        }),
      0
    );
  }

  return toggleModal;
}
