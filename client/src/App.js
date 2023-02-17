import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Partials/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Partials/Footer";
import UploadImage from "@pages/UploadImage";
import ReviewImages from "@pages/ReviewImages";
import PaymentSuccess from "./components/UploadImage/PaymentSuccess";
import Overlay from "@shared/Overlay";
import SecondOverlay from "@shared/SecondOverlay";
import WindowModals from "@shared/WindowModals";
import SecondaryModals from "@shared/SecondaryModals";
import { RecoilRoot } from 'recoil';
import RecoilNexus from "recoil-nexus";
import { getUserImages } from "@api";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [existData, setExistData] = useState(false);

  useEffect(() => {
    getUserImages().then(({data}) => {
      setExistData(false);
      console.log(data);
      if (data.data.length) {
        setExistData(true);
        localStorage.setItem('dataExist', 1);
      } else {
        localStorage.setItem('dataExist', 0);
        setExistData(false);
      }
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
