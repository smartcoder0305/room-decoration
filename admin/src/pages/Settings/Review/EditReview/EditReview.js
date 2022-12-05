import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Sidebar from "../../../../components/Sidebar";

function EditReview() {
  const [cname, setCname] = useState("");
  const [review, setReview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("userToken");
  const params = useParams();
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

  const updateReview = async () => {
    try {
      if (!selectedImage) {
        console.log("image nhi he");
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        };

        const response = await axios.post(
          `${BASE_URL}/admin/setting/updatereviewbyid/withoutimage`,
          { rid: params.rid, cname, review },
          config
        );
        if (response.data.status === 200) {
          toast.success("Update Sucessfully");
        } else {
          toast.error("Something went wrong");
        }
      } else {
        console.log("image he");
        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("rid", params.rid);
        formData.append("cname", cname);
        formData.append("review", review);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            authorization: token,
          },
        };
       
        const response = await axios.post(
          `${BASE_URL}/admin/setting/updatereviewbyid/withimage`,
          formData,
          config
        );
        console.log(response.data)
        if (response.data.status === 200) {
          toast.success("Added Sucessfully");
        } else {
          toast.error("Something went wrong");
        }
   
      }

    } catch (error) {}
  };

  const getReviewData = async (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${BASE_URL}/admin/setting/getreviewById`,
      { rid: id },
      config
    );
    if (response.data.status === 200) {
      console.log(response.data.dataRes);
      setCname(response.data.dataRes.customerName);
      setReview(response.data.dataRes.review);
    }
  };

  useEffect(() => {
    getReviewData(params.rid);
  },[]);

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="MainDash">
          <h1 className="main-Header">Edit Review</h1>
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
            <label className="form-label" style={{ marginBottom: "15px" }}>
              Add Images
            </label>
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

            <Button variant="contained" onClick={() => updateReview()}>
              Add Review
            </Button>

            <Toaster position="bottom-center" reverseOrder={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditReview;
