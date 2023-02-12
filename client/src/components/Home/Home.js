import React, { useEffect, useState, useRef } from "react";
import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import SliderHome from "../Partials/SliderHome";
import SkeletonLoader from "../SkeletonLoader/index";
import useWindowDimensions from "@helpers/hooks/windowDemensions";
import "./home.css";

const Home = ({existData}) => {
  console.log('existsData-----------------------', existData)
  const [skeleton, setSkeleton] = useState(true);
  const videoRef = useRef();
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    setTimeout(() => {
      setSkeleton(false);
      videoRef.current?.play();
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
                  {existData ? (
                    <NavLink to="/review-your-images" className="site-btn gg1">
                      בואו נמשיך
                    </NavLink>
                    ) : (
                    <NavLink to="/upload-your-image" className="site-btn gg1">
                      בואו נתחיל
                    </NavLink>
                    )
                  }
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
                <img 
                  src="/assets/file/images/SquareBig.png" alt="" 
                  style={{width: "357px", height: "357px"}}
                />
                <img 
                  src="/assets/file/images/SquareSmall2.png" alt="" 
                  style={{width: "180px", height: "180px"}}
                />
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
      </section>
      <section className="about">
        <div className="container">
          <div className="about__wrapper">
            <div className="about__wrapper--image">
              <video 
                style={{width: "534px", height: "402px", borderRadius: "15px"}} 
                autoPlay={"autoplay"}
                loop
                muted
                playsInline
              >
                <source type="video/mp4" src="/assets/file/videos/HomepageVideo.mp4" />
                <source type="video/webm" src="/assets/file/videos/HomepageVideo.webm" />
              </video>
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
          <div style={{textAlign: "center"}}>
            <h1 style={{fontSize: "36px", fontWeight: "700", color: "#304036"}}>{"םירמוא ונלש תוחוקלש םירבד".split("").reverse().join("")}</h1>
            <p style={{fontSize: "18px", color: "#304036", marginTop: "10px"}}>הנה כמה ביקורות שאספנו מהזמנות של הזמן האחרון</p>
          </div>
          <div className="container homepage-container">
            <div className="swiper_left"></div>
            <div className="swiper_right"></div>
            <div></div>
            <SliderHome />
          </div>
          <div style={{textAlign: "center", marginTop: "25px", marginBottom: "5px"}}>
          {existData ? (
            <NavLink to="/review-your-images" className="site-btn gg1" style={{backgroundColor: "#60806B"}}>
              בואו נמשיך
            </NavLink>
            ) : (
              <NavLink to="/upload-your-image" className="site-btn gg1" style={{backgroundColor: "#60806B"}}>
                בואו נתחיל עם תמונות
              </NavLink>
            )
          }
          </div>
        </div>
      </section>
    </>
  );

  const renderMobile = () => (
    <>
      <section id="hero">
        <div className="mobile-banner" style={{ backgroundImage: "url('/assets/file/images/mobile-home-bg-img.jpg')", backgroundSize: "cover", backgroundPosition: "center",}}>
            <img src="/assets/file/images/mobile-home-mask.png" />
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
      <h2 style={{maxWidth: "90%"}}>מסגרות שפשוט נדבקות לקיר</h2>
      <br></br>
        <p>
            זה פשוט ומהיר הדפיסו תמונות על היקרים
            ותשדרגו כל סביבה לסביבה נעימה יותר
        </p>
        <video 
          src="/assets/file/videos/MobileHomepageVideo.mp4" alt="" 
          style={{width: "calc(100vw - 20px)", borderRadius: "8px", margin: "auto", display: "block"}} 
          autoPlay
          loop
          playsInline
          muted
          id="mobile_home_video"
          ref={videoRef}
        >
          <source type="video/mp4" src="/assets/file/videos/MobileHomepageVideo.mp4" />
          <source type="video/webm" src="/assets/file/videos/MobileHomepageVideo.webm" />
        </video>
      </div>
       
        <div className="additional-block">
          <p>
            אפשר להסיר ממקום אחד ולהדביק במקום אחר שוב ושוב ללא סימנים על הקיר.
          </p>
          <img src="/assets/images/ofr2.png" alt="" />
        </div>
      </section>
      <section id="slider">
        <div style={{textAlign: "center", marginBottom: "-24px"}}>
          <h1 style={{fontSize: "24px", fontWeight: "700", color: "#304036"}}>{"םירמוא ונלש תוחוקלש םירבד".split("").reverse().join("")}</h1>
        </div>
        <SliderHome />
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
  }, [width, existData]);

  return <>{skeleton ? <SkeletonLoader /> : renderHomePage()}</>;
};
export default Home;
