const mongoose = require("mongoose");

const orderCountSchema = new mongoose.Schema({
}, {
    timestamps: true
})

const model = mongoose.model("neworderCount", orderCountSchema);
module.exports = model;