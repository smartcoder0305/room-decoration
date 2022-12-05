import React, { useEffect, useState } from "react";
import "./Cards.css";
import {
  UilClipboardAlt,
  UilTruck,
  UilBox,
  UilLaptop,
  UilUserCircle

} from "@iconscout/react-unicons";

import Card from "../Card/Card";
import axios from "axios";







const Cards = ({first ,second,third,forth,title}) => {

 

  return (
    <div className="Cards">
      <div className="parentContainer">
        <Card
          title={title==='Total'?(`Total Visitor`):(title==='Today')?(`Total Visitor Today`):(title==='Week')?(`Total Visitor This Week`):(`Total Visitor This Month`)}
          color={{
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
          }}
          barValue={70}
          value={first}
          png={UilLaptop}
        />
      </div>
      <div className="parentContainer">
        <Card
          title={title==='Total'?(`Total Order`):(title==='Today')?(`Total Order Today`):(title==='Week')?(`Total Order This Week`):(`Total Order This Month`)}
          color={{
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
          }}
          barValue={80}
          value={second}
          png={UilBox}
        />
      </div>
      <div className="parentContainer">
        <Card
          title={title==='Total'?(`Conversion Rate`):(title==='Today')?(`Conversion Rate Today`):(title==='Week')?(`Conversion Rate This Week`):(`Conversion Rate This Month`)}
          color={{
            backGround:
              "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
          }}
          barValue={60}
          value={`${third}%`}
          png={UilClipboardAlt}
        />
      </div>
      {/* <div className="parentContainer">
        <Card
          title={"Live Visitor"}
          color={{
            backGround:
              "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
          }}
          barValue={60}
          value={forth}
          png={UilUserCircle}
        />
      </div> */}
    </div>
  );
};

export default Cards;
