import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { secondaryModals, secondOverlayState } from "@atoms";

export function useSecondModal() {
  const [modal, setModal] = useRecoilState(secondaryModals);
  const [isOverlay, setOverlay] = useRecoilState(secondOverlayState);
  const modalRef = useRef(modal);
  const overlayRef = useRef(isOverlay);

  useEffect(() => {
    modalRef.current = modal;
    overlayRef.current = isOverlay;
  }, [modal, isOverlay]);

  function toggleModal(action, name, data) {
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
