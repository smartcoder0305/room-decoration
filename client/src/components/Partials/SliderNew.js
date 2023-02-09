import React, { useRef, useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import useWindowDimensions from "@helpers/hooks/windowDemensions";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slidernew.css";

// import required modules
import { Navigation, Pagination } from "swiper";

const review = {
  image: '/assets/file/images/istockphoto.png',
  customerName: 'ירון ברלד',
  review: 'אין על סטיקבל קיבלתי שירות מצוין והתמונות הגיעו בזמן זה בול מה שרציתי',

}
const SliderNew = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const { height, width } = useWindowDimensions();
  const getAllReviews = async () => {
    setReviews([review, review, review, review, review, review])
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <div style={{height: `${width / 4 + 200}px`}}>
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
              <SwiperSlide key={index}>
                <div className="imgBox" style={{width: `${width > 767 ? width / 4 : ''}px`, height: `${width > 767 ? width / 4 : ''}px`}}>
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
    </div>
  );
};

export default SliderNew;
