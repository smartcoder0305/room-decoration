import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Header from "./FooterComponents/Header";
import "./footerpage.css";

function Window() {
  const [value, setValue] = useState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const params = useParams();
  const getPage = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${BASE_URL}/admin/getPagesById`,
        { pageId: id },
        config
      );

      if (response.data.status === 200) {
        console.log(response.data.getPage);
        setValue(response.data.getPage);
      }
    } catch (error) {}
  };
  useEffect(() => {
    console.log(params.pid);
    getPage(params.pid);
  }, []);

  return (
    <>
      {value ? (
        <>
          <Header name={value.pname} />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div style={{ marginTop: "55px" }}></div>
                <div class="text_area">
                  <div className="ql-editor">
                    <div dangerouslySetInnerHTML={{ __html: value.data }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>We Publish Page Soon......</h1>
        </>
      )}
      <div class="button_bx">
        <NavLink to="/" class="site-whtbtn">
          יקוא
        </NavLink>
      </div>
    </>
  );
}

export default Window;
