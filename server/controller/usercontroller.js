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
const axios = require("axios");
const Dropbox = require('dropbox').Dropbox;
const moment = require("moment");
const filestack = require("filestack-js");
const smartcrop = require('smartcrop-sharp');
const aws = require('aws-sdk');

const filestackClient =  filestack.init(process.env.FILESTACK_KEY);

const storage = multer.memoryStorage()

const s3 = new aws.S3({
  params: {
    Bucket: process.env.S3_BUCKET,
  },
  accessKeyId: process.env.S3_ACCESS_ID,
  secretAccessKey: process.env.S3_ACCESS_KEY,
});

const upload = multer({
  storage: storage,
});

const cdnBaseUrl = process.env.CDN_BASE_URL;
const minImgSize = 1600;
const maxImgSize = 2100;
const maxOriginSize = 2500;
const thumbSize = 250;

const FRAMES = {
  classic: "קלאסי",
  bold: "נועז",
  ever: "נקי",
  clean: "אותנטי",
};

exports.uploadImage = upload.array("image", 20);

exports.imageuploadsing = upload.single("image");

exports.uploadSocialPhoto = upload.array("image", 20);

exports.imageupload = async (req, res) => {
  console.log('imageUpload')
 let newBuffer, newWid, newHei;
 newBuffer = req.file.buffer;
 newWid = req.body.imagewidth;
 newHei = req.body.imageheight;
 if (req.body.imageheight > maxOriginSize && req.body.imagewidth > maxOriginSize) {
  if (req.body.imageheight > req.body.imagewidth) {
    newWid = maxOriginSize;
    newHei = Math.floor(req.body.imageheight / req.body.imagewidth * maxOriginSize);
  } else {
    newHei = maxOriginSize;
    newWid = Math.floor(req.body.imagewidth / req.body.imageheight * maxOriginSize);
  }
  newBuffer = await sharp(req.file.buffer)
  .resize({ width: newWid, height: newHei })
  .toBuffer();
 }

 const smartCropRes = await smartcrop.crop(newBuffer, { width: minImgSize, height: minImgSize });
  console.log('smartsharpResult', smartCropRes)
 var cropbox_data = {
    height: smartCropRes.topCrop.height,
    width: smartCropRes.topCrop.width,
    top: smartCropRes.topCrop.y,
    left: smartCropRes.topCrop.x,
  };
  const cropBuffer = await sharp(newBuffer)
    .extract(cropbox_data)
    .withMetadata()
    .toBuffer();
  const thumbBuffer = await sharp(newBuffer)
    .extract(cropbox_data)
    .withMetadata() 
    .resize(thumbSize)
    .withMetadata()
    .toBuffer();
  console.log('thumbResult')
  const filestackCropPromise = filestackClient.upload(cropBuffer,undefined, {
    filename: 'crop_'+ req.file.originalname
  });

  const filestackThumbPromise = filestackClient.upload(thumbBuffer,undefined, {
    filename: 'thumb_'+ req.file.originalname
  });
    
  const filestackPromise = filestackClient.upload(newBuffer,undefined, {
    filename: req.file.originalname
  });

  const [filestackCropPromiseResponse, filestackThumbPromiseResponse, filestackResponse] = await Promise.all([filestackCropPromise, filestackThumbPromise,filestackPromise]);
  console.log("thumbUrl", filestackThumbPromiseResponse.url);
  console.log("filestackResponse", filestackResponse);

  const handle = filestackResponse.handle;

  console.log("cropbox_data", cropbox_data);

  var new_ar = {
    uid: req.body.uid,
    //image: req.file.filename,
    image: filestackResponse.url,
    frame: req.body.frametype,
    imageheight: newHei,
    imagewidth: newWid,
    imageext: req.body.imageext,
    crop_image: filestackCropPromiseResponse.url,
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
  let newBuffer, newWid, newHei;
  for (var i = 0; i < req.files.length; i++) {
    img = req.files[i];

    newBuffer = img.buffer;
    newWid = req.body.imagewidth[i];
    newHei = req.body.imageheight[i];
    if (req.body.imageheight[i] > maxOriginSize && req.body.imagewidth[i] > maxOriginSize) {
    if (req.body.imageheight[i] > req.body.imagewidth[i]) {
      newWid = maxOriginSize;
      newHei = Math.floor(req.body.imageheight[i] / req.body.imagewidth[i] * maxOriginSize);
    } else {
      newHei = maxOriginSize;
      newWid = Math.floor(req.body.imagewidth[i] / req.body.imageheight[i] * maxOriginSize);
    }
    newBuffer = await sharp(img.buffer)
    .resize({ width: newWid, height: newHei })
    .toBuffer();
    }

    const smartCropRes = await smartcrop.crop(newBuffer, { width: minImgSize, height: minImgSize });

    var cropbox_data = {
       height: smartCropRes.topCrop.height,
       width: smartCropRes.topCrop.width,
       top: smartCropRes.topCrop.y,
       left: smartCropRes.topCrop.x,
     };
    const cropBuffer = await sharp(newBuffer)
      .extract(cropbox_data)
      .withMetadata()
      .toBuffer();
     const thumbBuffer = await sharp(newBuffer)
       .extract(cropbox_data)
       .withMetadata()
       .resize(thumbSize)
       .withMetadata()
       .toBuffer();
   
    const filestackCropPromise = filestackClient.upload(cropBuffer,undefined, {
      filename: 'crop_'+ req.file.originalname
    });

     const filestackThumbPromise = filestackClient.upload(thumbBuffer,undefined, {
       filename: 'thumb_'+ img.originalname
     });
       
     const filestackPromise = filestackClient.upload(newBuffer,undefined, {
       filename: img.originalname
     });
   
   const [filestackCropPromiseResponse, filestackThumbPromiseResponse, filestackResponse] = await Promise.all([filestackThumbPromise,filestackPromise]);
    console.log("body", req.body);
    var new_ar;
    if (req.body.frametype) {
      new_ar = {
        uid: req.body.uid[i],
        image: filestackResponse.url,
        imageheight: newHei,
        imagewidth: newWid,
        imageext: req.body.imageext[i],
        crop_image: filestackCropPromiseResponse.url,
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
        imageheight: newHei,
        imagewidth: newWid,
        imageext: req.body.imageext[i],
        crop_image: filestackCropPromiseResponse.url,
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
      const cropBuffer = await sharp(input)
        .extract(cropbox_data)
        .withMetadata()
        .toBuffer();
      const thumbBuffer = await sharp(input)
        .extract(cropbox_data)
        .withMetadata()
        .resize(thumbSize)
        .withMetadata()
        .toBuffer();
    
      const filestackCropPromiseResponse = await filestackClient.upload(cropBuffer);
      const filestackThumbPromiseResponse = await filestackClient.upload(thumbBuffer);
       
      var new_ar = {
        uid: req.body.uid,
        image: req.body.filesUploaded[i].url,
        imageheight: aresp.data.height,
        imagewidth: aresp.data.width,
        imageext: 0,
        crop_image: filestackCropPromiseResponse.url,
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
  try {

    console.log('editing image');
    // let base64Str = req.body.base64Image;
    // console.log(base64Str);
    // let regex = /^data:.+\/(.+);base64,(.*)$/;
    // let subBase64Str = base64Str.substring(0, 50);
    // console.log('######### - subBase64Str - ', subBase64Str)
    // let matches = subBase64Str.match(regex);
    // if (!matches) {
    //   res.status(404).json({
    //     message: "Invalid Image",
    //   });
    //   return
    // }
    // let splitBase64Str = base64Str.split(';base64,');
    // console.log('matches', matches);
    // let ext = matches[1];
    // let data = splitBase64Str[1];
    // // console.log('base64 Data', data);
    // let buffer = Buffer.from(data, 'base64');
    var query = { _id: req.body.id };
    const img = await Uploadimg.findOne(query)
    console.log('imgData', img)
    const cropbox_data = req.body.cropbox_data;
    console.log('cropbox_data', cropbox_data);
    const defaultSize = req.body.defaultSize;
    console.log('defaultSize', defaultSize);
    let rate = 1.0;
    if (req.body.zoomvalue != 0) {
      const minSize = cropbox_data.width > cropbox_data.height ? cropbox_data.height : cropbox_data.width;
      rate = minSize / defaultSize;
    }
    console.log('rate', rate);
    const imgBuffer = (await axios({ url: img.image, responseType: "arraybuffer" })).data;
    let imageSize = img.imagewidth;
    if (img.imagewidth > img.imageheight) imageSize = img.imageheight;
    const buffer = await sharp(imgBuffer)
      .extract({
        width: Math.floor(imageSize / rate),
        height: Math.floor(imageSize / rate),
        top: Math.round(-cropbox_data.top * (img.imageheight / cropbox_data.height)),
        left: Math.round(-cropbox_data.left * (img.imagewidth / cropbox_data.width)),
      })
      .withMetadata()
      .toBuffer();
    console.log('read the buffer', buffer);
    let imgName = `crop_${Date.now()}.${img.imageext}`;

    const filestackPromise = filestackClient.upload(buffer,undefined, {
      filename: imgName
    });

    const filestackResponse = await filestackPromise;
    console.log('fileStackResponse', filestackResponse);
    const cropeImage = filestackResponse.url;
    console.log(cropeImage);
  
    //console.log("cropped_img", req.body);
     updated = {
      crop_image: cropeImage,
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
    } else {
      console.log('db update bug exists.')
    }
    console.log("File created");
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: err.message
    });
  }
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

////// Order Controller/////////

const s3Upload = async (fileData, filePath) => {
  try {
    await new Promise((resolve, reject) => {
      s3.upload({
        Key: filePath,
        Body: fileData,
      }).send(async (errS3, data) => {
        if (errS3) {
          reject(errS3);
        } else {
          resolve(data);
        }
      })
    })
    return true;
  } catch (err) {
    throw err;
  }
}

exports.createOrder = async (req, res) => {
  console.log(req.body);
  try {
    const maxOid = await orderAddModel.findOne({}).sort({ oid: -1 }).limit(1);
    console.log('max::::', maxOid.oid);

    const oid = maxOid.oid ? maxOid.oid + 1 : 534410001;

    console.log('oid::::', oid);
    const orderCreate = await orderAddModel.create({uid: req.body.uid, oid: oid});

    console.log('orderCreate:::::::', orderCreate);

    const images = await Uploadimg.find({uid: req.body.uid});
    
    console.log('images::::::::::::::', images);

    
    const dropboxPathPrefix = `${req.body.fullName}-${oid}-${moment(new Date()).format("YYYYMMDD")}`;
    const refreshToken = 'RtDd-LHLoDMAAAAAAAAAAb-5hg4ej83o08Qtdc-oV9SyAuHVH_4s7VGMD3ZQItM-';

    const config = {
      fetch,
      refreshToken,
      clientId: 'nl6j3bv23jotwxo',
      clientSecret: 'qvl1k1yywokz6d8'
    };

    const dbx = new Dropbox(config);

    for(let index = 0 ; index < images.length ; index++) {
      const destinationPath = `${dropboxPathPrefix}/${oid}-${index}.png`
      const imgBuffer = (await axios({ url: images[index].crop_image, responseType: "arraybuffer" })).data;
      console.log('uploaded file to Dropbox at: ', destinationPath);
      await s3Upload(imgBuffer, destinationPath);
    }

    const orderText = `(1) Name of chosen frame : ${FRAMES[images[0].frame || 'classic']}
(2) Full Customer Name : ${req.body.fullName}
(3) Email : ${req.body.email}
(4) Address : ${req.body.address}
(5) City : ${req.body.city}
(6) Postal Code : ${req.body.zipCode}
(7) Notes : ${req.body.arrivalInstructions}
(8) Total number of frames : ${images.length}
(9) Date and time of order : ${moment(new Date()).format("MM/DD/YYYY")}
(10) Order ID : ${oid}`;
    
    console.log('orderText:::::::::', orderText);
    await s3Upload(orderText, `${dropboxPathPrefix}/order.txt`);

    res.json({
      success: "Successfully working",
      status: 200,
    });
  } catch (error) {
    console.log('error:::::::::::::',error);
    res.json({
      success: "Something went wrong",
      status: 400,
    });
  }  
}