const { findOne, find } = require("../../models/admin/pages");
const Pages = require("../../models/admin/pages");
exports.addPages = async (req, res) => {
  try {
    const { pname, data , pagenumber} = req.body;

    console.log({pname, data , pagenumber})

    const getPage = await Pages.findOne({ pname });
    if (!getPage) {
      const page = new Pages({ pname, data, pagenumber });
      const dataRes = await page.save();
      // console.log(usersData)
      res.json({
        success: "Successfully working",
        status: 200,
        dataRes,
      });
    } else {
      const dataRes = await Pages.findOneAndUpdate({ pname }, { data });
      res.json({
        success: "Successfully working",
        status: 200,
        dataRes,
      });
    }
  } catch (error) {
    res.json({
      success: "Successfully working",
      status: 400,
    });
  }
};

exports.getPages = async (req, res) => {
  try {
    const { pname } = req.body;
    console.log(pname);
    const getPage = await Pages.findOne({ pname });
    console.log(getPage);


    
    res.json({
      success: "Successfully working",
      status: 200,
      getPage,
    });
  } catch (error) {
    res.json({
      success: "Something went wrong",
      status: 400,
    });
  }
};

exports.getAllPages = async (req, res) => {
  try {
    const getPage = await Pages.find();
    console.log(getPage.sort((a,b)=> a.pagenumber-b.pagenumber))
    res.json({
      success: "Successfully working",
      status: 200,
      getPage:getPage.sort((a,b)=> a.pagenumber-b.pagenumber),
    });
   
  } catch (error) {
    res.json({
      success: "Something went wrong",
      status: 400,
    });
  }
};

exports.getPageById = async (req, res) => {
  const { pageId } = req.body;
  console.log(req.body);
  try {
    const getPage = await Pages.findById({ _id: pageId });
    res.json({
      success: "Successfully working",
      status: 200,
      getPage,
    });
  } catch (error) {
    res.json({
      success: "Something went wrong",
      status: 400,
    });
  }
};

exports.updatePageById = async (req, res) => {
  const { pageId, pname, data, pagenumber } = req.body;

  try {
    const getPage = await Pages.findByIdAndUpdate(
      { _id: pageId },
      { pname, data,pagenumber }
    );
    res.json({
      success: "Successfully working",
      status: 200,
      getPage,
    });
  } catch (error) {
    res.json({
      success: "Something went wrong",
      status: 400,
    });
  }
};

exports.deletePageById = async (req, res) => {
  const { pageId } = req.body;

  try {
    const getPage = await Pages.findByIdAndDelete({ _id: pageId });
    res.json({
      success: "Successfully working",
      status: 200,
      getPage,
    });
  } catch (error) {
    res.json({
      success: "Something went wrong",
      status: 400,
    });
  }
};



exports.findPageByPageNumber=async (req, res)=>{
    try {
    const {pagenumber}=req.body
    const getPage=await Pages.find({pagenumber});
    res.json({
        success: "Successfully working",
        status: 200,
        getPage,
      });
    } catch (error) {
        
    }
}