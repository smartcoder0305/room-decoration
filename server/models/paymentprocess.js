const mongoose = require("mongoose");

const PaymentProcessSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    paymentInfo: {
        type: Object,
        required: false
    },
    oid: {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    ipAddress: {
        type: String,
        default: "000.000.000.000"
    },
    finalPrice:{
        type:Number,
        required: true
    }
}, {
    timestamps: true
})

const model = mongoose.model("paymentprocess", PaymentProcessSchema);
module.exports = model;