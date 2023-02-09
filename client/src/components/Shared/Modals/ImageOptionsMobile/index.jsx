import React from "react";
import { useRecoilState } from "recoil";
import { modalWindows } from "@atoms";
import './style.css';

const ImageOptionsMobile = ({ isOpen, style, options }) => {
  const [modals, setModals] = useRecoilState(modalWindows);

  const hideOptons = () => setModals(state => ({ ...state, imageOptions: { ...state.imageOptions, visible: false }}));

  const handleOpenEditImage = () => {
    options?.editImage();
    hideOptons();
  }

  const handleOpenDeleteImage = () => {
    options?.deleteImage();
    hideOptons();
  }
  
  return (
    <div className="image-options" style={{ ...style }}>
      <button className="image-options__item" onClick={() => handleOpenEditImage()} style={{color: "black", fontWeight: "700"}}>
      עריכת תמונה <img src="/assets/file/images/edit_image.svg" alt="edit" />
      </button>
      <button className="image-options__item" onClick={() => handleOpenDeleteImage()} style={{color: "black", fontWeight: "700"}}>
      הסר תמונה <img src="/assets/file/images/Delete_icon.svg" alt="delete" />
      </button>
    </div>
  );
};

export default ImageOptionsMobile;
