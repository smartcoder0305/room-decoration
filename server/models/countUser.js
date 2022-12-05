const mongoose = require("mongoose");

const userCountSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
   count: {
        type: Number,
       required:true,
    }
}, {
    timestamps: true
})

const model = mongoose.model("userCount", userCountSchema);
module.exports = model;