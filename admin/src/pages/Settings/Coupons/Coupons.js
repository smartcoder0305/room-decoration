import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Coupons() {
  const [value, setValue] = useState();
  const [cuponPercent, setCuponPercent] = useState();
  const [numberOfImages, setNumberOfImages] = useState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("userToken");
  const getData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/admin/setting/getcupons`,
        config
      );
      // console.log(response)
      if (response.data.status === 200) {
        console.log(response.data.getCupon.cuponsAvalible);
        setValue(response.data.getCupon.cuponsAvalible);
        setCuponPercent(response.data.getCupon.percentage);
        setNumberOfImages(response.data.getCupon.numberOfImages)
      }
    } catch (error) {}
  };

  const handelCupon = async () => {
    try {
      if (numberOfImages <= 20) {
      if (cuponPercent <= 100) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        };
        const response = await axios.post(
          `${BASE_URL}/admin/setting/addcupons`,
          { data: value, percentage: cuponPercent,numberOfImages:numberOfImages },
          config
        );
        if (response.data.status === 200) {
          toast.success("Updated Sucessfully");
        } else {
          toast.success("Something Went wrong");
        }
      } else {
        toast.error("Enter Less then 100");
      }
    }else{
      toast.error("Enter Less then 20 Images");
    }
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="setting-page-cupoon-section">
        <div className="form_row">
          <div className="col-lg-6 my-padd">
            <div className="form-group data">
              <label className="form-label my-level">
                Add Special Discount
              </label>

              <select
                className="form-control"
                name="cupon"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              >
                <option value={value || false}>
                  {value ? <>Display</> : <>Hide</>}
                </option>
                <option value={true}>Display</option>
                <option value={false}>Hide</option>
              </select>
              <label className="form-label">Enter The Percentage</label>
              <input
                type="number"
                className="form-control"
                name="cname"
                value={cuponPercent}
                onChange={(e) => {
                  setCuponPercent(e.target.value);
                }}
              />
              <label className="form-label">Enter The Number Of Images</label>
              <input
                type="number"
                className="form-control"
                name="cname"
                value={numberOfImages}
                onChange={(e) => {
                  setNumberOfImages(e.target.value);
                }}
              />

              {/* <label className="form-label">Enter The Amout of images</label>
              <input
                type="text"
                className="form-control"
                name="cname"
                // value={cname}
                // onChange={(e) => {
                //   handelInput(e);
                // }}
              /> */}
              <Button
                variant="contained"
                onClick={() => {
                  handelCupon();
                }}
              >
                Update Discount
              </Button>
              <Toaster position="bottom-center" reverseOrder={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Coupons;
