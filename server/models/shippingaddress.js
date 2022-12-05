const mongoose = require("mongoose");

const ShippingAddressSchema = new mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    address1:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    postalCode:{
        type:String,
        default:"none"
    },
    phone:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    totalSpending:{
        type:Number,
        required:true
    },
    totalSpending:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"Untouched"
    },
    ipAddress:{
        type:String,
        default:"000.000.000.000"
    }
},{
    timestamps: true
})

const model = mongoose.model("shippingaddress",ShippingAddressSchema);
module.exports = model;