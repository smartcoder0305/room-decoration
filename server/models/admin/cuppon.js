const mongoose = require("mongoose");


const cuponSchema = new mongoose.Schema({
    cupons: {
        type: String,
        default:"cupon"
    },
    cuponsAvalible: {
        type: Boolean,
        default:"false"
    },
    numberOfImages:{
        type:Number,
        default:0
    },
    percentage:{
        type:Number,
        default:0
    }
}, {
    timestamps: true
})





const model = mongoose.model("cupons", cuponSchema);
module.exports = model;