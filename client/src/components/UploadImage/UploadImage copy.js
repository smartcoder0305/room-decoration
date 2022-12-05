import React, { useState } from "react";
import axios from "axios";
import HeaderEle from "./HeaderEle";
import uniqid from "uniqid";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const UploadImage = () => {
  const [body_opcy, setbody_opcy] = useState();
  const [deskbody_opcy, setdeskbody_opcy] = useState();
  const [mob_hob, setmob_hob] = useState("none");
  const [modal_showhide, setmodal_showhide] = useState("none");
  const [framechoose, setframechoose] = useState("classic");

  //////////////  Choosing Frame   /////////////

  const framechoose_set = (frame) => {
    setframechoose(frame);
  };

  const open_desktop_popup = () => {
    setmodal_showhide("block");
    setdeskbody_opcy("block");
  };

  const opcy_desh_click = () => {
    setmodal_showhide("none");
    setdeskbody_opcy("none");
  };

  const mobile_file_click = () => {
    setmob_hob("block");
    setbody_opcy("block");
  };
  const opcy_click = () => {
    setmob_hob("none");
    setbody_opcy("none");
  };
  const upload = (e) => {
    const uid = uniqid();
    const formdata = new FormData();
    localStorage.setItem("uniqueid", uid);
    localStorage.setItem("defaultframeset", framechoose);
    console.log(e.target.files.length);

    if (e.target.files.length === 1) {
      var img = document.createElement("img");
      img.src = URL.createObjectURL(e.target.files[0]);
      img.onload = function () {
        // console.log(img.height);
        // console.log(img.width);

        formdata.append("image", e.target.files[0]);
        formdata.append("uid", uid);
        formdata.append("imagewidth", img.width);
        formdata.append("imageheight", img.height);
        formdata.append("imageext", 0);

        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        //https://stickable-admin.yeshostings.com/api/imageupload_single
        axios
          .post(BASE_URL + "/imageupload_single", formdata, config)
          .then((res) => {
            window.location.href = "/uploadedimages";
          })
          .catch((err) => {});
      };
    } else {
      if (e.target.files.length > 20) {
        alert("Image limit over. Max uploaded image 20");
      } else {
        for (var i = 0; i < e.target.files.length; i++) {
          var files = e.target.files[i];
          // console.log(files);
          var img = document.createElement("img");
          console.log(img);
          img.src = URL.createObjectURL(files);
          img.onload = function () {
            console.log(img.height);
            console.log(img.width);

            // console.log(files);
          };
          formdata.append("imagewidth", img.width);
          formdata.append("imageheight", img.height);
          formdata.append("imageext", 0);
          formdata.append("image", files);
          formdata.append("uid", uid);
        }

        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        for (var key of formdata.entries()) {
          console.log(key[0] + ", " + key[1]);
        }

        axios
          .post(BASE_URL + "/imageupload", formdata, config)
          .then((res) => {
            window.location.href = "/uploadedimages";
          })
          .catch((err) => {});
      }
    }
  };

  return (
    <>
      <HeaderEle />
      <div
        className="body_opcyyy"
        style={{ display: deskbody_opcy }}
        onClick={() => {
          opcy_desh_click();
        }}
      ></div>
      <div className="desk-up">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 px-0">
              <div className="unknownTab">
                <ul className="m-0 p-0 d-flex justify-content-center">
                  <li
                    className={framechoose ? "classic" : "last"}
                    onClick={() => {
                      framechoose_set("classic");
                    }}
                  >
                    <img
                      src="assets/file/images/d1.png"
                      alt="img"
                      className="w-100"
                    />
                    <p>יסאלק </p>
                    {/* <a href="#">יראלופופ</a> */}
                  </li>
                  <li
                    className={framechoose ? "bold" : "last"}
                    onClick={() => {
                      framechoose_set("bold");
                    }}
                  >
                    <img
                      src="assets/file/images/d2.png"
                      alt="img"
                      className="w-100"
                    />
                    <p>זעונ</p>
                    {/* <a href="#">יראלופופ</a> */}
                  </li>
                  <li
                    className={framechoose ? "ever" : "last"}
                    onClick={() => {
                      framechoose_set("ever");
                    }}
                  >
                    <img
                      src="assets/file/images/d3.png"
                      alt="img"
                      className="w-100"
                    />
                    <p>יקנ </p>
                    {/* <a href="#">יראלופופ</a> */}
                  </li>
                  <li
                    className={framechoose ? "clean" : "last"}
                    onClick={() => {
                      framechoose_set("clean");
                    }}
                  >
                    <img
                      src="assets/file/images/d4.png"
                      alt="img"
                      className="w-100"
                    />
                    <p>יטנתוא</p>
                    {/* <a href="#">יראלופופ</a> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <form>
          <input
            type="file"
            accept="image/*"
            className="file-input finputupload fpu"
            multiple
            name="file"
            onChange={(e) => {
              upload(e);
            }}
            style={{ zIndex: "1", height: "100% !important" }}
          />
          <div className="container d-flex justify-content-center mt-100 uploader-sec mb-5 pb-5">
            <div className="row justify-content-center">
              <div
                className="col-md-12 drop-image-upload"
                style={{ cursor: "pointer" }}
              >
                <div className="file-drop-area">
                  <h2>גררו את התמונות לכאן</h2>
                  <p>השתדלו להשתמש בתמונות גדולות</p>
                  <p></p>
                  {/* <input type="file" className="file-input finputupload fpu" multiple name="file" onChange={(e) => this.upload(e)} style={{zIndex:'999',height:"100% !important"}} /> */}

                  {/* <input className="file-input" onChange={(e)=>this.upload(e)} type="file" multiple defaultValue="file" /> */}
                  <p></p>
                  <img
                    src="assets/file/images/save.png"
                    alt="img"
                    className="w-25"
                    style={{ marginTop: "-30px" }}
                  />
                </div>
              </div>
              <div className="col-md-12 mt-4 text-center">
                <p className="text-side-arrow">או לחצו</p>
                <div className="checkout-btn ckout">
                  {/* <input className="inp" type="file" defaultValue="ונומת שופיח "  /> */}
                </div>
                <button className="checkout-btn ckout">חיפוש תמונות</button>
              </div>
            </div>
          </div>
        </form>

        {/* deskbody_opcy */}
        {/* <div className="modal" id="myModal" style={{display:modal_showhide}}>
    <div className="modal-dialog" style={{maxWidth:"300px", top:"38%"}}>
      <div className="modal-content">
      
     
        <div className="modal-header">
        <h4>Image</h4>
          <button type="button" className="close" data-dismiss="modal" onClick={()=>{opcy_desh_click()}}>&times;</button>
        </div>
        
      
        <div className="modal-body">

            <div className="container">
                <div className="row">
                    
                    <div className="col-md-12 col-md-10 rect">
                        <div className="hovr-sec">
                        <p>
                    <input type="file"  accept="image/*" className="file-input" multiple name="file" onChange={(e) => {upload(e)}} style={{zIndex:'999', height:"100% !important"}} />
                        <img src="assets/images/photo-gallery.png" alt="" />&nbsp; &nbsp;Upload Photos</p>
                    <p><img src="assets/images/facebook.png" alt="" />&nbsp; &nbsp;Import From Facebook</p>
                    <p><img src="assets/images/instagram.png" alt="" />&nbsp; &nbsp;Import From Instagram</p>
                    </div>
                    </div>
                    
                </div>
                
               
            </div>
        </div>        
      </div>
    </div>
  </div> */}

        {/* <div className="row justify-content-center d-flex">
                                    <div className="col-md-6">
                                        <div className="fbsec">
                                        <p><img src="assets/images/facebook.png" alt="" />&nbsp; &nbsp;Import From Facebook</p>
                    
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    <p><img src="assets/images/instagram.png" alt="" />&nbsp; &nbsp;Import From Instagram</p>
                                    </div>

                                </div>   */}
      </div>
      <div className="mob-up">
        <div
          className="body_opcyy"
          style={{ display: body_opcy }}
          onClick={() => {
            opcy_click();
          }}
        ></div>

        <div className="fake-file">
          <input
            type="file"
            className="file-input finputupload fpu"
            multiple
            name="file"
            onChange={(e) => {
              upload(e);
            }}
            style={{ zIndex: "999", height: "100% !important" }}
          />

          {/* <img src="assets/file/images/file.png" alt="img" onClick={()=>{mobile_file_click()}} /> */}
          <img
            src="assets/file/images/file.png"
            alt="img"
            onClick={() => {
              mobile_file_click();
            }}
          />
          <p>ליחתנו תונומתה תא ורחב</p>
        </div>

        <div className="bottom-pop" style={{ display: mob_hob }}>
          <div className="hovr-sec">
            <p>
              <input
                type="file"
                className="file-input"
                multiple
                name="file"
                onChange={(e) => {
                  upload(e);
                }}
                style={{ zIndex: "999", height: "100% !important" }}
              />
              <img src="assets/images/photo-gallery.png" alt="" />
              &nbsp; &nbsp;Choose From Your Phone
            </p>
            <p>
              <img src="assets/images/facebook.png" alt="" />
              &nbsp; &nbsp;Import From Facebook
            </p>
            <p>
              <img src="assets/images/instagram.png" alt="" />
              &nbsp; &nbsp;Import From Instagram
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
