/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import {
  countState,
  netPriceState,
  imageCountState,
  totalPriceState,
  discountPriceState,
  discountPercentageState,
} from "@atoms/priceCalc";
import { imagesData } from "@atoms";
import { getRecoil, setRecoil } from "recoil-nexus";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const storedValues = localStorage.getItem("uniqueUserId");

export async function uploadSingleImage(formdata) {
  const response = await axios
    .post(`${BASE_URL}/imageupload_single`, formdata, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      setTimeout(() => getImagesDB(), 200);
    });

  return response;
}

export async function uploadMultipleImages(formdata) {
  const response = await axios
    .post(`${BASE_URL}/imageupload`, formdata, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      setTimeout(() => getImagesDB(), 200);
    });

  return response;
}

export function removeImage(id) {
  return axios.get(`${BASE_URL}/delete_image_by_user/${id}`);
}

export function getUserImages() {
  const localstr = localStorage.getItem("uniqueUserId");
  return axios.get(`${BASE_URL}/get_image_by_user/${localstr}`);
}

export const addUserCount = async () => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  return await axios.get(`${BASE_URL}/user/addnewusercount`, config);
};

export async function addImageFromSocial(response) {
  const rep = await axios
    .post(`${BASE_URL}/social-photo-import`, response, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      setTimeout(() => getImagesDB(), 500);
    });
  return rep;
}

export async function getImagesDB() {
  const count = getRecoil(countState);
  const imageData = await getUserImages();
  // if (count > 1) {
  //   if (imageData.status === 200) {
  //     if (imageData.data.data.length === 0) {
  //       // localStorage.clear();
  //       // history.push("/upload-your-image");
  //     }
  //   }
  // }

  setRecoil(countState, count + 2);
  if (imageData.data.data.length > 0) {
    const imageshow = imageData.data.data;
    setRecoil(imagesData, imageshow);
    setRecoil(imageCountState, imageshow.length);

    let set_net_price = imageshow.length * 39;
    let set_discount_percentage = 0;
    let set_discount_price = 0;
    let set_total_price = 0;

    if (imageshow.length > 9 && imageshow.length < 15) {
      set_discount_percentage = 5;
      set_discount_price = (
        (set_discount_percentage / 100) *
        parseFloat(set_net_price)
      ).toFixed(2);
      set_total_price = set_net_price - set_discount_price;
    } else if (imageshow.length > 14) {
      set_discount_percentage = 10;
      set_discount_price = (
        (set_discount_percentage / 100) *
        parseFloat(set_net_price)
      ).toFixed(2);
      set_total_price = set_net_price - set_discount_price;
    }

    setRecoil(netPriceState, set_net_price);
    setRecoil(discountPercentageState, set_discount_percentage);
    setRecoil(discountPriceState, set_discount_price);
    setRecoil(totalPriceState, set_total_price);
  }
  return imageData;
}
