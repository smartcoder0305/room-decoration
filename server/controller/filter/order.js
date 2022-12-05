const shippingAddressModel = require("../../models/shippingaddress");
var moment = require("moment");

///Filter By ToTal Amount Desc

exports.filterOrderTotalSpendingDescending = async (req, res) => {
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
    {
      $sort: { totalSpending: -1 },
    },
  ]);
  res.status(200).json({
    success: "Successfully working",
    usersData,
  });
};

///Filter By ToTal Amount Asc

exports.filterOrderTotalSpendingAscending = async (req, res) => {
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
    {
      $sort: { totalSpending: 1 },
    },
  ]);
  res.status(200).json({
    success: "Successfully working",
    usersData,
  });
};

///Filter By Amount

exports.filterOrderByAmount = async (req, res) => {
  console.log(req.params.amount);
  const usersData = await shippingAddressModel.aggregate([
    {
      $match: {
        totalSpending: parseInt(req.params.amount),
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
    {
      $sort: { totalSpending: 1 },
    },
  ]);
  res.status(200).json({
    success: "Successfully working",
    usersData,
  });
};

// program to reverse a string

// function reverseString(str) {
//     let myStrArray=[...str]
//     let myRevArray=myStrArray.reverse();
//     let newStringWithComma=myRevArray.toString();
//     let newString=newStringWithComma.replace (/,/g, "");
//     console.log(newString)
// }

///Filter By Location/City

exports.filterOrderByLocation = async (req, res) => {
  const usersData = await shippingAddressModel.aggregate([
    {
      $match: {
        city: `${req.params.location}`,
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
    {
      $sort: { totalSpending: 1 },
    },
  ]);
  res.status(200).json({
    success: "Successfully working",
    usersData,
  });
};

///Filter By Name

exports.filterOrderByName = async (req, res) => {
  const usersData = await shippingAddressModel.aggregate([
    {
      $match: {
        fullName: `${req.params.name}`,
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
    {
      $sort: { totalSpending: 1 },
    },
  ]);
  res.status(200).json({
    success: "Successfully working",
    usersData,
  });
};























exports.getLatestFiveOrder = async (req, res) => {
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
  return res.status(200).json({
    success: "Successfully working",
    status: 200,
    responseShippingDb,
  });
};




exports.getLatestFiveOrderThisMonth = async (req, res) => {
  let orderByMonth = await shippingAddressModel
    .aggregate([
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
    ])
    .sort("-updatedAt")
    .limit(5);
  // console.log(responseShippingDb)
  return res.json({
    success: "Update Successfully",
    status: 200,
    orderByMonth
  });
};

exports.getLatestFiveOrderThisWeek = async (req, res) => {
  const orderByWeek = await shippingAddressModel
    .aggregate([
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
    ])
    .sort("-updatedAt")
    .limit(5);
  res.status(200).json({
    success: "Successfully working",
    status: 200,
    orderByWeek,
  });
};
