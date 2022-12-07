const express = require("express");
const { route } = require("express/lib/application");
// const { nanoid } =require('nanoid')
const {
  getAllUserData,
  getUserDataById,
  getOrderThisWeek,
  getOrderThisMonth,
  deleteUser,
  updateUser,
  updateUserShipping,
  getLatestFiveUser,
  updateStatus,
} = require("../controller/admin/admincontroller");
const {
  signup,
  signin,
  verfyUser,
  logOut,
  changepassword,
} = require("../controller/admin/auth");
const {
  filterOrderTotalSpendingDescending,
  filterOrderTotalSpendingAscending,
  filterOrderByAmount,
  filterOrderByLocation,
  filterOrderByName,
  getLatestFiveOrder,
  getLatestFiveOrderThisMonth,
  getLatestFiveOrderThisWeek,
} = require("../controller/filter/order");
const {
  CustomerAccordingPhoneNumber,
} = require("../controller/filter/customer");
const {
  uploadImage,
  upload,
  imageuser,
  imagedelete,
  imageuploadsing,
  imageupload,
  cropped_img,
  social_image_upload,
  image_keep,
  uploadSocialPhoto,
  socialPhotoImport,
  paymentProcessing,
  paymentProcessingInformation,
  setframe,
  addShippingAddress,
  countUser,
  countOrder,
  getOrderCount,
  getUserCount,
} = require("../controller/usercontroller");
const { authencate } = require("../middleware/middleware");
const { addPages, getPages, getAllPages, getPageById, updatePageById, deletePageById, findPageByPageNumber } = require("../controller/page/pageController");
const {
  getCupon,
  addCupon,
  countLiveVisitor,
  deleteLiveVisitor,
  setLiveVisitor,
  addReview,
  getReview,
  deleteReview,
  getReviewById,
  updateReviewWithoutImage,
  updateReviewWithImage,
} = require("../controller/settings/setting");
const {
  addNewUser,
  getNewUserDay,
  getNewUserWeek,
  getNewUserMonth,
  getAllUserNew,
  addNewOrderCount,
  getAllOrderNew,
  getNewOrderDay,
  getNewOrderMonth,
  getNewOrderWeek,
} = require("../controller/filter/dashbord");


const multer = require("multer");
const path = require("path");




var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "public/reviewimage"));
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" +Math.floor((Math.random() * 100000000000) + 1)+`.${ext}`);
  },
});
const uploadImageNew = multer({ storage });







const router = express.Router();

//fontend apis
router.post("/imageupload", uploadImage, upload);
router.get("/get_image_by_user/:uid", imageuser);
router.get("/delete_image_by_user/:uid", imagedelete);
router.post("/imageupload_single", imageuploadsing, imageupload);
router.post("/cropped_img", cropped_img);
router.post("/socialimage_upload", social_image_upload);
router.put("/image_keep/:id", image_keep);
router.post("/frameselected", setframe);

router.post("/social-photo-import", uploadSocialPhoto, socialPhotoImport);
router.post("/payment-processing", paymentProcessing);
router.post("/payment-processing-information", paymentProcessingInformation);

// SHIPPING ROUTES
router.post("/addshippingaddress", addShippingAddress);

//get all user data
router.get("/getallusersdata", authencate, getAllUserData);
router.get("/getusersdatabyId/:uid", authencate, getUserDataById);
router.get("/totalorderthisweek", authencate, getOrderThisWeek);
router.get("/totalorderthismonth", authencate, getOrderThisMonth);
router.get("/user/delete/:uid", authencate, deleteUser);

//get letest Order
router.get("/user/getonlylatestdata", authencate, getLatestFiveUser);
router.get(
  "/user/getonlylatestdata/week",
  authencate,
  getLatestFiveOrderThisWeek
);
router.get(
  "/user/getonlylatestdata/month",
  authencate,
  getLatestFiveOrderThisMonth
);

/// admin signin and signup

router.post('/admin/signup',signup);
router.post("/admin/signin", signin);
router.post("/admin/verfy", verfyUser);
router.post("/admin/changepassword", changepassword)
router.post("/admin/logout", authencate, logOut);

//order filter options
router.get(
  "/getall/filter/order/totalspending/desc",
  authencate,
  filterOrderTotalSpendingDescending
);
router.get(
  "/getall/filter/order/totalspending/asce",
  authencate,
  filterOrderTotalSpendingAscending
);
router.get(
  "/getall/filter/order/searchByorderAmount/:amount",
  authencate,
  filterOrderByAmount
);
router.get(
  "/getall/filter/order/searchByLocation/:location",
  authencate,
  filterOrderByLocation
);
router.get(
  "/getall/filter/order/searchByName/:name",
  authencate,
  filterOrderByName
);
router.get(
  "/getall/filter/totaLspentbyuser",
  authencate,
  CustomerAccordingPhoneNumber
);

///add and get and delete pages
router.post("/admin/addPages", authencate, addPages);
router.post("/admin/getPages", getPages);
router.get("/admin/getAllPages", getAllPages);
router.post("/admin/getPagesById",getPageById);
router.post("/admin/updatePagesById",authencate,updatePageById)
router.post("/admin/deletePagesById",authencate,deletePageById)
router.post("/admin/getPageByPageNumber",authencate,findPageByPageNumber)


///update customer Data
router.post("/admin/customer/update", authencate, updateUser);
router.post("/admin/customer/shipping/update", authencate, updateUserShipping);
router.post("/admin/customer/shipping/update/status", authencate, updateStatus);

///admin settings
router.get("/admin/setting/getcupons", getCupon);
router.post("/admin/setting/addcupons", authencate, addCupon);
router.post("/admin/setting/addreview", authencate,uploadImageNew.array('image'), addReview);
router.get("/admin/setting/getreview", getReview);
router.post("/admin/setting/deletereview", authencate, deleteReview);
router.post("/admin/setting/getreviewById", getReviewById);
router.post("/admin/setting/updatereviewbyid/withoutimage",authencate, updateReviewWithoutImage);
router.post("/admin/setting/updatereviewbyid/withimage",authencate,uploadImageNew.array('image'),updateReviewWithImage);

//user count
router.post("/user/addusercount", countUser);
router.post("/user/addordercount", countOrder);
router.post("/user/livecount", countLiveVisitor);
router.post("/user/setlivecount", setLiveVisitor);
router.post("/user/deletelivecount", deleteLiveVisitor);

//get user count
router.get("/user/getordercount", getOrderCount);
router.get("/user/getusercount", getUserCount);

//user
router.get("/user/addnewusercount", addNewUser);
router.get("/user/getallnewusers", getAllUserNew);
router.get("/user/getnewuser/day", getNewUserDay);
router.get("/user/getnewuser/week", getNewUserWeek);
router.get("/user/getnewuser/month", getNewUserMonth);

//order
router.get("/user/addnewordercount", addNewOrderCount);
router.get("/user/getallneworder", getAllOrderNew);
router.get("/user/getneworder/day", getNewOrderDay);
router.get("/user/getneworder/week", getNewOrderWeek);
router.get("/user/getneworder/month", getNewOrderMonth);

module.exports = router;
