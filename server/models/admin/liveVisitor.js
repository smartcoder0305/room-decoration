const mongoose = require("mongoose");


const liveVisitorSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})





const model = mongoose.model("livevisitors", liveVisitorSchema);
module.exports = model;