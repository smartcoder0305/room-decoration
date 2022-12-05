const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    customerName: {
        type: String,
        default:"Jhon Doe"
    },
    review: {
        type: String,
        default:"Its Good"
    },
    image: {
        type: String,
    }
}, {
    timestamps: true
})





const model = mongoose.model("review", reviewSchema);
module.exports = model;