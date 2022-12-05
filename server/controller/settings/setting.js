const Cupon = require("../../models/admin/cuppon");
const LiveVisitors = require("../../models/admin/liveVisitor");
const Review = require("../../models/admin/review");
exports.getCupon = async (req, res) => {
  try {
    // const { pname } = req.body
    const getCupon = await Cupon.findOne({ cupons: "cupon" });
    // console.log(getCupon)
    res.json({
      success: "Successfully working",
      status: 200,
      getCupon,
    });
  } catch (error) {
    res.json({
      success: "Something went wrong",
      status: 400,
    });
  }
};

exports.addCupon = async (req, res) => {
  try {
    const { data,percentage,numberOfImages } = req.body;
    console.log(data);
    const getCupon = await Cupon.findOne({ cupons: "cupon" });
    if (!getCupon) {
      const cupon = new Cupon({data,percentage,numberOfImages});
      const dataRes = await cupon.save();
      // console.log(usersData)
      res.json({
        success: "Successfully working",
        status: 200,
        dataRes,
      });
    } else {
      const dataRes = await Cupon.findOneAndUpdate(
        { cupons: "cupon" },
        { cuponsAvalible: data,data,percentage ,numberOfImages}
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

exports.countLiveVisitor = async (req, res) => {
  //   console.log("tara bin kuch vhata ta he muje ...................");
  //   console.log(req.body);
};

exports.setLiveVisitor = async (req, res) => {
  //   console.log(req.body);
  try {
    const { uid } = req.body;
    const getVisitor = await LiveVisitors.findOne({ uid });
    if (!getVisitor) {
      const liveVisitor = new LiveVisitors({ uid });
      const dataRes = await liveVisitor.save();
      if (dataRes) {
        res.json({
          success: "Sucess",
          status: 200,
        });
      } else {
        res.json({
          success: "Something went wrong",
          status: 400,
        });
      }
    }
  } catch (error) {
    res.json({
      success: "Something went wrong",
      status: 400,
    });
  }
};

exports.deleteLiveVisitor = async (req, res) => {
  console.log("youuuuuu");
  try {
    const { uid } = req.body;
    console.log(uid);
    const getVisitor = await LiveVisitors.findOne({ uid });
    if (getVisitor) {
      const dataRes = await LiveVisitors.deleteMany({ uid: uid });
      if (dataRes) {
        res.json({
          success: "Sucess",
          status: 200,
        });
      } else {
        res.json({
          success: "Something went wrong",
          status: 400,
        });
      }
    }
  } catch (error) {
    res.json({
      success: "Something went wrong",
      status: 400,
    });
  }
};
exports.addReview = async (req, res) => {
  try {
    const { cname, review } = req.body;
    const createObjreview = new Review({ customerName: cname, review,image:`/public/reviewimage/${req.files[0].filename}` });
    const dataRes = await createObjreview.save();
    if (dataRes) {
      res.json({
        success: "Sucess",
        status: 200,
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

exports.getReview = async (req, res) => {
  try {
    const dataRes = await Review.find();
    if (dataRes) {
      res.json({
        success: "Sucess",
        status: 200,
        dataRes,
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

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id)
    const dataRes = await Review.findByIdAndDelete({ _id:id });
    if (dataRes) {
      res.json({
        success: "Sucess",
        status: 200,
        dataRes,
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
exports.getReviewById = async (req, res) => {
  try {
    const {rid}=req.body;
    const dataRes = await Review.findById({_id:rid});
    if (dataRes) {
      res.json({
        success: "Sucess",
        status: 200,
        dataRes,
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



exports.updateReviewWithImage = async (req, res) => {
  try {
    const {rid,cname,review}=req.body;
    const dataRes = await Review.findByIdAndUpdate({_id:rid},{ customerName: cname, review,image:`/public/reviewimage/${req.files[0].filename}` });
    if (dataRes) {
      res.json({
        success: "Sucess",
        status: 200,
        dataRes,
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


exports.updateReviewWithoutImage = async (req, res) => {
  try {
    const {rid,cname,review}=req.body;
    const dataRes = await Review.findByIdAndUpdate({_id:rid},{customerName:cname,review:review});
    if (dataRes) {
      res.json({
        success: "Sucess",
        status: 200,
        dataRes,
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