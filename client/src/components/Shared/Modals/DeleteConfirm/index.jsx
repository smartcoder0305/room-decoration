import React from 'react'
import { imagesData } from "@atoms";
import { useRecoilState } from 'recoil';
import ImageLoader from "@shared/ImageLoader";
import './style.css'

 const DeleteConfirm = ({
    handleCloseModal,
    modalData,
 }) => {
  const [images, setImages] = useRecoilState(imagesData);

  const imageUrl = `${modalData?.data?.image}`;

  const handleDeleteImage = () => {
    modalData.onDelete();
    handleCloseModal('deleteConfirm');
  }

  const handleCancelDelete = () => {
    const imageId = modalData.data._id;
    const updateImages = images.map(item => item._id === imageId ? ({ ...item, keepImage: true }) : item);
    setImages(updateImages);
    modalData.onKeepImage(imageId);
    handleCloseModal('deleteConfirm');
  }

  return (
    <div className="confirm-delete-modal">
        <div className="confirm-delete__preview">
            <h2>תמונה באיכות נמוכה</h2>
            <ImageLoader src={imageUrl} alt="preview"/>
            <p className="description">
            התמונה הזו באיכות נמוכה, היא כנראה תצא מטושטשת בהדפסה   
            </p>
        </div>
        <div className="confirm-delete__actions">
            <button onClick={() => handleCancelDelete()} className="delete">השאר את התמונה בכל זאת</button>
            <button onClick={() => handleDeleteImage()} className="cancel">הסר מההזמנה</button>
        </div>
    </div>
  )
}
export default DeleteConfirm;