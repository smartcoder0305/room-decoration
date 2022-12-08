import React, { useEffect, useState, useRef, memo, useMemo } from "react";
import { useHistory } from "react-router-dom";
import cn from "classnames";
import axios from "axios";
import "cropperjs/dist/cropper.css";

import { popUpImage, imagesData } from "@atoms";
import {
  countState,
  netPriceState,
  imageCountState,
  totalPriceState,
  discountPriceState,
  discountPercentageState,
} from "@atoms/priceCalc";
import { useRecoilState } from "recoil";
import { useModal } from "@helpers/hooks/useModal";
import useWindowDimensions from "@helpers/hooks/windowDemensions";
import { removeImage, addUserCount, getImagesDB } from "@api";

import Loader from "@shared/Loader";
import "./style.css";
import { useCallback } from "react";
import FrameSelector from "./components/FrameSelector";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const MAIN_URL = process.env.REACT_APP_MAIN_URL;
const FILESTACK_APIKEY = process.env.REACT_APP_FILESTACK_APIKEY;

const filestack = require("filestack-js");

//const filestack_client = filestack.init("AbUWMKsQDSg2HbtzgqaQhz"); // Champ
const filestack_client = filestack.init(FILESTACK_APIKEY); // Client

function getFrameSelected() {
  const frameSelected = localStorage.getItem("frameSelected");
  if (!frameSelected) return "classic";
  return frameSelected;
}

