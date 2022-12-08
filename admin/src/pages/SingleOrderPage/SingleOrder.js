import { Button, IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "./singleOrder.css";
import { UilFolderDownload } from "@iconscout/react-unicons";
import bold from "../../assets/images/bold.svg";
import classic from "../../assets/images/classic.svg";
import clean from "../../assets/images/clean.svg";
import ever from "../../assets/images/ever.svg";
function SingleOrder() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const MAIN_URL = process.env.REACT_APP_MAIN_URL;
  const params = useParams();
  const token = localStorage.getItem("userToken");
  let navigate = useNavigate();
  const [myData, setMyData] = useState([]);
  const [cstatus, setCstatus] = useState('')
  const [numberOfImages, setNumberOfImages] = useState();
  const [percentages, setPercentages] = useState();
  const [isDisplay, setIsDisplay] = useState();

  const getData = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("you are not authorized");
      return navigate("/");
    }
    console.log(token);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/getusersdatabyId/${params.uid}`,
        config
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log(response.data.usersData);
        // console.log(myData)
        setMyData(response.data.usersData);
        setCstatus(response.data.usersData[0]?.status)
      }
    } catch (error) {
      console.log("something wrong");
    }
  };


  const handelDeleteButton = async (uid) => {
    // console.log(uid)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      const resposeData = await axios.get(
        `${BASE_URL}/user/delete/${uid}`,
        config
      );
      console.log(resposeData);
      if (resposeData.data.status === 200) {
        toast.error("Deleted Sucessfully");
        navigate("/orders");
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const downloadEmployeeData = (url, fname) => {
    console.log(url);
    console.log(fname);

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


  const updateStaus=async(e)=>{
    console.log('asdsadsad123')
    e.preventDefault();
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        }
        const response = await axios.post(`${BASE_URL}/admin/customer/shipping/update/status`,{uid:myData[0]?.uid,cstatus}, config)
       if(response.data.status===200){
      
        toast.success('Updated Sucessfully')
       }else{
        toast.error('Something went wrong')
       }
        console.log(response)
    } catch (error) {

    }
  }

  const handelInput=(e)=>{
    if (e.target.name === 'status') {
      setCstatus(e.target.value)
  }
  }



  const getCuponData = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const cuponData = await axios.get(
        `${BASE_URL}/admin/setting/getcupons`,
        config
      );
      console.log('-------------------lol----------------')
      console.log(cuponData.data.getCupon.numberOfImages)
      if (cuponData.data.status === 200) {
        
        setNumberOfImages(cuponData.data.getCupon.numberOfImages);
        setPercentages(cuponData.data.getCupon.percentage);
        setIsDisplay(cuponData.data.getCupon.cuponsAvalible);
      }
    } catch (error) {}
  };


  useEffect(() => {
    getData();
    getCuponData();
  }, []);

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="MainDash" style={{ display: "flex" }}>
          <h1 className="main-Header">Order Details</h1>


          {myData[0] ? (
            <>
              <div className="form_row" style={{justifyContent:"center"}}>
                {/* <div className="col-lg-6">
                  <div className="form-group data"></div>
                </div> */}

                <div className="col-lg-6 my-padd">
                  <div className="form-group data my-status-input">
                    <div className="col-lg-6 mypad">
                      <div className="form-group data ">
                        {/* <input type="text" className="form-control" name='name' value={name} onChange={(e) => { handelInput(e) }} /> */}
                        <select
                          className="form-control"
                          name="status"
                          onChange={(e) => {
                            handelInput(e);
                          }}
                        >
                          <option value={cstatus}>{cstatus}</option>
                          <option value="Untouched">Untouched</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Finalized">Finalized</option>
                          <option value="Customer complaint">
                            Customer complaint
                          </option>
                        </select>
                      </div>
                    </div>
                    <span>
                      <Button variant="contained" onClick={(e)=>{updateStaus(e)}}>Update</Button>
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          <Toaster position="bottom-center" reverseOrder={true} />


          <div className="container">
            <div className="web_row">
              <div className="col-lg-7">
                <div className="left_bx">
                  <table className="rwd-table">
                    <tbody>
                      {console.log(myData[0])}
                      {myData[0]?.images.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td className="mx_wth bdr_right">
                              <div className="imagebx">
                                <img
                                  src={`${data.image}`}
                                  className="table_img"
                                />
                                {/* <p>{data?.images[0]?.frame}</p> */}
                                {myData[0].images[0].frame === "classic" ? (
                                  <img src={classic} className="table_img" />
                                ) : myData[0].images[0].frame === "bold" ? (
                                  <img src={bold} className="table_img" />
                                ) : myData[0].images[0].frame === "ever" ? (
                                  <img src={ever} className="table_img" />
                                ) : myData[0].images[0].frame === "clean" ? (
                                  <img src={clean} className="table_img" />
                                ) : null}
                              </div>
                            </td>
                            <td>
                              <h1 className="headingtab">
                                Original Image link{" "}
                                <IconButton
                                  onClick={() => {
                                    downloadEmployeeData(
                                      `${MAIN_URL}/${data.image}`,
                                      data.image
                                    );
                                  }}
                                  aria-label="delete"
                                  size="large"
                                >
                                  <UilFolderDownload fontSize="inherit" />
                                </IconButton>{" "}
                              </h1>
                              <a
                                // onClick={() => { downloadEmployeeData(`${MAIN_URL}/${data.image}`, data.image) }}
                                target="blank"
                                href={`${MAIN_URL}/${data.image}`}
                                download
                                className="link"
                              >
                                {`${MAIN_URL}/${data.image}`}
                              </a>

                              <h1 className="headingtab">
                                Crop Image link{" "}
                                <IconButton
                                  onClick={() => {
                                    downloadEmployeeData(
                                      `${data.view_image}`,
                                      data.view_image
                                    );
                                  }}
                                  aria-label="delete"
                                  size="large"
                                >
                                  <UilFolderDownload fontSize="inherit" />
                                </IconButton>
                              </h1>
                              <a
                                target="blank"
                                href={`${data.view_image}`}
                                className="link"
                                download
                              >{`${MAIN_URL}/${data.view_image}`}</a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="right_bx">
                  <div className="heading_bx">
                    <h1 className="tableheding">Customer details</h1>

                    <NavLink
                      to={`/orders/order/editorder/${myData[0]?.paymentdetails[0].oid}`}
                      className="editbtn"
                    >
                      Edit
                    </NavLink>
                    <a
                      className="editbtn"
                      onClick={() => {
                        handelDeleteButton(myData[0]?.uid);
                      }}
                    >
                      Delete
                    </a>
                  </div>
                  <div className="form_row">
                    <div className="col-lg-6 my-lg-6">
                      <div className="form-group data">
                        <label className="form-label">
                          Order Id:{" "}
                          <span className="labelinfo">
                            {myData[0]?.paymentdetails[0].oid}
                          </span>
                        </label>
                      </div>
                      <div className="form-group data">
                        <label className="form-label">
                          Name:{" "}
                          <span className="labelinfo">
                            {myData[0]?.fullName}
                          </span>
                        </label>
                      </div>
                      <div className="form-group data">
                        <label className="form-label">
                          Email:{" "}
                          <span className="labelinfo">{myData[0]?.email}</span>
                        </label>
                      </div>
                      <div className="form-group data">
                        <label className="form-label">
                          Phone:{" "}
                          <span className="labelinfo">{myData[0]?.phone}</span>
                        </label>
                      </div>
                      <div className="form-group data">
                        <label className="form-label">
                          Address:{" "}
                          <span className="labelinfo">{`${myData[0]?.address1},${myData[0]?.city},${myData[0]?.postalCode}`}</span>
                        </label>
                      </div>
                      <div className="form-group data">
                        <label className="form-label">
                          Customer Id:{" "}
                          <span className="labelinfo">{`${myData[0]?.paymentdetails[0].paymentInfo.cardHolderId}`}</span>
                        </label>
                      </div>
                      <div className="form-group data">
                        <label className="form-label">
                          Card Number:{" "}
                          <span className="labelinfo">{`${myData[0]?.paymentdetails[0].paymentInfo.cardNumber}`}</span>
                        </label>
                      </div>
                      <div className="form-group data">
                        <label className="form-label">
                          Card Cvv:{" "}
                          <span className="labelinfo">{`${myData[0]?.paymentdetails[0].paymentInfo.cardCvv}`}</span>
                        </label>
                      </div>
                      <div className="form-group data">
                        <label className="form-label">
                          Date:{" "}
                          <span className="labelinfo">{`${myData[0]?.paymentdetails[0].paymentInfo.cardDate}`}</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-6 my-lg-6 ">
                      <div className="amount">
                        <div className="form_row mb-3">
                          <div className="col-lg-6 col-sm-6">
                            <span className="price_label">
                              ₪39<span className="mx-2">x</span>{" "}
                              {myData[0]?.images.length}
                            </span>
                          </div>
                          <div className="col-lg-6 col-sm-6">
                            <span className="price_data">
                              ₪{39 * myData[0]?.images.length}
                            </span>
                          </div>
                        </div>
                        <div className="form_row">
                          <div className="col-lg-6 col-sm-6">
                            <span className="price_label">
                              Discount:({ isDisplay?(myData[0]?.images.length>=numberOfImages?(percentages):(0)):(0)}%)
                            </span>
                          </div>
                          <div className="col-lg-6 col-sm-6">
                            <span className="price_data">
                              -₪
                              {/* {myData[0]?.images.length >= 10
                                ? parseFloat(
                                    ((39 * myData[0]?.images.length) / 100) * 5
                                  ).toFixed(2)
                                : 0} */}
                                {
                                  isDisplay?(myData[0]?.images.length>=numberOfImages?((((39 * myData[0]?.images.length)/100)*percentages).toFixed(2)):(0)):(0)
                                }
                            </span>
                          </div>
                        </div>
                        <div className="form_row">
                          <div className="col-lg-6 col-sm-6">
                            <span className="price_label">Subtotal</span>
                          </div>
                          <div className="col-lg-6 col-sm-6">
                            <span className="price_data">
                              ₪ {myData[0]?.totalSpending}
                              {/* {(myData[0]?.images.length >= 10) ? ((39 * myData[0]?.images.length) - (((39 * myData[0]?.images.length) / 100) * 10)) : (39 * myData[0]?.images.length)} */}
                            </span>
                          </div>
                        </div>
                        <div className="form_row">
                          <div className="col-lg-6 col-sm-6">
                            <span className="price_label">
                              Shipping
                              <br />
                              Free shipping
                            </span>
                          </div>
                          <div className="col-lg-6 col-sm-6">
                            <span className="price_data">₪0.00</span>
                          </div>
                        </div>
                        <div className="form_row">
                          <div className="col-lg-6 col-sm-6">
                            <span className="price_label">Tax</span>
                          </div>
                          <div className="col-lg-6 col-sm-6">
                            <span className="price_data">₪0.00</span>
                          </div>
                        </div>
                        <div className="form_row">
                          <div className="col-lg-6 col-sm-6">
                            <span className="price_label fontbold">Total</span>
                          </div>
                          <div className="col-lg-6 col-sm-6">
                            <span className="price_data fontbold">
                              ₪ {myData[0]?.totalSpending}
                              {/* {(myData[0]?.images.length >= 10) ? ((39 * myData[0]?.images.length) - (((39 * myData[0]?.images.length) / 100) * 10)) : (39 * myData[0]?.images.length)} */}
                            </span>
                          </div>
                        </div>
                        <div className="form_row bdr_top">
                          <div className="col-lg-6 col-sm-6">
                            <span className="price_label">
                              Paid by customer
                            </span>
                          </div>
                          <div className="col-lg-6 col-sm-6">
                            <span className="price_data">
                              ₪ {myData[0]?.totalSpending}
                              {/* {(myData[0]?.images.length >= 10) ? ((39 * myData[0]?.images.length) - (((39 * myData[0]?.images.length) / 100) * 10)) : (39 * myData[0]?.images.length)} */}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleOrder;
