import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRecoilValue } from "recoil";
import Cropper from "react-cropper";
import { popUpImage, modalWindows } from "@atoms";
import { getImagesDB } from "@api";
import useWindowDimensions from "@helpers/hooks/windowDemensions";


import axios from "axios";
import "./style.css";

const EditModal = ({ handleCloseModal, modalData }) => {
  const cropperRef = useRef(null);
  const { height, width } = useWindowDimensions();

  const imageElement = cropperRef?.current;
  const cropper = imageElement?.cropper;

  const MAIN_URL = process.env.REACT_APP_MAIN_URL;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const localstr = localStorage.getItem("uniqueUserId");
  const imageonpopup = useRecoilValue(popUpImage);
  const modalsData = useRecoilValue(modalWindows);
  const [zoomvalue, setzoomvalue] = useState(0.0);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    cropper?.zoomTo(+imageonpopup.zoomvalue * 5);
    cropper?.rotate(+imageonpopup.rotate);
  }, []);

  const calCropData = (imageonpopup) => {
    if (imageonpopup.cropbox_data.naturalWidth) return {
      ...imageonpopup.cropbox_data
    }
    let left = imageonpopup.cropbox_data.left;
    let top = imageonpopup.cropbox_data.top;
    const naturalHeight = parseInt(imageonpopup.imageheight);
    const naturalWidth = parseInt(imageonpopup.imagewidth);
    const croperSize = getCropperSize();
    let rate;
    if (naturalHeight <= naturalWidth) {
      rate = croperSize / naturalHeight;
    } else {
      rate = croperSize / naturalWidth;
    }
    left = left * -rate;
    top = top * -rate;
    return {
      top,
      left,
    }
  }
  const InitialSets = (target) => {
    target?.zoomTo(+imageonpopup.zoomvalue * 5);
    target?.rotate(+imageonpopup.rotate);
    setzoomvalue(+imageonpopup.zoomvalue);
    const cropData = calCropData(imageonpopup);
    target.moveTo(cropData.left, cropData.top)
    setLoading(false)
  };
  const imageRotate = () => {
    cropper?.rotate(-90);
  };

  const getCropData = async () => {
    setLoading(true)
    if (typeof cropper !== "undefined") {
      // var cc = await cropper.getCroppedCanvas().toDataURL().toString();
      var cropbox_data = cropper.getCanvasData();
      var image_data_rotation = cropper.getImageData();
      var rotate = 0;
      if (image_data_rotation.rotate === undefined) {
        rotate = 0;
      } else {
        rotate = image_data_rotation.rotate;
      }
      console.log('crop', cropbox_data, zoomvalue);
      // return;
      //console.log(rotate);
      // let base64Image = cc.split(";base64,").pop();

      const aa = {
        uid: localstr,
        id: imageonpopup?._id,
        // base64Image: cc,
        cropbox_data: cropbox_data,
        rotate: rotate,
        zoomvalue: zoomvalue,
        defaultSize: getCropperSize(),
      };

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      axios.post(BASE_URL + "/cropped_img", aa, config).then((v) => {
        getImagesDB();
        setLoading(false)
        handleCloseModal("editImage");
      });
    }
  };

  const handleOnZoom = ({ detail }) => {
    const zoom = +(detail.ratio / 5).toFixed(2);
    if (zoom > 5) {
      return;
    } else {
      setzoomvalue(+(detail.ratio / 5).toFixed(2));
    }
  };

  const handleZoomTo = (e) => {
    setzoomvalue(+e.target.value);
    cropper?.zoomTo(+e.target.value * 5);
  };

  const zoomvalueplus = () => {
    if (zoomvalue >= 1.0) {
      return;
    } else {
      setzoomvalue((zm) => zm + 0.1);
      cropper.zoomTo((zoomvalue + 0.1) * 5);
    }
  };

  const zoomvalueminus = () => {
    if (zoomvalue < 0.1) {
      setzoomvalue(0.0);
      cropper.zoomTo(0.0);
    } else {
      setzoomvalue((zm) => zm - 0.1);
      cropper.zoomTo((zoomvalue - 0.1) * 5);
    }
  };
  const getCropperSize = () => ({
    classic: 243,
    clean: 260,
    bold: 330,
    ever: 325,
  }[modalData.frame])
  return (
    <div id="edit-modal">
    {width > 767 ?
      (<div className="edit-modal__header">
        <button onClick={() => getCropData()} className="edit">
          אישור
        </button>
        <button onClick={() => handleCloseModal("editImage")} className="close">
          <img src="assets/file/images/cross.svg" alt="close" />
        </button>
      </div>)
      : (
        <div className="edit-modal__header--mobile">
          <button onClick={() => getCropData()}>חזור <img src="assets/file/images/arrow.png" alt="arrow"/></button>
        </div>
      )}
      <div className="edit-modal__content">
        <h2>התאמת תמונה</h2>
        <p>הזיזו או הגדילו את התמונה בתוך המסגרת</p>
        <div className={`${modalData?.frame} cropper-frame`}>
          <Cropper
            ref={cropperRef}
            style={{
              height: getCropperSize(),
              width: getCropperSize(),
              transform: "rotationimage",
              margin: "0 auto",
            }}
            zoomable
            initialAspectRatio={1}
            preview=".img-preview"
            checkCrossOrigin={true}
            src={`${imageonpopup.image}`}
            viewMode={3}
            autoCropArea={1}
            guides={false}
            toggleDragModeOnDblclick
            ready={(e) => {
              InitialSets(e.target.cropper);
            }}
            dragMode="move"
            background
            responsive
            checkOrientation={false}
            zoom={handleOnZoom}
          />
        </div>
        <div className="rang_container">
          <img
            src="assets/file/images/minus_icon.svg"
            onClick={() => {
              zoomvalueminus();
            }}
            alt="minus-icon"
          />
          <input
            type="range"
            min="0"
            max=".25"
            value={zoomvalue}
            onChange={(e) => handleZoomTo(e)}
            step="0.025"
            id="zoomer"
            className="slider"
          />
          <img
            src="assets/file/images/plus_icon.svg"
            onClick={() => {
              zoomvalueplus();
            }}
            alt="plus-icon"
          />
        </div>
        {width <= 767 && (
        <button className="mobile-save-button" onClick={() => getCropData()}>
        אישור
        </button>
        )}
      </div>
      {isLoading &&
        <div
          className="modal loaderbg"
          id="mainImageLoaderModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: isLoading }}
        >
          <div className="modal-dialog review-image-loader" role="document">
            <div className="loadingio-spinner-heart-btbrqan8295">
              <div className="ldio-kv0ui0pfesk">
                <div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default EditModal;
