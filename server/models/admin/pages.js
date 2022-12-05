const mongoose = require("mongoose");

const pagesSchema = new mongoose.Schema(
  {
    pname: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    pagenumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("pages", pagesSchema);
module.exports = model;
