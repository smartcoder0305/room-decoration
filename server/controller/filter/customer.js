const shippingAddressModel = require("../../models/shippingaddress");
const paymentProcessModel = require("../../models/paymentprocess");

exports.CustomerAccordingPhoneNumber = async (req, res) => {
  const usersData = await paymentProcessModel.aggregate([
    {
      $group: {
        _id: "$phone",
        totalSpending: {
          $sum: "$finalPrice",
        },
      },
    },
  ]);
  const allPamentData = await paymentProcessModel.find({});

  let newArr = usersData.map((data) => {
    let all = allPamentData.map((mydata) => {
      if (data._id === mydata.phone) {
        return mydata;
      }
    });
    console.log(all);
    return {
      _id: data._id,
      totalSpending: data.totalSpending,
      allData: all,
    };
  });

  console.log(newArr);
  res.status(200).json({
    success: "Successfully working",
    usersData:newArr,
  });
};
