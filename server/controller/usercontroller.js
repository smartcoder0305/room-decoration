const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
// const Jimp = require("jimp");
const request = require("request");
const Uploadimg = require("../models/uploadimage");
const shippingAddressModel = require("../models/shippingaddress");
const paymentProcessModel = require("../models/paymentprocess");
const orderAddModel = require("../models/order");
const userCountModel = require("../models/countUser");
var base64Img = require("base64-img");
const fetch = require("node-fetch");
var axios = require("axios");
const moment = require("moment");

const filestack = require("filestack-js");
const { exit } = require("process");
// const filestack_client = filestack.init("AjG97B0OhQvK5XYN9228xz"); // Champ
//const filestack_client = filestack.init("A91T8CN73Qa64EuVi4Kkgz"); // Client

const multerconfig = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    callback(null, `image_${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerconfig,
});

exports.uploadImage = upload.array("image", 20);

exports.imageuploadsing = upload.single("image");

exports.uploadSocialPhoto = upload.array("image", 20);

exports.imageupload = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  let original_img_width = parseInt(req.body.imagewidth);
  let original_img_height = parseInt(req.body.imageheight);
  if (original_img_width <= original_img_height) {
    var crop_size = original_img_width;
  } else {
    var crop_size = original_img_height;
  }

  sharp("public/images/" + req.file.filename)
    .rotate()
    .resize(crop_size, crop_size)
    .toFile("public/images/upload" + req.file.filename)
    .then((data) => {
      // console.log("succ",data)
    })
    .catch((err) => {
      //console.log(err)
    });

  const original_file_path = "public/images/" + req.file.filename;
  const viewimageFileName = "public/images/upload" + req.file.filename;
  console.log(original_file_path);
  //filestack_client.upload("../public/images/" + req.file.filename);
  //filestack_client.upload( "../public/images/" + req.file.filename ).then( res => console.log(res) );

  // const imgurl =
  //   "https://stickable-admin.yeshostings.com/public/images/image_1645898571016.jpeg";
  //.storeURL(imgurl)
  // filestack_client.upload(original_file_path).then(async (flstk_res) => {
  img = req.files;
  var cropbox_data = {
    height: crop_size,
    width: crop_size,
    top: 0,
    left: 0,
  };
  var new_ar = {
    uid: req.body.uid,
    //image: req.file.filename,
    image: original_file_path,
    frame: req.body.frametype,
    imageheight: req.body.imageheight,
    imagewidth: req.body.imagewidth,
    imageext: req.body.imageext,
    view_image: viewimageFileName,
    cropbox_data: cropbox_data,
    zoomvalue: 0,
    rotate: 0,
    // filestack_data: flstk_res,
  };
  //console.log(req.file);
  const response = await Uploadimg.create(new_ar);
  res.status(200).json({
    success: "Successfully added",
  });
  // })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  /* img = req.files;
  var cropbox_data = {
    height: crop_size,
    width: crop_size,
    top: 0,
    left: 0,
  };
  var new_ar = {
    uid: req.body.uid,
    //image: req.file.filename,
    image: original_file_path,
    imageheight: req.body.imageheight,
    imagewidth: req.body.imagewidth,
    imageext: req.body.imageext,
    view_image: req.file.filename,
    cropbox_data: cropbox_data,
    zoomvalue: 0,
    rotate: 0,
    //filestack_data: flstk_res,
  };
  //console.log(req.file);
  const response = await Uploadimg.create(new_ar);
  res.status(200).json({
    success: "Successfully added",
  }); */
};

exports.upload = async (req, res) => {
  console.log(req.files);
  console.log(req.body);
  for (var i = 0; i < req.files.length; i++) {
    img = req.files[i];
    // const original_file_path = "public/images/" + req.file.filename;
    const data = await sharp("public/images/" + img.filename)
      .rotate()
      .resize(600, 600)
      .toFile("public/images/upload" + img.filename);

    console.log(data);

    const original_file_path = "public/images/" + img.filename;

    const view_image_name = `public/images/upload${img.filename}`;

    var cropbox_data = {
      height: 600,
      width: 600,
      top: 0,
      left: 0,
    };

    //     const original_file_path = img.destination+"/"+ img.filename

    // console.log(original_file_path)
    //  const filestackresponse=await filestack_client.upload(original_file_path)
    //  console.log(filestackresponse)

    var new_ar;
    if (req.body.frametype) {
      new_ar = {
        uid: req.body.uid[i],
        image: original_file_path,
        imageheight: req.body.imageheight[i],
        imagewidth: req.body.imagewidth[i],
        imageext: req.body.imageext[i],
        view_image: view_image_name,
        frame: req.body.frametype[i],
        cropbox_data: cropbox_data,
        zoomvalue: 0,
        rotate: 0,
        // filestack_data: filestackresponse
        // frame:req.body.
      };
    } else {
      new_ar = {
        uid: req.body.uid[i],
        image: original_file_path,
        imageheight: req.body.imageheight[i],
        imagewidth: req.body.imagewidth[i],
        imageext: req.body.imageext[i],
        view_image: view_image_name,
        cropbox_data: cropbox_data,
        zoomvalue: 0,
        rotate: 0,
        // filestack_data: filestackresponse
        // frame:req.body.
      };
    }

    const response = await Uploadimg.create(new_ar);
  }
  //const response = await Uploadimg.create(new_ar);

  //  console.log(req.files);
  res.status(200).json({
    success: "Successfully added",
  });
};

exports.socialPhotoImport = async (req, res) => {
  //console.log(req.body.uid);
  //console.log(req.body.filesUploaded[0])
  /* console.log(req.body.filesUploaded[1].url)
  console.log(req.body.filesUploaded.length) */

  console.log(req.body);

  var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
    });
  };

  for (var i = 0; i < req.body.filesUploaded.length; i++) {
    dtFileName = `image_${Date.now()}.png`;
    download(
      req.body.filesUploaded[i].url,
      `public/images/${dtFileName}`,
      async () => {
        await sharp("public/images/" + dtFileName)
          .metadata()
          .then((data) => {
            imgW = data.width;
            imgH = data.height;
          })
          .catch((err) => {
            console.log(err);
          });

        let original_img_width = parseInt(imgW);
        let original_img_height = parseInt(imgH);
        if (original_img_width <= original_img_height) {
          var crop_size = original_img_width;
        } else {
          var crop_size = original_img_height;
        }

        await sharp("public/images/" + dtFileName)
          .rotate()
          .resize(crop_size, crop_size)
          .toFile("public/images/upload" + dtFileName)
          .then((data) => {
            console.log("succ", data);
          })
          .catch((err) => {
            console.log(err);
          });
        const original_file_path = "public/images/" + dtFileName;
        const viewImage = "public/images/upload" + dtFileName;

        var cropbox_data = {
          height: crop_size,
          width: crop_size,
          top: 0,
          left: 0,
        };
        console.log(req.body.filesUploaded[i]);
        var new_ar = {
          uid: req.body.uid,
          image: original_file_path,
          imageheight: imgH,
          imagewidth: imgW,
          imageext: 0,
          view_image: viewImage,
          cropbox_data: cropbox_data,
          zoomvalue: 0,
          rotate: 0,
          filestack_data: req.body.filesUploaded[i],
        };
        await Uploadimg.create(new_ar);
      }
    );
  }
  //  console.log(req.files);
  res.status(200).json({
    success: "Successfully added",
  });
};

exports.imageuser = async (req, res) => {
  //console.log(req.params.uid);

  const getdata = await Uploadimg.find({ uid: req.params.uid });

  res.status(200).json({
    status: 1,
    data: getdata,
  });
};

/////////////////// Image delete ////////////////////

exports.imagedelete = async (req, res) => {
  const deldata = await Uploadimg.deleteOne({ _id: req.params.uid });
  res.status(200).json({
    status: 1,
    message: "Image Sucessfully Deleted Raidhoni",
  });
};


// exports.cropped_img = async (req, res) => {

//   var base64Str = req.body.base64Image;
//   var filepath = base64Img.imgSync(base64Str, 'public/images/', `image_${Date.now()}`);
// // console.log(base64Str)

//   console.log(filepath)
//   // console.log(grtData)

//   myimageArray = filepath.split('\\');
// // Jimp.read(myimageArray, (err, res) => {
// //     if (err) throw new Error(err);
// //     res.quality(5).write('public/images/', `image_${Date.now()}`);
// //   });

//   // const original_file_path = "public/images/" + myArray[2];

//   // var imgdata = `public/images/image_${Date.now()}.png`;
//   // const grtData=await fs.writeFile(imgdata, base64Str, { encoding: "base64" })
// //  const filestackresponse=await filestack_client.upload(original_file_path)

// //  console.log(filestackresponse)

//   // var img = req.body.base64Image;
//   // var imgdata = `public/images/image_${Date.now()}.png`;

//   // console.log(grtData)

//   // console.log(req.body)

//   const cropeImage=`public/images/${myimageArray[2]}`

//     var query = { _id: req.body.id };
//     updated = {
//       view_image: cropeImage,
//       rotate: req.body.rotate,
//       zoomvalue: req.body.zoomvalue,
//       cropbox_data: req.body.cropbox_data,
//       image:cropeImage
//     };

//     var response = await Uploadimg.findOneAndUpdate(query,updated,{ upsert: true });
//     if(response){
//       res.status(200).json({
//         message: "Image Save Sucessfully",
//       });
//     }
//     console.log('File created');
// };

exports.cropped_img = async (req, res) => {
  var base64Str = req.body.base64Image;
  var imgName = `image_${Date.now()}`;
  var filepath = base64Img.imgSync(base64Str, "public/images/", imgName);
  console.log(filepath);

  myimageArray = filepath.split("\\");
  // const original_file_path = "public/images/" + myArray[2];

  //  const filestackresponse=await filestack_client.upload(original_file_path)

  //  console.log(filestackresponse)

  // var img = req.body.base64Image;
  // var imgdata = `public/images/image_${Date.now()}.png`;
  // const grtData=await fs.writeFile(imgdata, img, { encoding: "base64" })
  // console.log(grtData)

  // console.log(req.body)

  const cropeImage = `public/images/${imgName}.png`;
  console.log(cropeImage);

  var query = { _id: req.body.id };
  updated = {
    view_image: cropeImage,
    rotate: req.body.rotate,
    zoomvalue: req.body.zoomvalue,
    cropbox_data: req.body.cropbox_data,
    //image:cropeImage
  };

  var response = await Uploadimg.findOneAndUpdate(query, updated, {
    upsert: true,
  });
  if (response) {
    res.status(200).json({
      message: "Image Save Sucessfully",
    });
  }
  console.log("File created");
};

exports.social_image_upload = async (requ, resp) => {
  //  console.log(req.body);
  // res.status(200).json({
  //     response:req.body
  // })

  var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
    });
  };

  download(
    requ.body.link,
    `public/images/image_${Date.now()}.png`,
    async () => {
      var new_ar = {
        uid: requ.body.uid,
        image: `public/images/image_${Date.now()}.png`,
      };
      //console.log(req);
      const response = await Uploadimg.create(new_ar);

      resp.status(200).json({
        status: 1,
        message: "Image successfully uploaded",
      });
    }
  );
};

exports.image_keep = async (req, res) => {
  console.log("image_keep",req.params.id);
  let query = { _id: req.params.id };
  updated = { keepImage: true };

  const response = await Uploadimg.findOneAndUpdate(
    query,
    updated,
    { upsert: true }
  );
  
  if(response){
      res.status(200).json({
        message: "Image Save Sucessfully",
      });
    }
};

exports.paymentProcessing = async (req, res) => {
  try {
    const frameQuantity = req.body.frameQuantity;
    const uniqueUserId = req.body.uniqueUserId;
    const orderId = req.body.oid;
    const cardInfo = req.body.cardInfo;
    const { totalPrice } = req.body.totalPrice;
    console.log("totalPrice");
    console.log(totalPrice);
    const finalPrice = req.body.totalPrice;
    const { email } = req.body.shippingAddressFormValues;
    const { fullName } = req.body.shippingAddressFormValues;
    const { phone } = req.body.shippingAddressFormValues;

    req.body.shippingAddressFormValues.totalSpending = finalPrice;
    req.body.shippingAddressFormValues.uid = uniqueUserId;
    console.log(req.body.shippingAddressFormValues.phone);
    // console.log({
    //   finalPrice,
    //   uniqueUserId,
    //   finalPrice,
    //   email,
    //   fullName,
    //   phone,
    //   orderId,
    //   cardInfo,
    // });
    // console.log(sucessUrl);
    const orderResponse = await orderAddModel.find({});
    console.log(orderResponse);
    if (orderResponse.length === 0) {
      const orderCreate = await orderAddModel.create({
        oid: 4410000,
      });
      const sucessUrl = `/payment-success?price=${finalPrice}&orderid=${4410000}&email=${email}&imagescount=${frameQuantity}`;
      if (orderCreate) {
        const payment_process_data = {
          uid: uniqueUserId,
          paymentInfo: cardInfo,
          oid: 4410000,
          phone: req.body.shippingAddressFormValues.phone,
          finalPrice: finalPrice,
        };

        const response_payment_process = await paymentProcessModel.create(
          payment_process_data
        );
        const addressresponse = await shippingAddressModel.create(
          req.body.shippingAddressFormValues
        );





        //sms function
        // sendOrderSMS(finalPrice, frameQuantity, oid);







        return res.status(200).send({ sucessUrl });
      }
    } else {
      const orderCreate = await orderAddModel.findOneAndUpdate(
        { checkid: 1001 },
        { oid: orderResponse[0].oid + 1 }
      );
      if (orderCreate) {
        const orderResponse = await orderAddModel.find({});
        if (orderResponse) {
          const payment_process_data = {
            uid: uniqueUserId,
            paymentInfo: cardInfo,
            oid: orderResponse[0].oid,
            finalPrice: finalPrice,
            phone,
          };
          const orderId = orderResponse[0].oid;
          const sucessUrl = `/payment-success?price=${finalPrice}&orderid=${orderResponse[0].oid}&email=${email}&imagescount=${frameQuantity}`;
          const response_payment_process = await paymentProcessModel.create(
            payment_process_data
          );
          const addressresponse = await shippingAddressModel.create(
            req.body.shippingAddressFormValues
          );







          //sms function
          sendOrderSMS(finalPrice, frameQuantity, oid);










          const data = {
            finalPrice,
            oid: orderId,
            email,
            frameQuantity,
          };

          return res.status(200).send({ sucessUrl, odata: data });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Something went wrong");
  }

  // var options = {
  //   method: 'POST',
  //   url: 'https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentProcess',
  //   headers:
  //   {
  //     'cache-control': 'no-cache',
  //     'content-type': 'multipart/form-data;'
  //   },
  //   formData: {
  //     'pageCode': "26ba17d7e4f6",
  //     'userId': "dedb062057443f82",
  //     'sum': finalPrice,
  //     'successUrl': sucessUrl,
  //     'cancelUrl': "/review-your-images",
  //     'description': uniqueUserId,
  //     'pageField[fullName]': fullName,
  //     'pageField[phone]': phone,
  //     'pageField[email]': email,

  //   }
  // };

  //   request(options, async function (error, response, body) {
  //     if (error) throw new Error(error);
  //     console.log('error')
  //     console.log(error)
  //     var body = JSON.parse(body)
  //     console.log('this is body')
  //     console.log(body);

  //     var payment_process_data = {
  //       uid: uniqueUserId,
  //       paymentInfo: body.data,
  //       paymentSource: 'meshulam'
  //     };
  //     const response_payment_process = await paymentProcessModel.create(payment_process_data);
  //     console.log('this is payment response_payment_process')
  //     console.log(response_payment_process)
  //     const addressresponse = await shippingAddressModel.create(req.body.shippingAddressFormValues);
  //     console.log(addressresponse)

  // if(body.status!=1){
  //   // console.log(body)
  //   // console.log('lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll')
  //   body.data={
  //     url:'/review-your-images?data=paymentdataerror'
  //   }
  //   return res.send(body);
  // }
  //     return res.send(body);
  //     /* return res.status(response.statusCode).json({
  //       status: 1,
  //       error: error,
  //       status: response.statusCode,
  //       headers: JSON.stringify(response.headers),
  //       response: JSON.stringify(body)
  //     }); */
  //   });
};

function sendOrderSMS(price, amount, oid) {
  var data = JSON.stringify({
    Data: {
      Message: `New order in Stickable, Price: ${price} , Amount: ${amount} , Order ID: ${oid} , Date: ${moment().format(
        "L"
      )}, Time:${moment().format("LT")}`,
      Recipients: [
        {
          Phone: 548057015,
        },
      ],
      Settings: {
        Sender: "Stickable",
      },
    },
  });

  var config = {
    method: "post",
    url: "https://capi.inforu.co.il/api/v2/SMS/SendSms",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic c2tpcG91dDo1YTg5NWNmOS1kYTVlLTQ4Y2QtYTk5My1lOWYyY2NiODc0M2Y",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

exports.paymentProcessingInformation = async (req, res) => {
  const processId = req.body.processId;
  const processToken = req.body.processToken;
  const uniqueUserId = req.body.uniqueUserId;

  var options = {
    method: "POST",
    url: "https://sandbox.meshulam.co.il/api/light/server/1.0/getPaymentProcessInfo",
    headers: {
      "cache-control": "no-cache",
      "content-type": "multipart/form-data;",
    },
    formData: {
      pageCode: "26ba17d7e4f6",
      processId: processId,
      processToken: processToken,
    },
  };

  request(options, async function (error, response, body) {
    if (error) throw new Error(error);
    var body = JSON.parse(body);
    console.log(body);

    var query = {
      uid: uniqueUserId,
      processId: processId,
      processToken: processToken,
    };
    updated = {
      paymentProcessInfo: body,
    };
    var response_payment_process = await paymentProcessModel.findOneAndUpdate(
      query,
      updated,
      { upsert: true },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    );

    return res.send(body);
  });
};

// update frame

exports.setframe = async (req, res) => {
  const { userid, type } = req.body;
  console.log(req.body);
  const response = await Uploadimg.updateMany({ uid: userid }, { frame: type });
  console.log(response);
};

//add shipping address

exports.addShippingAddress = async (req, res) => {
  const { userId, userShippingData } = req.body;

  const getipresponse = await fetch("https://api.ipify.org/?format=json");
  const ipAddress = await getipresponse.json();

  var userData = {
    uid: userId,
    fullName: userShippingData.fullName,
    address1: userShippingData.address1,
    address2: userShippingData.address2,
    city: userShippingData.city,
    postalCode: userShippingData.postalCode,
    phone: userShippingData.phone,
    email: userShippingData.email,
    ipAddress: ipAddress.ip,
  };

  // const saveUserAddressResponse = await shippingAddressModel.create(userData);
  // console.log(saveUserAddressResponse)

  const saveUserAddres = shippingAddressModel(userData);
  const saveUserAddressResponse = await saveUserAddres.save();
  console.log(saveUserAddressResponse);
};

exports.countUser = async (req, res) => {
  console.log('=======================')
  try {
    const getUser = await userCountModel.findOne({ name: "user" });
    if (!getUser) {
      console.log('---------------')
      const user = new userCountModel({ name: "user", count: 1 });
      const dataRes = await user.save();
      // console.log(usersData)
      res.json({
        success: "Successfully working",
        status: 200,
        dataRes,
      });
    } else {
      console.log('++++++++++++')
      const { count } = getUser;
      console.log(count)
      const dataRes = await userCountModel.findOneAndUpdate(
        { name: "user" },
        { count: count + 1 }
      );
      res.json({
        success: "Successfully working",
        status: 200,
        dataRes,
      });
    }
  } catch (error) {
    res.json({
      success: "Something went wrong",
      status: 400,
    });
  }
  // var response_payment_process = await userCountModel.findOneAndUpdate({})
};

exports.countOrder = async (req, res) => {
  try {
    const getUser = await userCountModel.findOne({ name: "order" });
    if (!getUser) {
      const user = new userCountModel({ name: "order", count: 1 });
      const dataRes = await user.save();
      // console.log(usersData)
      res.json({
        success: "Successfully working",
        status: 200,
        dataRes,
      });
    } else {
      const { count } = getUser;
      const dataRes = await userCountModel.findOneAndUpdate(
        { name: "order" },
        { count: count + 1 }
      );
      res.json({
        success: "Successfully working",
        status: 200,
        dataRes,
      });
    }
  } catch (error) {
    res.json({
      success: "Something went wrong",
      status: 400,
    });
  }
};

exports.getOrderCount = async (req, res) => {
  try {
    const getUser = await userCountModel.findOne({ name: "order" });
    if (getUser) {
      res.json({
        success: "Successfully working",
        status: 200,
        getUser,
      });
    } else {
      res.json({
        success: "Something went wrong",
        status: 400,
      });
    }
  } catch (error) {
    res.json({
      success: "Something went wrong",
      status: 400,
    });
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const getUser = await userCountModel.findOne({ name: "user" });
    if (getUser) {
      res.json({
        success: "Successfully working",
        status: 200,
        getUser,
      });
    } else {
      res.json({
        success: "Something went wrong",
        status: 400,
      });
    }
  } catch (error) {
    res.json({
      success: "Something went wrong",
      status: 400,
    });
  }
};
