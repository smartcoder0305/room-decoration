import React, { useEffect, useState, useRef } from "react";
import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import SliderHome from "../Partials/SliderHome";
// import SkeletonLoader from "../SkeletonLoader/index";
import useWindowDimensions from "@helpers/hooks/windowDemensions";
import "./home.css";

const Home = ({existData}) => {
  console.log('existsData-----------------------', existData)
  // const [skeleton, setSkeleton] = useState(true);
  const videoRef = useRef();
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    setTimeout(() => {
      // setSkeleton(false);
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
                    ,מסגרות קסומות שנדבקות לקיר
                    <br />
                    תהפכו את הקיר שלכם לסיפור
                  </h2>
                  <p>
                    {" "}
                    התמונות שלכם יודפסו באיכות גבוהה,
                    <br />
                    ימוסגרו על פי בחירתכם ויישלחו אליכם עד הדלת
                  </p>
                </div>
                
                <div className="col-12 order-md-2 order-3 text-center text-md-right">
                  {existData || localStorage.getItem('dataExist') == 1 ? (
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
                    style={{width: "43px", height: "38x"}}
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
        <div className="whyblends">
          <h1>למה בלנדס?</h1>
          <br />
          <p>המסגרות שלנו מוסיפות חיים לכל בית או משרד, בעזרתן כל קיר הופך לסיפור מרגש, אנחנו בבלנדס נותנים דגש על כל תמונה ותמונה שיוצאת מהמפעל שלנו ודואגים לאיכות מירבית.</p>
        </div>
        <div className="container offer_container">
          <div className="row benefits">
            <div className="benefits__item">
              <img src="/assets/images/quality.svg" alt="" />
              <div className="ofr-txt">
                <h4>100% איכות</h4>
                <p>ההדפסה איכותית ונשמרת לאורך שנים
                  <br />
                  אנחנו בטוחים שתאהבו את התמונות
                </p>
              </div>
            </div>
            <div className="benefits__item">
              <img src="/assets/images/wayoflove.svg" alt="" />
              <div className="ofr-txt">
                <h4>דרך נהדרת לאהוב</h4>
                <p>תמונות קיר הן מתנה נפלאה לתת
                  <br />
                  לעצמכם או לאהובים שלכם
                </p>
              </div>
            </div>
            <div className="benefits__item">
              <img src="/assets/images/nonails.svg" alt="" />
              <div className="ofr-txt">
                <h4>אין צורך במסמרים</h4>
                <p>המסגרות פשוט נדבקות לקיר
                  <br />
                  כך שניתן לעצב את הקיר בקלות ללא מאמץ
                </p>
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
              <h4>זה ממש פשוט להדביק אותן</h4>
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
            <h1 style={{fontSize: "36px", fontWeight: "400", color: "#304036"}}>{"םירמוא ונלש תוחוקלש םירבד".split("").reverse().join("")}</h1>
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
            <NavLink to="/review-your-images" className="site-btn gg1" style={{backgroundColor: "#087E63"}}>
              בואו נמשיך
            </NavLink>
            ) : (
              <NavLink to="/upload-your-image" className="site-btn gg1" style={{backgroundColor: "#087E63"}}>
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
            <h1>מסגרות קסומות שנדבקות לקיר, תהפכו את הקיר שלכם לסיפור</h1>
            <p style={{maxWidth: "85%"}}>
            תהפכו פינות בבית או במשרד לחלל חי ונושם, עם
             מסגרות איכותיות שנדבקות אל הקיר ללא מאמץ
            </p>
        </div>
        <div className="additional-info">
          <div className="benefits__item">
            <img src="/assets/images/nonailsmobile.svg" alt="" />
            <div className="ofr-txt">
              <h4>
              מסגרות שנדבקות לקיר                
              <br /> אין צורך במסמרים
              </h4>
            </div>
          </div>
          <div className="benefits__item">
            <img src="/assets/images/deliverymobile.svg" alt="" />
            <div className="ofr-txt">
              <h4>
                משלוחים חינם
                <br /> לכל הארץ
              </h4>
            </div>
          </div>
          <div className="benefits__item">
            <img src="/assets/images/qualitymobile.svg" alt="" />
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
      <h2 style={{maxWidth: "90%"}}>זה ממש פשוט להדביק אותן</h2>
      <br></br>
        <p style={{maxWidth: "75%"}}>
            זה פשוט ומהיר! הדביקו זכרונות מרגשים לקיר
            ושדרגו את הסביבה לסביבה נעימה יותר
        </p>
        <video
          src="/assets/file/videos/MobileHomepageVideo.mp4" alt="" 
          style={{width: "calc(90vw - 20px)", borderRadius: "8px", margin: "auto", display: "block"}} 
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
          <img src="/assets/images/reuseablem.svg" alt="תמונות בהדבקה על הקיר ללא מסמרים" />
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
          <img src="/assets/images/giftm.svg" alt="תמונות במתנה ליום הולדת" />
        </div>
      </section>
    </>
  );
  const renderHomePage = useCallback(() => {
    return width >= 767 ? renderDesktop() : renderMobile();
  }, [width, existData]);

  // return <>{skeleton ? <SkeletonLoader /> : renderHomePage()}</>;
  return <>{renderHomePage()}</>;
};
export default Home;
