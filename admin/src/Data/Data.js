// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilTruck ,
  UilBox,
  UilLaptop,
  UilChart,
  UilSignOutAlt,
  UilSetting ,
  UilFile
} from "@iconscout/react-unicons";

// Analytics Cards imports
// import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
// import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    link:'/dashbord',
    id:0,
    type:1
  },
  {
    icon: UilClipboardAlt,
    heading: "Orders",
    link:'/orders',
    id:1,
    type:1
  },
  {
    icon: UilUsersAlt,
    heading: "Customers",
    link:'/customers',
    id:2,
    type:1
  },
  {
    icon: UilSetting,
    heading: "Settings",
    link:'/settings',
    id:0,
    type:1
  },
  // {
  //   icon:  UilFile,
  //   heading: "Pages",
  //   link:'/frames/one',
  //   id:0,
  //   type:1
  // },
  {
    icon:  UilFile,
    heading: "Pages",
    link:'/pages',
    id:0,
    type:1
  },
];


export const SidebarPagesData = [
  
  // {
  //   icon: UilPackage,
  //   heading: 'Products',
  //   link:'/dashbord',
  //   id:3
  // },
];
// Analytics Cards Data
