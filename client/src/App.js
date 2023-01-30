import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Partials/Header";
// import Header from "@shared/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Partials/Footer";
import UploadImage from "@pages/UploadImage";
import ReviewImages from "@pages/ReviewImages";
import PrivacyPolicy from "@pages/PrivacyPolicy";
import PaymentSuccess from "./components/UploadImage/PaymentSuccess";
import PaymentCancel from "./components/UploadImage/PaymentCancel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Faq from "./components/FooterPages/Faq";
import Window1 from "./components/FooterPages/Window1";
import Window2 from "./components/FooterPages/Window2";
import Window3 from "./components/FooterPages/Window3";
import Overlay from "@shared/Overlay";
import SecondOverlay from "@shared/SecondOverlay";
import WindowModals from "@shared/WindowModals";
import SecondaryModals from "@shared/SecondaryModals";
// import history from "@core/history";
import { RecoilRoot } from 'recoil';
import RecoilNexus from "recoil-nexus";
import { getUserImages } from "@api";

function App() {
  // window.addEventListener("beforeunload", async (e) => {
  //   e.preventDefault();
  //   e.returnValue = "";
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   await axios.post(`${BASE_URL}/user/livecount`, {}, config);
  // });

  // useEffect(()=>{
  // // return(async()=>{
  // //   alert('hello')
  // //       const config = {
  // //       headers: {
  // //         "Content-Type": "application/json",
  // //       },
  // //     };
  // //     await axios.post(`${BASE_URL}/user/livecount`, {}, config);

  // // })

  // const handleTabClose =async event => {
  //   event.preventDefault();

  //   // console.log('beforeunload event triggered');
  //         const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     await axios.post(`${BASE_URL}/user/livecount`, {}, config);

  //   return (event.returnValue = 'Are you sure you want to exit?');
  // };

  // window.addEventListener('beforeunload', handleTabClose);

  // return () => {
  //   window.removeEventListener('beforeunload', handleTabClose);
  // };
  // },[])

  // const setUniqueId = async() => {
  //   let fdata = localStorage.getItem("fdata");
  //   if(!fdata){
  //     let uid=uniqid(Math.floor(Math.random() * 100000000), Math.floor(Math.random() * 100000000));
  //     localStorage.setItem("fdata",uid);
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //    await axios.post(`${BASE_URL}/user/setlivecount`, { uid }, config)
  //   };
  //   }

  // useEffect(() => {
  //   setUniqueId();
  // }, []);

  // window.addEventListener("beforeunload", function (e) {
  //   // *********** perform database operation here
  //   // before closing the browser ************** //
  //   let fdata = localStorage.getItem("fdata");
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   axios
  //     .post(`${BASE_URL}/user/deletelivecount`, { uid:fdata }, config)
  //     .then((data) => {});

  //   // added the delay otherwise database operation will not work
  //   for (var i = 0; i < 500000000; i++) {}
  //   return undefined;
  // });
  // // var allowPrompt = true;
  // // window.onbeforeunload = areYouSure;
  const [existData, setExistData] = useState(false);

  useEffect(() => {
    getUserImages().then(({data}) => {
      console.log(data);
      if (data.data.length) setExistData(true);
    });
  }, [])

  return (
    <RecoilRoot>
      <RecoilNexus />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home existData={existData}/>
            <Footer existData={existData}/>
          </Route>
          <Route path="/upload-your-image" component={UploadImage} exact/>
          <Route path="/review-your-images" component={ReviewImages} exact/>
          <Route path="/payment-success/:orderId" component={PaymentSuccess} exact/>
          <Route path="/payment-cancel" component={PaymentCancel} exact/>
          <Route path="/faq" component={Faq} exact/>
          <Route path="/termsofUse" component={Window1} exact/>
          <Route path="/privacypolicy" component={Window2} exact/>
          <Route path="/commonquestions" component={Window3} exact/>
          <Route path="/v-policy" exact>
            {/* <Header /> */}
            <PrivacyPolicy />
            <Footer />
          </Route>
          <Redirect to="/" />
        </Switch>
      <WindowModals />
      <SecondaryModals />
      </Router>
      <Overlay />
      <SecondOverlay />
    </RecoilRoot> 
  );
}

export default App;
