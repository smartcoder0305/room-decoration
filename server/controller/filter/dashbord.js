const countNewVistorModel = require("../../models/admin/countVisitornew");
const countNewOrderrModel = require("../../models/admin/countOrder");
var moment = require("moment");

///////////USERS
exports.addNewUser = async (req, res) => {
  try {
    const user = new countNewVistorModel();
    const usersData = await user.save();
    res.status(200).json({
      status: 200,
      success: "Successfully working",
      usersData,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: "Something Went Wrong",
    });
  }
};

exports.getAllUserNew = async (req, res) => {
  try {
    let newUser = await countNewVistorModel.find();

    res.status(200).json({
      status: 200,
      success: "Successfully working",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: "Something Went Wrong",
    });
  }
};

exports.getNewUserMonth = async (req, res) => {
  try {
    let newUser = await countNewVistorModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: moment().startOf("month").toDate(),
            $lt: moment().endOf("month").toDate(),
          },
        },
      },
    ]);

    res.status(200).json({
      status: 200,
      success: "Successfully working",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: "Something Went Wrong",
    });
  }
};

exports.getNewUserWeek = async (req, res) => {

  // console.log("Dataeeeeeeeeeeeeeee");
  // console.log(moment().startOf("isoweek").isoWeekday(0).format("dddd, MMMM Do YYYY, h:mm:ss a"));
  // console.log(moment().endOf("isoweek").isoWeekday(6).format("dddd, MMMM Do YYYY, h:mm:ss a"));
  try {
    let newUser = await countNewVistorModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: moment().startOf("isoweek").toDate(),
            $lt: moment().endOf("isoweek").toDate(),
          },
        },
      },
    ]);

    res.status(200).json({
      status: 200,
      success: "Successfully working",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: "Something Went Wrong",
    });
  }
};

exports.getNewUserDay = async (req, res) => {
  try {
    let newUser = await countNewVistorModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: moment().startOf("day").toDate(),
            $lt: moment().endOf("day").toDate(),
          },
        },
      },
    ]);

    res.status(200).json({
      status: 200,
      success: "Successfully working",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: "Something Went Wrong",
    });
  }
};

///////////ORDERS

exports.addNewOrderCount = async (req, res) => {
  try {
    const order = new countNewOrderrModel();
    const orderData = await order.save();
    res.status(200).json({
      status: 200,
      success: "Successfully working",
      orderData,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: "Something Went Wrong",
    });
  }
};

exports.getAllOrderNew = async (req, res) => {
  try {
    let newUser = await countNewOrderrModel.find();

    res.status(200).json({
      status: 200,
      success: "Successfully working",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: "Something Went Wrong",
    });
  }
};
exports.getNewOrderDay = async (req, res) => {
  try {
    let newUser = await countNewOrderrModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: moment().startOf("day").toDate(),
            $lt: moment().endOf("day").toDate(),
          },
        },
      },
    ]);

    res.status(200).json({
      status: 200,
      success: "Successfully working",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: "Something Went Wrong",
    });
  }
};

exports.getNewOrderMonth = async (req, res) => {
  try {
    let newUser = await countNewOrderrModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: moment().startOf("month").toDate(),
            $lt: moment().endOf("month").toDate(),
          },
        },
      },
    ]);

    res.status(200).json({
      status: 200,
      success: "Successfully working",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: "Something Went Wrong",
    });
  }
};

exports.getNewOrderWeek = async (req, res) => {
  try {
    let newUser = await countNewOrderrModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: moment().startOf("isoweek").toDate(),
            $lt: moment().endOf("isoweek").toDate(),
          },
        },
      },
    ]);

    res.status(200).json({
      status: 200,
      success: "Successfully working",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: "Something Went Wrong",
    });
  }
};
