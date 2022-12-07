const mongoose = require("mongoose");

const UploadimageSchema = new mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    frame:{
        type:String,
        default: 'classic',
        required:true
    },
    view_image:{
        type:String,
        required:true
    },
    imagewidth:{
        type:String,
        required:true
    },
    imageheight:{
        type:String,
        required:true
    },
    imageext:{
        type:String,
        required:true
    },
    cropbox_data:{
        type:Object,
        required:false
    },
    rotate:{
        type:String,
        required:false
    },
    zoomvalue:{
        type:String,
        required:false
    },
    filestack_data:{
        type:Object,
        required:false
    },
    date:{
        type:Number,
        default:Date.now
    },
    keepImage: {
        required: false,
        type: Boolean
    }
},{
    timestamps: true
})

const model = mongoose.model("userimageupload",UploadimageSchema);
module.exports = model;