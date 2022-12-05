const shippingAddressModel = require("../../models/shippingaddress");
const paymentProcessModel = require("../../models/paymentprocess");
const uploadImagesModel = require("../../models/uploadimage");
var moment = require("moment");

exports.getAllUserData = async (req, res) => {
  const usersData = await shippingAddressModel.aggregate([
    {
      $lookup: {
        from: "userimageuploads", // collection to join
        localField: "uid", //field from the input documents
        foreignField: "uid", //field from the documents of the "from" collection
        as: "images",
      },
    },
    {
      $lookup: {
        from: "paymentprocesses", // collection to join
        localField: "uid", //field from the input documents
        foreignField: "uid", //field from the documents of the "from" collection
        as: "paymentdetails",
      },
    },
  ]);
  // console.log(usersData)
  res.status(200).json({
    success: "Successfully working",
    usersData,
  });
};

exports.getUserDataById = async (req, res) => {
  console.log(req.params.uid);

  const paymentData = await paymentProcessModel.findOne({
    oid: req.params.uid,
  });
  console.log(paymentData);
  if (paymentData) {
    const usersData = await shippingAddressModel.aggregate([
      {
        $match: {
          uid: paymentData.uid,
        },
      },
      {
        $lookup: {
          from: "userimageuploads", // collection to join
          localField: "uid", //field from the input documents
          foreignField: "uid", //field from the documents of the "from" collection
          as: "images",
        },
      },
      {
        $lookup: {
          from: "paymentprocesses", // collection to join
          localField: "uid", //field from the input documents
          foreignField: "uid", //field from the documents of the "from" collection
          as: "paymentdetails",
        },
      },
    ]);

    res.status(200).json({
      success: "Successfully working",
      status: 200,
      usersData,
    });
  } else {
    res.status(200).json({
      success: "Something went wrong",
      status: 400,
    });
  }
};

exports.getOrderThisWeek = async (req, res) => {
  const orderByWeek = await shippingAddressModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("isoweek").toDate(),
          $lt: moment().endOf("isoweek").toDate(),
        },
      },
    },
    {
      $lookup: {
        from: "userimageuploads", // collection to join
        localField: "uid", //field from the input documents
        foreignField: "uid", //field from the documents of the "from" collection
        as: "images",
      },
    },
    {
      $lookup: {
        from: "paymentprocesses", // collection to join
        localField: "uid", //field from the input documents
        foreignField: "uid", //field from the documents of the "from" collection
        as: "paymentdetails",
      },
    },
  ]);
  res.status(200).json({
    success: "Successfully working",
    status: 200,
    orderByWeek,
  });
};

exports.getOrderThisMonth = async (req, res) => {
  const orderByMonth = await shippingAddressModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: moment().startOf("month").toDate(),
          $lt: moment().endOf("month").toDate(),
        },
      },
    },
    {
      $lookup: {
        from: "userimageuploads", // collection to join
        localField: "uid", //field from the input documents
        foreignField: "uid", //field from the documents of the "from" collection
        as: "images",
      },
    },
    {
      $lookup: {
        from: "paymentprocesses", // collection to join
        localField: "uid", //field from the input documents
        foreignField: "uid", //field from the documents of the "from" collection
        as: "paymentdetails",
      },
    },
  ]);
  return res.status(200).json({
    success: "Successfully working",
    status: 200,
    orderByMonth,
  });
};

exports.deleteUser = async (req, res) => {
  const usersDataDeleteAddress = await shippingAddressModel.deleteMany({
    uid: req.params.uid,
  });
  const usersDataDeletePayment = await paymentProcessModel.deleteMany({
    uid: req.params.uid,
  });
  const usersDataDeleteImages = await uploadImagesModel.deleteMany({
    uid: req.params.uid,
  });

  if (
    usersDataDeleteAddress &&
    usersDataDeletePayment &&
    usersDataDeleteImages
  ) {
    return res.json({
      success: "Deleted Successfully",
      status: 200,
    });
  } else {
    return res.json({
      success: "Something went Wrong",
      status: 400,
    });
  }
};

exports.updateUser = async (req, res) => {
  console.log(req.body);
  const {
    uid,
    name,
    email,
    phone,
    address,
    city,
    pin,
    cardId,
    cardNumber,
    cardCvv,
    cardDate,
    cstatus,
  } = req.body;
  const paymentInfo = {
    cardNumber,
    cardHolderId: cardId,
    cardCvv,
    cardDate,
  };
  // if()
  let responseShippingDb = await shippingAddressModel.update(
    { uid },
    {
      fullName: name,
      email: email,
      phone: phone,
      address1: address,
      city: city,
      postalCode: pin,
      status: cstatus,
    }
  );
  let responsePaymentDb = await paymentProcessModel.update(
    { uid },
    { paymentInfo }
  );
  return res.json({
    success: "Update Successfully",
    status: 200,
  });
};

exports.updateUserShipping = async (req, res) => {
  console.log(req.body);
  const { uid, name, email, phone, address, city, pin } = req.body;

  let responseShippingDb = await shippingAddressModel.update(
    { uid },
    {
      fullName: name,
      email: email,
      phone: phone,
      address1: address,
      city: city,
      postalCode: pin,
    }
  );
  return res.json({
    success: "Update Successfully",
    status: 200,
  });
};



exports.updateStatus = async (req, res) => {
  console.log(req.body);
  const {uid, cstatus } = req.body;

  let responseShippingDb = await shippingAddressModel.update(
    { uid },
    {
      status: cstatus,
    }
  );
  return res.json({
    success: "Update Successfully",
    status: 200,
  });
};




exports.getLatestFiveUser = async (req, res) => {
  let responseShippingDb = await shippingAddressModel
    .aggregate([
      {
        $lookup: {
          from: "userimageuploads", // collection to join
          localField: "uid", //field from the input documents
          foreignField: "uid", //field from the documents of the "from" collection
          as: "images",
        },
      },
      {
        $lookup: {
          from: "paymentprocesses", // collection to join
          localField: "uid", //field from the input documents
          foreignField: "uid", //field from the documents of the "from" collection
          as: "paymentdetails",
        },
      },
    ])
    .sort("-updatedAt")
    .limit(5);
  // console.log(responseShippingDb)
  return res.json({
    success: "Update Successfully",
    status: 200,
    result: responseShippingDb,
  });
};