const ReviewImages = () => {
  const localstr = localStorage.getItem("uniqueUserId");
  const [imageonpopup, setimageonpopup] = useRecoilState(popUpImage);
  const [images, setImages] = useRecoilState(imagesData);
  const [firstLoader, setfirstLoader] = useState("block");

  const [transac, settransac] = useState();
  const [loaderdis, setloaderdis] = useState(false);
  const [facebook_modal, setfacebook_modal] = useState("none");
  const [fbsavebtn, setfbsavebtn] = useState("none");
  const [socialopc, setsocialopc] = useState("none");

  const [facebookpic, setfacebookpic] = useState(null);
  const [fbbuttonhide, setfbbuttonhide] = useState("block");

  const [frameChoose, setFrameChoose] = useState(getFrameSelected);

  const [count, setCount] = useRecoilState(countState);
  const [netPrice, setNetPrice] = useRecoilState(netPriceState);
  const [imagecount, setImagecount] = useRecoilState(imageCountState);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [discountPrice, setDiscountPrice] = useRecoilState(discountPriceState);
  const [discountPercentage, setDiscountPercentage] = useRecoilState(
    discountPercentageState
  );
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
    const lowImage = images.find((i) => (i.imageheight < 1600 || i.imagewidth < 1600) && !i.keepImage);
    if (lowImage) {
      modal("open", "deleteConfirm", {
        data: lowImage,
        onKeepImage: (id) => keep_image(id),
        onDelete: () =>
          removeImage(lowImage._id).then(() => {
            setCount(count + 1);
            getImagesDB().then((res) => {
              if (res.data.data.length === 0) {
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

  const savetodb = (facebookpic) => {
    const localstr = localStorage.getItem("uniqueUserId");

    var indata = {
      uid: localstr,
      link: facebookpic,
    };
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    axios.post(BASE_URL + "/socialimage_upload", indata, config).then((v) => {
      closefbmodal();
      getimagesdb();
    });
  };

  const closefbmodal = () => {
    setsocialopc("none");
    setfacebook_modal("none");
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
    // modal("open", "deleteConfirm", {
    //   data: item,
    //   onDelete: () =>
    //     removeImage(id).then((v) => {
    //       setCount(count + 1);
    //       getImagesDB().then((res) => {
    //         if (res.data.data.length === 0) {
    //           history.push("/upload-your-image");
    //         }
    //       });
    //     }),
    // });
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
        <div className="album-item-wrapper">
        <div
          key={index.toString()}
          className={cn(`album-item ${frameChoose}`)}
          onClick={() => openImageOptions(im)}
        >
          {width > 767 && (
            <div className={`content-overlay ${frameChoose}`}>
              <div className="content-details fadeIn-bottom">
                <img
                  src="assets/file/images/edit_image.svg"
                  className="edit"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={() => edit_seg(im)}
                  alt="edit"
                />
                <img
                  src="assets/file/images/Delete_icon.svg"
                  className="edit"
                  alt="remove"
                  onClick={() => deleteImage(im)}
                />
              </div>
            </div>
          )}
        </div>
        <img
            src={`${im.view_image}`}
            className={cn(`img-con ${frameChoose}`)}
            alt="icon"
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

      <div className="review-images-wrapper">
        {width > 767 && (
          <div className="checkout-wrapper">
            <div className="aside-checkout">
              <h1>תונומת {imagecount} םתרחב</h1>
              <p>וודאו שהכל נראה טוב ונמשיך</p>
              <button className="checkout-btn" onClick={openCheckoutDrawer}>
                םיכישממו קילק
              </button>
              <div className="gift">
                <h2 className="">:ולבקת וז הנמזהב</h2>

                <ul className="gift-list">
                  <li>
                    שליח עד הבית
                    <img
                      style={{ width: "23px" }}
                      src="assets/file/images/gift_1.svg"
                      alt="gift"
                    />
                  </li>
                  <li>
                    החזרה מהירה בקלות
                    <img src="assets/file/images/gift_2.svg" alt="gift" />
                  </li>

                  <li>
                    תונומתה לע הרימשל הזירא
                    <img src="assets/file/images/gift_3.svg" alt="gift" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        <div className="trx">
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

          {width <= 767 && (
            <div className="additional-info-mobile">
              <img src="assets/file/images/red_check.svg" alt="check" />
              <p>החלצהב ולע תונומתה לכ</p>
              <p>תוודאו שהכל נראה טוב ונמשיך</p>
            </div>
          )}
        </div>
      </div>

      {/* Start checkout for mobile */}
      {width <= 767 && (
        <div className="mobile-checkout">
          <img
            onClick={() => showUploadOptions()}
            src="assets/file/images/file.png"
            className="file"
            alt="file-icon"
          />
          <div className="mobile-checkout-info">
            <p>
              <img src="assets/file/images/green_check.svg" alt="check" /> םניח
              חולשמל תיאכז רבכ ךלש הנמזהה
            </p>
          </div>
          <div className="mobile-checkout-button">
            <a
              href="#"
              className="site-btn"
              data-toggle="modal"
              data-target="#rescart"
              onClick={openCheckoutDrawerMobile}
            >
              המשך לרכישה ({imagecount} תמונות)
            </a>
          </div>
        </div>
      )}
      {/* End checkout for mobile */}

      <div className="body_opcy" style={{ display: socialopc }}></div>

      <div className="modal" id="myModal" style={{ display: facebook_modal }}>
        <div className="modal-dialog">
          <div className="modal-content">
            {/* {imageonpopup.image} */}
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => closefbmodal()}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 col-md-10 rect">
                    {/* <img src="assets/file/images/Rectangle.png" className="img-responsive" /> */}
                    {/* <img src={`https://stickable-admin.yeshostings.com/${imageonpopup.image}`} className="img-responsive"  style={{width:"100%"}} /> */}

                    <div className="col-md-4">
                      <img src={facebookpic} alt="fb-pic" />
                      <button
                        className="btn btn-primary"
                        style={{ display: fbsavebtn }}
                        onClick={() => {
                          savetodb(facebookpic);
                        }}
                      >
                        Save
                      </button>
                    </div>

                    <div style={{ display: fbbuttonhide }}>
                      {/* 985956638686717 */}
                      {/* <FacebookLogin
    appId="985956638686717"
    autoLoad={true}
    fields="name,email,picture,albums"
    onClick={componentClicked}
    callback={responseFacebook} /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
