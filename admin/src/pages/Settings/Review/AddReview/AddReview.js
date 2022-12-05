import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "../../../../components/Sidebar";
function AddReview() {
  const [cname, setCname] = useState("");
  const [review, setReview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("userToken");
  const handelInput = (e) => {
    console.log(e.target.name);
    if (e.target.name === "cname") {
      setCname(e.target.value);
    }
    if (e.target.name === "review") {
      setReview(e.target.value);
    }
    if (e.target.name === "image") {
      setSelectedImage(e.target.files[0]);
    }
  };

  const addReview = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("cname", cname);
      formData.append("review", review);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          authorization: token,
        },
      };
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }
      const response = await axios.post(
        `${BASE_URL}/admin/setting/addreview`,
        formData,
        config
      );
      if (response.data.status === 200) {
        toast.success("Added Sucessfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {}
  };

  console.log(selectedImage);
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="MainDash">
          <h1 className="main-Header">Add Review</h1>
          <div className="review-section-form">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              name="cname"
              value={cname}
              onChange={(e) => {
                handelInput(e);
              }}
            />
            <label>Review</label>
            <textarea
              className="addreview-textarea-style"
              rows="10"
              name="review"
              value={review}
              onChange={(e) => {
                handelInput(e);
              }}
            ></textarea>
            <label className="form-label" style={{marginBottom:'15px'}}>Add Images</label>
            <br />
            <input
              type="file"
              name="image"
              className="review-add-review-image"
              onChange={(e) => {
                handelInput(e);
              }}
            />
            <br />

            <Button variant="contained" onClick={() => addReview()}>
              Add Review
            </Button>

            <Toaster position="bottom-center" reverseOrder={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReview;
