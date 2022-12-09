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
app.use('/public', express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.send('You have no permission to access');
 })

 app.use("/api", apiroute);
 
 app.listen(9999, function () {
    
    console.log("Server running");
 })