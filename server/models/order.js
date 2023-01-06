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

OrderSchema.pre('save', async function(next) {
    var doc = this;
    const max = await model.find({}).sort({ oid: 1 }).limit(1);
    doc.oid = max.oid || 534410001  + 1;
    next();
});

module.exports = model;