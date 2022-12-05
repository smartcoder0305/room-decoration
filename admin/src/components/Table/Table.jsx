import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";


function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

// const rows = [
//   createData("John Doe 1", 18908424, "2 March 2022", "Approved"),
//   createData("John Doe 2", 18908424, "2 March 2022", "Pending"),
//   createData("John Doe 3", 18908424, "2 March 2022", "Approved"),
//   createData("John Doe 4", 18908421, "2 March 2022", "Delivered"),
// ];




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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const makeStyle = (status) => {
  if (status === 'Approved') {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if (status === 'Pending') {
    return {
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else {
    return {
      background: '#59bfff',
      color: 'white',
    }
  }
}



export default function BasicTable({mydata,title}) {

  return (
    <div className="Table">
      <h3>{title}</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }}
          //  aria-label="simple table"
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell align="left">Order ID</TableCell>
              <TableCell align="left">Credit card ID</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Frame</TableCell>
              <TableCell align="left">Images</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Date & Time</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
          // style={{ color: "white" }}
          >
            {/* {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.trackingId}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell>
                  <TableCell align="left" className="Details">Details</TableCell>
                </TableRow>
              ))} */}
            {mydata.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">{row.fullName}</StyledTableCell>
                <StyledTableCell align="left">{row.paymentdetails[0].oid}</StyledTableCell>
                <StyledTableCell align="left">{row.paymentdetails[0].paymentInfo.cardHolderId}</StyledTableCell>
                <StyledTableCell align="left">{`${row.address1} , ${row.city} , ${row.postalCode}`}</StyledTableCell>
                <StyledTableCell align="left">{row.images[0].frame}</StyledTableCell>
                <StyledTableCell align="left">{row.images.length}</StyledTableCell>
                <StyledTableCell align="left">{row.totalSpending}</StyledTableCell>
                <StyledTableCell align="left">
                {`${new Date(row.createdAt).getDate()}/${new Date(row.createdAt).getMonth()+1}/${new Date(row.createdAt).getFullYear()} (${new Date(row.createdAt).getHours()}:${new Date(row.createdAt).getMinutes()})`}
                </StyledTableCell>
                {
                  (row.status === 'Finalized') ?
                    (<StyledTableCell align="left" style={{ backgroundColor: 'rgba(145, 254, 159, 0.47)', color: 'green' }}>Finalized</StyledTableCell>) :
                    (row.status === 'Untouched') ?
                      (<StyledTableCell align="left" style={{ backgroundColor: 'rgba(255, 173, 173, 0.56)', color: 'red' }}>Untouched</StyledTableCell>) :
                      (row.status === 'Shipped') ?
                        (<StyledTableCell align="left" style={{ backgroundColor: 'rgb(245 248 2 / 58%)', color: '#000' }}>Shipped</StyledTableCell>) :
                        (row.status === 'Customer complaint') ?
                          (<StyledTableCell align="left" style={{ backgroundColor: 'rgba(255, 173, 173, 0.56)', color: 'red' }}>Customer complaint</StyledTableCell>) :
                          (<StyledTableCell align="left"></StyledTableCell>)}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
