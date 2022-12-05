import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
// import "./pages.css";
import { Button } from "@mui/material";
import Sidebar from "../../../components/Sidebar";
// import '../page.css'

function EditPage() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [value, setValue] = useState("");
  const [cname, setCname] = useState("");
  const [pagenumber, setPagenumber] = useState("");
  const [pageId,setPageId]= useState("");
  let navigate = useNavigate();
  const params = useParams();
  const token = localStorage.getItem("userToken");
  const handelSubmitData = async (id) => {
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
      console.log('hi')
      if (getPageByPageNumber.data.getPage.length === 0 || getPageByPageNumber.data.getPage[0]._id===pageId) {
      const submitPage = await axios.post(
        `${BASE_URL}/admin/updatePagesById`,
        {pageId:id, pname: cname, data: value ,pagenumber},
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

  const getData = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      const getPage=await axios.post(`${BASE_URL}/admin/getPagesById`,{pageId:id},config);
      
      if(getPage.data.status===200){
        console.log(getPage.data.getPage.data)
        setValue(getPage.data.getPage.data)
        setCname(getPage.data.getPage.pname)
        setPagenumber(getPage.data.getPage.pagenumber)
        setPageId(getPage.data.getPage._id)
      }
    } catch (error) {}
  };

  useEffect(()=>{
    getData(params.pid)
  },[])
  return (
    <>
      <div className="App">
        <div className="AppGlass">
          <Sidebar />
          <div className="MainDash">
          <h1 className='main-Header'>Edit Page</h1>
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
                  handelSubmitData(params.pid);
                }}
              >
                Update Page
              </Button>
              <Toaster position="bottom-center" reverseOrder={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPage;
