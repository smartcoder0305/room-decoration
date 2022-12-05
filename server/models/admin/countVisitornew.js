const mongoose = require("mongoose");

const allVisitorSchema = new mongoose.Schema({

}, {
    timestamps: true
})

const model = mongoose.model("allVisitor", allVisitorSchema);
module.exports = model;