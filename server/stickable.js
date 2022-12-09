require('dotenv').config()
var express = require('express');
var app = express();
var cors = require('cors');
const bodyparser = require("body-parser");
const apiroute = require('./routes/apiroute');
const mongoose  = require("mongoose");

mongoose.connect(process.env.MONGO_URI);
app.use(cors());
app.use(bodyparser.json({limit: '50mb'}));
app.use('/', express.static(__dirname + '/public/front'));
app.use('/admin', express.static(__dirname + '/public/admin'));

 app.use("/api", apiroute);
 
 app.listen(process.env.PORT, function () {
    
    console.log("Server running");
 })