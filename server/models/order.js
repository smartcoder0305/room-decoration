const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

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

OrderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'oid',
    startAt: 534410001,
    incrementBy: 1
    });

const model = mongoose.model("Order", OrderSchema);
module.exports = model;