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

OrderSchema.pre('save', async function(next) {
    var doc = this;
    const max = await model.find({}).sort({ oid: 1 }).limit(1);
    console.log(max);
    doc.oid = max.oid || 534410000  + 1;
    next();
});

module.exports = model;