import React, { useEffect } from "react";
import cn from 'classnames';
import { useModal } from '@helpers/hooks/useModal';
import { useHistory } from "react-router-dom";
import uniqid from "uniqid";
import {
  uploadSingleImage,
  uploadMultipleImages,
  addImageFromSocial,
  } from '@api';
import {
  imagesData,
} from "@atoms";
import {
  imageCountState
} from "@atoms/priceCalc";

import { useRecoilState, useRecoilValue} from "recoil";
import "./style.css";

const UploadOptions = ({
  isOpen,
  style
}) => {
  const [images, setImages] = useRecoilState(imagesData);
  const imagecount = useRecoilValue(imageCountState);

  const modal = useModal();
  const filestack = require("filestack-js");
  const history = useHistory();
  const FILESTACK_APIKEY = process.env.REACT_APP_FILESTACK_APIKEY;
  const filestack_client = filestack.init(FILESTACK_APIKEY); // Client
  let uid;
  const userId = localStorage.getItem('uniqueUserId');
  if (typeof userId === 'object') { 
    uid = uniqid();
    localStorage.setItem("uniqueUserId", uid);
  } else {
    uid = localStorage.getItem("uniqueUserId");

  }
  const hideUploadOptions = () => {
    modal('hide', 'uploadOptions', {}, 300)
  }

  const uploadFromFile = (e) => {
    console.log('@@@@@@@@@@@@@@@@@@@', imagecount + e.target.files.length)
    if (imagecount + e.target.files.length > 30) {
      alert("Image limit over. Max uploaded image 20");
      modal('hide', 'uploadOptions');
      return;
    }
    modal('open', 'imageLoader');

    const formdata = new FormData();
    const frametype = localStorage.getItem("frameSelected");
    // const img = new Image();

    if (e.target.files.length === 1) {
      let img = document.createElement("img");
      // const newFile = new File([e.target.files[0]], 'newfile.jpg');
      const newFile = e.target.files[0];
      
      img.src = URL.createObjectURL(newFile);

      img.onload = function () {
        formdata.append("image", newFile);
        formdata.append("uid", uid);
        formdata.append("imagewidth", img.width);
        formdata.append("imageheight", img.height);
        formdata.append("imageext", 0);
        formdata.append("frametype", frametype);

        uploadSingleImage(formdata)
          .then((res) => {
            console.log(res);
              modal('hide', 'imageLoader')
              hideUploadOptions();
              history.push("/review-your-images");
          })
          .catch((err) => {});
      };
    } else {
      // console.log(e.target);
      let promises = [];
      for (let i = 0; i < e.target.files.length; i++) {
      
        promises.push(new Promise((res, rej)=>{
          let files = e.target.files[i];
          let img = document.createElement("img");
          img.src = URL.createObjectURL(files);
            img.onload = function () {
              formdata.append("imagewidth", img.width);
              formdata.append("imageheight", img.height);
              formdata.append("imageext", 0);
              formdata.append("image", files);
              formdata.append("uid", uid);
              formdata.append("frametype", frametype);
              formdata.append("source", '151122');
              res();
            };
        }))       
      }

      //https://stickable-admin.yeshostings.com
      Promise.all(promises).then(()=>uploadMultipleImages(formdata)
        .then((res) => {
          setTimeout(() => {
            modal('hide', 'imageLoader')
            hideUploadOptions();
            history.push("/review-your-images");
          }, 200);
        }));
    }
  }; 

  const uploadOptions = {
    accept: ["image/*"],
    maxFiles: 30 - imagecount,
    uploadInBackground: false,
    onUploadDone: async (res) => {
      res.uid = uid;
      modal('open', 'imageLoader');
      await addImageFromSocial(res);
      modal('hide', 'imageLoader');
      hideUploadOptions();
      history.push("/review-your-images");
    },
  };

  const facebookPhotoImport = () => {
    const options = {
      fromSources: ["facebook"],
      ...uploadOptions
    }
    modal('hide', 'imageLoader')
    filestack_client.picker(options).open();
  };

  const instagramPhotoImport = () => {
    const options = {
      fromSources: ["instagram"],
      ...uploadOptions
    };
    modal('hide', 'imageLoader')
    filestack_client.picker(options).open();
  };

  return (
    <div className={cn("upload-options", { open: isOpen })} style={{...style }} >
  <div className="upload-options__item" style={{fontWeight: "700"}}>
    העלאת תמונות <img src="/assets/file/images/upload-file.svg" alt="file" />
    {isOpen && <input
      className="file-input"
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => uploadFromFile(e)}
    />}
  </div>
  <button onClick={() => facebookPhotoImport()} className="upload-options__item" style={{color: "black", fontWeight: "700"}}>
    ייבוא מהפייסבוק <img src="/assets/file/images/upload-fb.svg" alt="facebook" />
  </button>
  <button onClick={() => instagramPhotoImport()} className="upload-options__item" style={{color: "black", fontWeight: "700"}}>
    ייבוא מהאינסטגרם <img src="/assets/file/images/upload-inst.svg" alt="instagram" />
  </button>
</div>
  );
};

export default UploadOptions;
