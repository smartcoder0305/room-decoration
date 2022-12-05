const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    checkid:{
        type:Number,
        default:1001
    },
    oid: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const model = mongoose.model("Order", OrderSchema);
module.exports = model;