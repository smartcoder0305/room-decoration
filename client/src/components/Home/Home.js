import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import SliderNew from "../Partials/SliderNew";
import SliderReview from "../Partials/SliderReview";
import SkeletonLoader from "../SkeletonLoader/index";
import useWindowDimensions from "@helpers/hooks/windowDemensions";
import Coupon from "./Coupon";
import "./home.css";

const Home = () => {
  const [skeleton, setSkeleton] = useState(true);
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    setTimeout(() => {
      setSkeleton(false);
    }, 1000);
  }, []);

  const renderDesktop = () => (
    <>
      <section className="banner">
        {/* <Coupon /> */}
        <div className="container hero-container">
          <div className="row">
            <div className="col-md-6 order-2 order-md-1">
              <div className="ban-txt row">
                <div className="ban-txt-wrap order-md-1 order-3 col-12">
                  <h2>
                    סיפורים מרגשים
                    <br />
                    שתולים על הקיר
                  </h2>
                  <p>
                    {" "}
                    התמונות יודפסו באיכות גבוהה,
                    <br />
                    ימוסגרו על פי בחירתכם ויישלחו אליכם עד הבית
                  </p>
                </div>

                <div className="col-12 order-md-2 order-3 text-center text-md-right">
                  <NavLink to="/upload-your-image" className="site-btn gg1">
                    בואו נתחיל
                  </NavLink>

                  <NavLink
                    to="/upload-your-image"
                    className="site-btn kk forhover"
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      padding: "10px 10px !important",
                      margin: "20px auto",
                    }}
                  >
                    בחירת תמונות להדפסה
                  </NavLink>
                </div>
                <div className="sub order-md-3 order-2 col-12">
                  <img
                    src="/assets/file/images/NailsHomepage.svg"
                    alt=""
                    className="xp"
                  />
                  <p>משלוחים חינם לכל הארץ</p>
                  <img
                    src="/assets/images/shipping.svg"
                    alt=""
                    className="xy"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 order-1 order-md-2 pl-none header-image-wrapper">
              <div className="ban-img">
                <img src="/assets/images/home-1.jpg" alt="" />
                <img src="/assets/images/home-2.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="offer">
        <div className="container offer_container">
          <div className="row benefits">
            <div className="benefits__item">
              <img src="/assets/images/quality.svg" alt="" />
              <div className="ofr-txt">
                <h4>איכות מובטחת</h4>
                <p>הדפסה באיכות גבוהה ביותר</p>
              </div>
            </div>
            <div className="benefits__item">
              <img src="/assets/images/reuseable.svg" alt="" />
              <div className="ofr-txt">
                <h4>הסרה והדבקה מחדש</h4>
                <p>אפשר להזיז את המסגרת ושוב שוב</p>
              </div>
            </div>
            <div className="benefits__item">
              <img src="/assets/images/present.svg" alt="" />
              <div className="ofr-txt">
                <h4>מתנה מושלמת</h4>
                <p>זכרונות נעימים ליקרים שלכם</p>
              </div>
            </div>
            <div className="benefits__item">
              <img src="/assets/images/nonails.svg" alt="" />
              <div className="ofr-txt">
                <h4>אין צורך במסמרים</h4>
                <p>התמונות פשוט נדבקות על הקיר</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="res-offer">
            {/* <img src="/assets/images/ofr-mob.jpg" alt="" /> */}
            <img src="/assets/images/cpl.jpg" alt="" />
            <div className="ofr-wrap">
              <h4>מסגרות שפשוט נדבקות לקיר</h4>
              <p>
                זה פשוט ומהיר הדפיסו תמונות על הקיר ותשדרגו כל סביבה לסביבה
                נעימה יותר
                <br />
              </p>
            </div>
          </div>
          <div className="sub order-md-3 order-2 col-12">
            <img src="/assets/images/van.svg" alt="" className="xp " />
            <p className="home-van-bottom-text">משלוחים חינם לכל הארץ</p>
          </div>
        </div>
      </section>
      <section className="about">
        <div className="container">
          <div className="about__wrapper">
            <div className="about__wrapper--image">
              <img src="/assets/images/home-1.jpg" alt="" />
            </div>
            <div className="about__wrapper--content">
              <h4>סיפור על קיר באמצעות תמונות</h4>
              <p>
                ממש כיף לנצור רגעים נהדרים מהחיים ולהוסיף חום לבית עם התמונות של
                היקרים שלכם,
                <br />
                ההתקנה פשוטה, תליית המסגרות נעשית באמצעות הדבקה על הקיר וגם
                ההסרה מתבצעת פשוט ובקלות ללא נזק לקיר.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <SliderReview /> */}
      <section className="slider-section">
        <div className="slider-section--wrapper">
          <div className="container homepage-container">
            <SliderNew />
          </div>
        </div>
      </section>
    </>
  );

  const renderMobile = () => (
    <>
      <section id="hero">
        <div className="mobile-banner" style={{ background: "#C4C4C4" }}>
          <h1>התמונות שלכם יהפכו כל קיר לקיר מלא בזכרונות נעימים</h1>
          <p>
            מסגרות מהממות ואיכותיות, שנדבקות אל הקיר ללא מאמץ וממלאות כל חלל
            לחלל חי ונושם
          </p>
        </div>
        <div className="additional-info">
          <div className="benefits__item">
            <img src="/assets/images/nonailsm.png" alt="" />
            <div className="ofr-txt">
              <h4>
                אין צורך
                <br /> במסמרים
              </h4>
            </div>
          </div>
          <div className="benefits__item">
            <img src="/assets/images/delivery.svg" alt="" />
            <div className="ofr-txt">
              <h4>
                משלוחים חינם
                <br /> לכל הארץ
              </h4>
            </div>
          </div>
          <div className="benefits__item">
            <img src="/assets/images/ofr2m.png" alt="" />
            <div className="ofr-txt">
              <h4>
                הדפסה איכותית
                <br /> לאורך שנים
              </h4>
            </div>
          </div>
        </div>
      </section>
      <section id="offer">
      <div className="content">
      <h2>מסגרות שפשוט נדבקות לקיר</h2>
      <br></br>
        <p>
            זה פשוט ומהיר הדפיסו תמונות על היקרים
            ותשדרגו כל סביבה לסביבה נעימה יותר
        </p>
        <img src="/assets/images/placeholder.jpg" alt="" />
      </div>
       
        <div className="additional-block">
          <p>
            אפשר להסיר ממקום אחד ולהדביק במקום אחר שוב ושוב ללא סימנים על הקיר.
          </p>
          <img src="/assets/images/ofr2.png" alt="" />
        </div>
      </section>
      <section id="slider">
        <SliderNew />
        <div className="additional-block">
          <p>
          “הדבקנו על הקיר תמונות בלובי וכל פעם
שאני מסתכלת על הקיר הזה אני מתמלאת”          </p>
          <img src="/assets/images/gift.svg" alt="" />
        </div>
      </section>
    </>
  );
  const renderHomePage = useCallback(() => {
    return width >= 767 ? renderDesktop() : renderMobile();
  }, [width]);

  return <>{skeleton ? <SkeletonLoader /> : renderHomePage()}</>;
};
export default Home;
