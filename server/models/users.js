const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    ipAddress: {
        type: String,
        default: "000.000.000.000"
    }
}, {
    timestamps: true
})

const model = mongoose.model("user", userSchema);
module.exports = model;