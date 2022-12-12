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
const fetch = require("node-fetch");
var axios = require("axios");
const moment = require("moment");
const filestack = require("filestack-js");

const smartcrop = require('smartcrop-sharp');

const filestackClient =  filestack.init(process.env.FILESTACK_KEY);

const storage = multer.memoryStorage()

const upload = multer({
  storage: storage,
});

const cdnBaseUrl = process.env.CDN_BASE_URL;
const minImgSize = 1600;
const maxImgSize = 2100;
const thumbSize = 250;

exports.uploadImage = upload.array("image", 20);

exports.imageuploadsing = upload.single("image");

exports.uploadSocialPhoto = upload.array("image", 20);

exports.imageupload = async (req, res) => {
 const smartCropRes = await smartcrop.crop(req.file.buffer, { width: minImgSize, height: minImgSize });

 var cropbox_data = {
    height: smartCropRes.topCrop.height,
    width: smartCropRes.topCrop.width,
    top: smartCropRes.topCrop.y,
    left: smartCropRes.topCrop.x,
  };

  const thumbBuffer = await sharp(req.file.buffer)
    .extract(cropbox_data)
    .resize(thumbSize)
    .toBuffer();

  const filestackThumbPromise = filestackClient.upload(thumbBuffer,undefined, {
    filename: 'thumb_'+ req.file.originalname
  });
    
  const filestackPromise = filestackClient.upload(req.file.buffer,undefined, {
    filename: req.file.originalname
  });

  const [filestackThumbPromiseResponse, filestackResponse] = await Promise.all([filestackThumbPromise,filestackPromise]);
  console.log("thumbUrl", filestackThumbPromiseResponse.url);
  console.log("filestackResponse", filestackResponse);

  const handle = filestackResponse.handle;

  console.log("cropbox_data", cropbox_data);

  var new_ar = {
    uid: req.body.uid,
    //image: req.file.filename,
    image: filestackResponse.url,
    frame: req.body.frametype,
    imageheight: req.body.imageheight,
    imagewidth: req.body.imagewidth,
    imageext: req.body.imageext,
    view_image: filestackThumbPromiseResponse.url,
    cropbox_data: cropbox_data,
    zoomvalue: 0,
    rotate: 0,
    handle
    // filestack_data: flstk_res,
  };
  //console.log(req.file);
  const response = Uploadimg.create(new_ar);
  Promise.all([filestackPromise, filestackThumbPromiseResponse, response]).then(()=>{
    res.status(200).json({
      success: "Successfully added",
    }); 
  })
};

exports.upload = async (req, res) => {
  for (var i = 0; i < req.files.length; i++) {
    img = req.files[i];

    const smartCropRes = await smartcrop.crop(img.buffer, { width: minImgSize, height: minImgSize });

    var cropbox_data = {
       height: smartCropRes.topCrop.height,
       width: smartCropRes.topCrop.width,
       top: smartCropRes.topCrop.y,
       left: smartCropRes.topCrop.x,
     };
   
     const thumbBuffer = await sharp(img.buffer)
       .extract(cropbox_data)
       .resize(thumbSize)
       .toBuffer();
   
     const filestackThumbPromise = filestackClient.upload(thumbBuffer,undefined, {
       filename: 'thumb_'+ img.originalname
     });
       
     const filestackPromise = filestackClient.upload(img.buffer,undefined, {
       filename: img.originalname
     });
   
   const [filestackThumbPromiseResponse, filestackResponse] = await Promise.all([filestackThumbPromise,filestackPromise]);

    var new_ar;
    if (req.body.frametype) {
      new_ar = {
        uid: req.body.uid[i],
        image: filestackResponse.url,
        imageheight: req.body.imageheight[i],
        imagewidth: req.body.imagewidth[i],
        imageext: req.body.imageext[i],
        view_image: filestackThumbPromiseResponse.url,
        frame: req.body.frametype[i],
        cropbox_data: cropbox_data,
        zoomvalue: 0,
        rotate: 0,
        handle: filestackResponse.handle
      };
    } else {
      new_ar = {
        uid: req.body.uid[i],
        image: filestackResponse.url,
        imageheight: req.body.imageheight[i],
        imagewidth: req.body.imagewidth[i],
        imageext: req.body.imageext[i],
        view_image: filestackThumbPromiseResponse.url,
        cropbox_data: cropbox_data,
        zoomvalue: 0,
        rotate: 0,
        handle: filestackResponse.handle
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

  for (var i = 0; i < req.body.filesUploaded.length; i++) {
      const handle =  req.body.filesUploaded[i].handle;
      const input = (await axios({ url: req.body.filesUploaded[i].url, responseType: "arraybuffer" })).data;
     
      const smartCropRes = await smartcrop.crop(input, { width: minImgSize, height: minImgSize });

      var cropbox_data = {
        height: smartCropRes.topCrop.height,
        width: smartCropRes.topCrop.width,
        top: smartCropRes.topCrop.y,
        left: smartCropRes.topCrop.x,
      };
   
      const aresp = await axios.get(`${cdnBaseUrl}/imagesize/${handle}`);
      console.log(aresp,"aresp");
      const thumbBuffer = await sharp(input)
        .extract(cropbox_data)
        .resize(thumbSize)
        .toBuffer();
    
      const filestackThumbPromiseResponse = await filestackClient.upload(thumbBuffer);
       
      var new_ar = {
        uid: req.body.uid,
        image: req.body.filesUploaded[i].url,
        imageheight: aresp.data.height,
        imagewidth: aresp.data.width,
        imageext: 0,
        view_image:  filestackThumbPromiseResponse.url,
        cropbox_data: cropbox_data,
        zoomvalue: 0,
        rotate: 0,
        filestack_data: req.body.filesUploaded[i],
        handle
      };
      await Uploadimg.create(new_ar);
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

exports.cropped_img = async (req, res) => {
    var base64Str = req.body.base64Image;
    
    var regex = /^data:.+\/(.+);base64,(.*)$/;
    var matches = base64Str.match(regex);
    var ext = matches[1];
    var data = matches[2];
    var buffer = Buffer.from(data, 'base64');
    var imgName = `image_${Date.now()}.${ext}`;

    const filestackPromise = filestackClient.upload(buffer,undefined, {
      filename: imgName
    });

    const filestackResponse = await filestackPromise;
 
    const cropeImage = filestackResponse.url;
    console.log(cropeImage);
  
    //console.log("cropped_img", req.body);
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
