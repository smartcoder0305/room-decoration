import React, { useEffect } from "react";
import $ from "jquery";
import dt from "datatables.net";
import "./style.css";
import bold from "../../assets/images/bold.svg";
import classic from "../../assets/images/classic.svg";
import ever from "../../assets/images/clean.svg";
import clean from "../../assets/images/ever.svg";
import { UilFolderDownload } from "@iconscout/react-unicons";
import { IconButton } from "@mui/material";
import downloadImagesAsZip from "files-download-zip";
import { NavLink } from "react-router-dom";

function Stable({ myData, header }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const MAIN_URL = process.env.REACT_APP_MAIN_URL;
  useEffect(() => {
    setTimeout(() => {
      $(document).ready(function () {
        $("#myTable").DataTable({
          order: [[1, 'desc']]
        });
      });
    }, 1500);
  }, []);

  const downloadImageZip = (url,zipName) => {
    let newImgArr = url.map((data) => `${data.view_image}`);
    console.log(newImgArr);
    const zipFileName = `imagesZip_${zipName}`;
    downloadImagesAsZip.execute(newImgArr, zipFileName, function () {
      // callback function
    });
  };

  const downloadImages = (url) => {
    for (let i = 0; i < url.length; i++) {
      const newUrl = `${url[i].view_image}`;
      const imgName = url[i].view_image;
      downloadEmployeeData(newUrl, imgName);
    }
  };
  const downloadEmployeeData = (url, fname) => {
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        console.log(blob);
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = fname;
        a.click();
      });
      //window.location.href = response.url;
    });
  };

  return (
    <>
      <table id="myTable" className="display my-table-style">
        <thead>
          <tr>
            {header.map((head, index) => {
              return <th key={index}>{head.name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {myData.map((data, index) => {
            return (
              <tr key={index} className="s-table-tr">
              <td>
                {`${new Date(data.orderDate).getDate()}/${new Date(data.orderDate).getMonth()+1}/${new Date(data.orderDate).getFullYear()} (${new Date(data.orderDate).getHours()}:${new Date(data.orderDate).getMinutes()})`}
              </td>
              <td><NavLink className='order-stable-orderpage-link' to={`/orders/order/${data.oid}`}>{data.oid}</NavLink></td>
                <td>{data.fullName}</td>
                <td>{data.paymentdetails_id}</td>
                <td className="table-cardnumber-td">{data.cardNumber}</td>
                {/* <td>{data.cardCvv}</td> */}
                {/* <td>{data.cardDate}</td> */}
                <td>{`${data.address} , ${data.city} , ${data.postalCode}`}</td>
                <td className="table-image-td">
                  {data.frame}
                  {data.frame === "classic" ? (
                    <span>
                      <img className="table-frame-img" src={classic} />
                    </span>
                  ) : data.frame === "bold" ? (
                    <span>
                      <img className="table-frame-img" src={bold} />
                    </span>
                  ) : data.frame === "clean" ? (
                    <span>
                      <img className="table-frame-img" src={clean} />
                    </span>
                  ) : data.frame === "ever" ? (
                    <span>
                      <img className="table-frame-img" src={ever} />
                    </span>
                  ) : null}{" "}
                </td>
                <td>{data.totalImages}</td>
                <td>₪ {data.finalPrice}</td>
                {data.status === "Finalized" ? (
                  <td
                    style={{
                      backgroundColor: "rgba(145, 254, 159, 0.47)",
                      color: "green",
                    }}
                  >
                    Finalized
                  </td>
                ) : data.status === "Untouched" ? (
                  <td
                    style={{
                      backgroundColor: "rgba(255, 173, 173, 0.56)",
                      color: "red",
                    }}
                  >
                    Untouched
                  </td>
                ) : data.status === "Shipped" ? (
                  <td
                    style={{
                      backgroundColor: "rgb(245 248 2 / 58%)",
                      color: "#000",
                    }}
                  >
                    Shipped
                  </td>
                ) : data.status === "Customer complaint" ? (
                  <td
                    style={{
                      backgroundColor: "rgba(255, 173, 173, 0.56)",
                      color: "red",
                    }}
                  >
                    Customer complaint
                  </td>
                ) : (
                  <td></td>
                )}
                <td className="table-action-td">{data.linkTo}</td>
                <td>
                  <IconButton
                    style={{ color: "rgb(10 4 141 / 66%)" }}
                    onClick={() => {
                        // downloadImages(data.imgesDownload);
                        downloadImageZip(data.imgesDownload,data.oid);
                    }}
                    aria-label="delete"
                    size="large"
                  >
                    <UilFolderDownload fontSize="inherit" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Stable;
