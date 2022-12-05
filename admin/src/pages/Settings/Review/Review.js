import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import ReviewsTable from "./ReviewTable/ReviewsTable";
import { UilPlusCircle } from "@iconscout/react-unicons";
import './review.css'

function Review() {
  const navigate = useNavigate();
  function redirectToAddreview() {
    navigate("/settings/addreview");
  }
  return (
    <>
      <div>
        <Button
          variant="contained"
          endIcon={<UilPlusCircle />}
          style={{marginBottom:"25px"}}
          onClick={()=>redirectToAddreview()}
        >
          Add Review
        </Button>
      </div>
      <ReviewsTable />
    </>
  );
}

export default Review;
