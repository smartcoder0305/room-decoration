import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import cn from "classnames";
import axios from "axios";
import "cropperjs/dist/cropper.css";

import { popUpImage, imagesData } from "@atoms";
import {
  countState,
  imageCountState,
} from "@atoms/priceCalc";
import { useRecoilState } from "recoil";
import { useModal } from "@helpers/hooks/useModal";
import useWindowDimensions from "@helpers/hooks/windowDemensions";
import { removeImage, addUserCount, getImagesDB } from "@api";

import Loader from "@shared/Loader";
import "./style.css";
import { useCallback } from "react";
import FrameSelector from "./components/FrameSelector";
import ImageLoader from "@shared/ImageLoader";
import ShippingIcon from "./components/ShippingIcon";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function getFrameSelected() {
  const frameSelected = localStorage.getItem("frameSelected");
  if (!frameSelected) return "classic";
  return frameSelected;
}

const ReviewImages = () => {
  const [imageonpopup, setimageonpopup] = useRecoilState(popUpImage);
  const [images, setImages] = useRecoilState(imagesData);
  const [firstLoader, setfirstLoader] = useState("block");

  const [transac, settransac] = useState();
  const [loaderdis, setloaderdis] = useState(false);
  const [socialopc, setsocialopc] = useState("none");


  const [frameChoose, setFrameChoose] = useState(getFrameSelected);

  const [count, setCount] = useRecoilState(countState);
  const [imagecount, setImagecount] = useRecoilState(imageCountState);

  const { height, width } = useWindowDimensions();
  let history = useHistory();
  const modal = useModal();
  const setFrameSelected = (frame) => {
    localStorage.setItem("frameSelected", frame);
    setFrameChoose(frame);
  };
  const storagedata = localStorage.getItem("uniqueUserId");
  if (!storagedata) {
    history.push("/");
  }

  const keep_image = (id) => {
    axios.put(BASE_URL + "/image_keep/" + id).then((v) => {
      console.log("keep_image")
    });
  };

  useEffect(() => {
    setloaderdis(true);
    getimagesdb();
    addUserCount();
  }, []);

  useEffect(() => {
    console.log("low image");
    const lowImage = images.find((i) => (i.imageheight < 800 || i.imagewidth < 800) && !i.keepImage);
    console.log(lowImage);  
    if (lowImage) {
      modal("open", "deleteConfirm", {
        data: lowImage,
        onKeepImage: (id) => keep_image(id),
        onDelete: () =>
          removeImage(lowImage._id).then(() => {
            setCount(count + 1);
            getImagesDB().then((res) => {
              if (res.data.data.length === 0) {
                localStorage.setItem('dataExist', 0);
                history.push("/upload-your-image");
              }
            });
          }),
      });
    }
  }, [images]);

  const edit_seg = (e) => {
    setimageonpopup(e);

    modal("open", "editImage", { frame: frameChoose });
  };

  const getimagesdb = () => {
    getImagesDB().then((res) => {
      setfirstLoader("none");
      settransac("none");
      setloaderdis(false);
    });
  };



  const deleteImage = (item) => {
    const id = item._id;
    removeImage(id).then((v) => {
      setCount(count + 1);
      getImagesDB().then((res) => {
        if (res.data.data.length === 0) {
          history.push("/upload-your-image");
        }
      });
    });
  };

  const frameSelected = async (type) => {
    setFrameSelected(type);
    const userid = localStorage.getItem("uniqueUserId");

    const response = await axios.post(
      BASE_URL + "/frameselected",
      {
        userid,
        type,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    console.log(response);
  };

  const showUploadOptions = () => {
    modal("open", "uploadOptions", {}, 400);
  };

  const openImageOptions = (img) => {
    if (width > 767) return;
    modal("open", "imageOptions", {
      editImage: () => edit_seg(img),
      deleteImage: () => deleteImage(img),
    });
  };

  const openCheckoutDrawer = () => {
    modal("open", "checkout");
  };

  const openCheckoutDrawerMobile = () => {
    modal("open", "mobileCheckout");
  };



  const renderImages = useCallback(() => {

    return images.map((im, index) => {
      return (
        <div className="album-item-wrapper" key={index.toString()}>
        <div
          className={cn(`album-item ${frameChoose}`)}
          onClick={() => openImageOptions(im)}
        >
          {width > 767 && (
            <div className={`content-overlay ${frameChoose}`}>
              <div className="content-details fadeIn-bottom">
                <img
                  src="/assets/file/images/edit_image.svg"
                  className="edit"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={() => edit_seg(im)}
                  alt="edit"
                />
                <img
                  src="/assets/file/images/Delete_icon.svg"
                  className="edit"
                  alt="remove"
                  onClick={() => deleteImage(im)}
                />
              </div>
            </div>
          )}
        </div>
        <ImageLoader
          src={im.view_image}
          className={cn(`img-con ${frameChoose}`)}
          alt="icon"
          shadow={true}
        />
        </div>
      );
    });
  }, [images, frameChoose, deleteImage, edit_seg]);

  return (
    <>
      {/* Start frame section */}
      <div className="uploaded_img_pg">
        <FrameSelector
          frameChoose={frameChoose}
          frameSelected={frameSelected}
        />
      </div>
      {/* End frame section */}

      <div className="review-images-wrapper"  style={{maxHeight: width < 768 ? height - 305 : null}}>
        {width > 767 && (
          <div className="checkout-wrapper">
            <div className="aside-checkout">
              {imagecount > 2 && 
                <>
                  <h1>יש לנו כאן {imagecount} תמונות</h1>
                  <p>וודאו שהכל נראה טוב ונמשיך</p>
                </>
              }
              {imagecount === 2 && 
                <>
                  <h1>יש לנו כאן {imagecount} תמונות</h1>
                  <p><ShippingIcon />&nbsp;&nbsp;&nbsp;תוסיפו עוד תמונה אחת וקבלו משלוח חינם
                  
                  </p>
                </>
              }
              {imagecount === 1 && 
                <>
                  <h1>יש לנו כאן רק תמונה אחת</h1>
                  <p><ShippingIcon />&nbsp;&nbsp;&nbsp; תוסיפו עוד 2 תמונות וקבלו משלוח חינם</p>
                </>
              }
              {imagecount === 0 &&
                <>
                  <h1>אין לנו כאן תמונות</h1>
                  <p>נסו לחזור אחורה ולהתחיל שוב או דווחו לנו</p>
                </>
              }
              {imagecount === 0 &&
                <button className="checkout-btn" onClick={showUploadOptions} style={{width: "auto"}}>
                  בחירת תמונות חדשות
                </button>
              }
              {imagecount >= 1 && imagecount <= 2 &&
                <>
                  <button className="checkout-btn" onClick={openCheckoutDrawer}>
                    קליק וממשיכים
                  </button>
                  <br /><br/>
                  <p>עלות משלוח: 29.90</p>
                </>
              }
              {imagecount > 2 &&
                <>
                  <button className="checkout-btn" onClick={openCheckoutDrawer}>
                   קליק וממשיכים
                  </button>
                  <br /><br />
                  <p style={{color: "#087E63"}}><img src="/assets/file/images/emoji-normal.png" alt="" />&nbsp; ההזמנה עומדת בתנאים למשלוח חינם</p>
                </>
              }
              <div className="gift">
                <h2 className="">:בהזמנה זו תקבלו</h2>

                <ul className="gift-list">
                  <li>
                  שליח עד הבית
                    <img
                      style={{ width: "23px" }}
                      src="/assets/file/images/truck-tick.png"
                      alt="gift"
                    />
                  </li>
                  <li>
                  החזרה מהירה בקלות
                    <img src="/assets/file/images/3d-rotate.png" alt="gift" />
                  </li>

                  <li>
                  תונומתה לע הרימשל הזירא
                    <img src="/assets/file/images/bag-happy.png" alt="gift" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        <div className="trx" style={ width < 767 ? {display: "flex", alignItems: "center", height: `calc(${height}px - 305px)`, paddingTop: "0px"} : null}>
          <div
            className={cn("my-album", { single: images.length <= 1 })}
            style={{
              gridTemplateColumns:
                width <= 767 ? `repeat(${images.length}, 250px)` : null,
            }}
          >
            {renderImages()}

            {loaderdis && <Loader />}
            <div
              className="add-photo-to-album"
              onClick={() => showUploadOptions()}
            ></div>
          </div>
        </div>
      </div>

      {/* Start checkout for mobile */}
      {width <= 767 && (
        <div className="mobile-checkout">
          <img
            onClick={() => showUploadOptions()}
            src="/assets/file/images/file.png"
            className="file"
            alt="file-icon"
          />
          <div className="mobile-checkout-info">
          {imagecount >= 3 &&
            <p>
              <img src="/assets/file/images/emoji-normal.png" alt="check" style={{width: "20px"}}/>&nbsp;&nbsp; ההזמנה עומדת בתנאים למשלוח חינם
            </p>
          }
          {imagecount === 2 &&
            <p style={{color: "#727272"}}>
              <ShippingIcon />&nbsp;&nbsp; תוסיפו עוד תמונה אחת וקבלו משלוח חינם
            </p>
          }
          {imagecount === 1 &&
            <p style={{color: "#727272"}}>
              <ShippingIcon />&nbsp;&nbsp; תוסיפו עוד 2 תמונות וקבלו משלוח חינם
            </p>
          }
          </div>
          <div className="mobile-checkout-button" style={{margin: "0", width: "100%"}}>
            {imagecount === 0 &&
              <a
                href="#"
                className="site-btn"
                data-toggle="modal"
                data-target="#rescart"
                onClick={showUploadOptions}
                style={{padding: "10px 20px", width: "92%", margin: "0"}}
              >
                בחירת תמונות חדשות
              </a>
            }
            {imagecount >= 1 &&
              <a
                href="#"
                className="site-btn"
                data-toggle="modal"
                data-target="#rescart"
                onClick={openCheckoutDrawerMobile}
                style={{padding: "10px 20px", width: "92%", margin: "auto"}}
              >
                נמשיך עם - {imagecount} תמונות
              </a>
            }
          </div>
        </div>
      )}
      {/* End checkout for mobile */}

      <div className="body_opcy" style={{ display: socialopc }}></div>

      {setfirstLoader ? (
        <div
          className="modal loaderbg"
          id="mainImageLoaderModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: firstLoader }}
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
      ) : (
        <></>
      )}
    </>
  );
};

export default ReviewImages;
