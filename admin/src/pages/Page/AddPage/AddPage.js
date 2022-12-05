import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
// import "./pages.css";
import { Button } from "@mui/material";
import Sidebar from "../../../components/Sidebar";

function AddPage() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [value, setValue] = useState("");
  const [cname, setCname] = useState("");
  const [pagenumber, setPagenumber] = useState("");
  let navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const handelSubmitData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    try {
      const getPageByPageNumber = await axios.post(
        `${BASE_URL}/admin/getPageByPageNumber`,
        { pagenumber },
        config
      );
      // console.log(getPageByPageNumber.data.getPage.length === 0);
      if (getPageByPageNumber.data.getPage.length === 0) {
        const submitPage = await axios.post(
          `${BASE_URL}/admin/addPages`,
          { pname: cname, data: value ,pagenumber},
          config
        );
        if (submitPage.data.status === 200) {
          toast.success("Added Sucessfully");
        } else {
          toast.error("Somthing went wrong");
        }
      }else{
        toast.error("Page Number Already defined");
      }
    } catch (error) {}
  };

  const handelInput = (e) => {
    if (e.target.name === "cname") {
      setCname(e.target.value);
    }
  };

  return (
    <>
      <div className="App">
        <div className="AppGlass">
          <Sidebar />
          <div className="MainDash">
            <h1 className="main-Header">Add Page</h1>
            <div className="page-name-input">
              <label>Enter Page Title</label>
              <input
                type="text"
                className="form-control"
                name="cname"
                value={cname}
                onChange={(e) => {
                  handelInput(e);
                }}
              />
            </div>
            <div className="page-name-input">
              <label>Enter Page Number</label>
              <input
                type="text"
                className="form-control"
                name="cname"
                value={pagenumber}
                onChange={(e) => {
                  setPagenumber(e.target.value);
                }}
              />
            </div>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={{
                toolbar: [
                  [{ header: [] }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
                  [{ color: [] }, { background: [] }],
                  [
                    { align: "" },
                    { align: "center" },
                    { align: "right" },
                    { align: "justify" },
                  ],
                  // [],
                ],
              }}
              formats={[
                "header",
                "font",
                "size",
                "color",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
                "align",
              ]}
              style={{
                backgroundColor: "#fff",
                color: "#000",
                minHeight: "500px",
              }}
            />
            <div className="upload-page-btn">
              <Button
                variant="contained"
                component="span"
                onClick={() => {
                  handelSubmitData();
                }}
              >
                Upload
              </Button>
              <Toaster position="bottom-center" reverseOrder={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPage;
