import React, { useRef, useEffect, useState, useCallback } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slidernew.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper";
import axios from "axios";
const SliderNew = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const MAIN_URL = process.env.REACT_APP_MAIN_URL;
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const getAllReviews = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${BASE_URL}/admin/setting/getreview`,
        config
      );
      if (response.data.status === 200) {
        setReviews(response.data.dataRes);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  // const moveSlideTo = useCallback((to) => ({
  //   'prev': () => sliderRef.current.swiper.slidePrev(),
  //   'next': () => sliderRef.current.swiper.slideNext(),
  // }[to]), [])
  return (
    <>
      <div className="slider-section--titles">
        <h2 className="slider-section--title">דברים שהלקוחות שלנו אומרים</h2>
        <p className="slider-section--description">
          הנה כמה ביקורות שאספנו מהזמנות של הזמן האחרון
        </p>
      </div>
      {reviews.length > 0 ? (
        <Swiper
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          spaceBetween={30}
          // centeredSlides={true}
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 19,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 19,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 29,
            },
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {reviews.map((data, index) => {
            return (
              <SwiperSlide key={data._id}>
                <div className="imgBox">
                  <a className="boxLink" href="#">
                    <img src={`${data.image}`} alt="" />
                    <div className="bgOverlay">
                      <div className="textOverlay">
                        <h5>{data.customerName}</h5>
                        <p>{data.review}</p>
                      </div>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
            );
          })}
          <button ref={prevRef} className="prev-slide">
            <svg
              width="35"
              height="12"
              viewBox="0 0 35 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 6L10 11.7735V0.226497L0 6ZM35 5L9 5V7L35 7V5Z"
                fill="#587462"
              />
            </svg>
          </button>
          <button ref={nextRef} className="next-slide">
            <svg
              width="35"
              height="12"
              viewBox="0 0 35 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35 6L25 0.226497V11.7735L35 6ZM26 5L0 5V7L26 7V5Z"
                fill="#587462"
              />
            </svg>
          </button>
        </Swiper>
      ) : null}
    </>
  );
};

export default SliderNew;
