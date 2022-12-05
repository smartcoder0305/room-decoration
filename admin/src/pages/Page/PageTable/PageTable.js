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
import { UilTrashAlt } from "@iconscout/react-unicons";
import toast, { Toaster } from "react-hot-toast";
import { UilEdit } from '@iconscout/react-unicons'
import { useState } from "react";
import { useNavigate} from "react-router-dom";

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
function PageTable() {
  const [data, setData] = useState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("userToken");
  let navigate = useNavigate();
 
  const getData = async() => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      const response=await axios.get(`${BASE_URL}/admin/getAllPages`,config);
      if(response.data.status===200){
        console.log(response.data.getPage)
        setData(response.data.getPage)
      }
    } catch (error) {
      
    }
  };
const deleteReview=async(id)=>{
let a= window.confirm("Are You Sure !");
if(a){
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    const response=await axios.post(`${BASE_URL}/admin/deletePagesById`,{pageId:id},config);

    if(response.data.status===200){
      window.location.reload()
    }


  } catch (error) {
    
  }
}
}



  useEffect(() => {
    getData();
  }, []);

  console.log(data)
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
              <TableCell>Page Title</TableCell>
              <TableCell align="left">Page Content</TableCell>
              <TableCell align="left">Page Number</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data?data.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.pname}
                </StyledTableCell>
                <StyledTableCell align="left">
                {/* {row.data} */}
                  {row.data.replace( /(<([^>]+)>)/ig, '').substring(0, 80)}
                  {row.data.length > 80 ? <>.....</> : null}
                </StyledTableCell>
                <StyledTableCell align="left">
                {/* {row.data} */}
                  {row.pagenumber}
                </StyledTableCell>
                <StyledTableCell align="left">
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    onClick={() => {
                      navigate(`/pages/editpage/${row._id}`)
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
            )):null}
          </TableBody>
        </Table>
      </TableContainer>

      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
}

export default PageTable;
