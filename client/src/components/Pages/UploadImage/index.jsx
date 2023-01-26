import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import uniqid from "uniqid";
import { uploadSingleImage, uploadMultipleImages, getImagesDB } from '@api';
import { useModal } from "@helpers/hooks/useModal";

import {
  imageCountState
} from "@atoms/priceCalc";
import {useRecoilValue} from "recoil";
import "./style.css";

const UploadImage = () => {
  const storedValues = localStorage.getItem("uniqueUserId");
  const imagecount = useRecoilValue(imageCountState);

  const [deskbody_opcy, setdeskbody_opcy] = useState();
  const [showSpinner, setshowSpinner] = useState(false);
  let history = useHistory();
  const modal = useModal();


  //////////////  Choosing Frame   /////////////

  useEffect(() => {
    setshowSpinner(true);
    async function initiateData() {
      await getImagesDB();
      setshowSpinner(false);
    }
    initiateData();
  }, []);

  const opcy_desh_click = () => {
    setdeskbody_opcy("none");
  };

  const upload = (e) => {
    console.log('####################')
    if (e.type === "click") {
      openUploadMenu();
      return;
    } else {
      console.log('####################', imagecount + e.target.files.length)
      if (imagecount + e.target.files.length > 30) {
        alert("Image limit over. Max uploaded image 20");
        modal('hide', 'uploadOptions');
        return;
      }
      setshowSpinner(true);
      const uid = uniqid();
      const formdata = new FormData();
      localStorage.setItem("uniqueUserId", uid);
      if (e.target.files.length === 1) {
        let img = document.createElement("img");
        img.src = URL.createObjectURL(e.target.files[0]);
        img.onload = function () {
          formdata.append("image", e.target.files[0]);
          formdata.append("uid", uid);
          formdata.append("imagewidth", img.width);
          formdata.append("imageheight", img.height);
          formdata.append("imageext", 0);

          uploadSingleImage(formdata)
            .then(() => {
              setshowSpinner(false);
              history.push("/review-your-images");
            })
        };
      } else {
        for (let i = 0; i < e.target.files.length; i++) {
          let files = e.target.files[i];
          let img = document.createElement("img");
          img.src = URL.createObjectURL(files);
          img.onload = function () {
            
          };
          formdata.append("imagewidth", img.width);
          formdata.append("imageheight", img.height);
          formdata.append("imageext", 0);
          formdata.append("image", files);
          formdata.append("uid", uid);
        }

        for (var key of formdata.entries()) {
          console.log(key[0] + ", " + key[1]);
        }

        uploadMultipleImages()
          .then(() => {
            history.push("/review-your-images");
          })
      }
    }
  };

  const openUploadMenu = () => {
    modal("open", "uploadOptions", {}, 400);
  };
  return (
    <>
      {/* <HeaderEle /> */}
      <div
        className="body_opcyyy"
        style={{ display: deskbody_opcy }}
        onClick={() => {
          opcy_desh_click();
        }}
      ></div>
      <div className="desk-up">
        {!showSpinner ? (
          <div className="form-upload">
            <div className="form-area-upload">
              <input
                type="file"
                accept="image/*"
                className="file-input finputupload fpu"
                multiple
                name="file"
                onChange={(e) => upload(e)}
                onClick={(e) => { upload(e); e.preventDefault()}}
                style={{ zIndex: "1", height: "100% !important" }}
              />
              <button>
                <img src="/assets/file/images/plus.svg" alt="plus" />
              </button>
              <h2>גררו את התמונות לכאן</h2>
              <p>הזמנה ממוצעת מכילה כ8 תמונות</p>
            </div>
          </div>
        ) : (
          <>
            <div className="container d-flex justify-content-center mt-100 uploader-sec mb-5 pb-5">
              <div className="row justify-content-center">
                <div className="col-md-12 " style={{ cursor: "pointer" }}>
                  <div className="">
                    <div className="loadingio-spinner-heart-btbrqan8295">
                      <div className="ldio-kv0ui0pfesk">
                        <div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UploadImage;
