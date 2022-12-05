import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import PageTable from "./PageTable/PageTable";
import './page.css'

function Page() {

  const navigate = useNavigate();


  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="MainDash">
          <h1 className="main-Header">Pages</h1>
       <Button
          variant="contained"
          className="add-page-button"
            onClick={() => {
              navigate("/pages/addnewpage");
            }}
          >
            Add New Page
          </Button>
          <PageTable /> 
        </div>
      </div>
    </div>
  );
}

export default Page;
