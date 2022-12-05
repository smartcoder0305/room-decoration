import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import { UilTrashAlt,UilEdit } from "@iconscout/react-unicons";
import toast, { Toaster } from "react-hot-toast";
import EditReview from "../EditReview/EditReview";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ReviewsTable() {
  const [reviewData, setReviewData] = React.useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const MAIN_URL = process.env.REACT_APP_MAIN_URL;
  const token = localStorage.getItem("userToken");
  let navigate = useNavigate();

  const getReview = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/admin/setting/getreview`,
        config
      );
      if (response.data.status === 200) {
        console.log(response.data.dataRes);
        setReviewData(response.data.dataRes);
      }
    } catch (error) {}
  };

  const deleteReview = async (id) => {
   let isDelete=window.confirm()
   if(isDelete){
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/admin/setting/deletereview`,
        { id },
        config
      );
      if (response.data.status === 200) {
        toast.success("Deleted Sucessfully");
        window.location.reload();
      }
    } catch (error) {}
   }
  };

  const EditReview=(id)=>{
    navigate(`/settings/editreview/${id}`)
  }

  useEffect(() => {
    getReview();
  }, []);

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table
          sx={{ minWidth: 650 }}
          //  aria-label="simple table"
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell align="left">Review</TableCell>
              <TableCell align="left">Review Image</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviewData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.customerName}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.review.substring(0, 80)}
                  {row.review.length > 80 ? <>.....</> : null}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <img className="review-images" src={`${MAIN_URL}${row.image}`} />
                </StyledTableCell>
                <StyledTableCell align="left">
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    onClick={() => {
                     EditReview(row._id)
                    }}
                    component="span"
                  >
                    <UilEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    aria-label="upload picture"
                    onClick={() => {
                      deleteReview(row._id);
                    }}
                    component="span"
                  >
                    <UilTrashAlt />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
}

export default ReviewsTable;
