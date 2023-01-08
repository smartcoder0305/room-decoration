const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    checkid:{
        type:Number,
        default:1001
    },
    oid: {
        type: Number,
        default:534410000
    },
    uid: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const model = mongoose.model("Order", OrderSchema);

module.exports = model;