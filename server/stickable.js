require('dotenv').config()
var express = require('express');
var app = express();
var cors = require('cors');
const bodyparser = require("body-parser");
const apiroute = require('./routes/apiroute');
const mongoose  = require("mongoose");
//console.log(process.env.MONGO_URI);
//mongoose.connect("mongodb://deltaleshoppe:dentaleshoppe2022@dentaleshoppe-shard-00-00.7afts.mongodb.net:27017,dentaleshoppe-shard-00-01.7afts.mongodb.net:27017,dentaleshoppe-shard-00-02.7afts.mongodb.net:27017/dentaleshoppe?ssl=true&replicaSet=atlas-ra4g0m-shard-0&authSource=admin&retryWrites=true&w=majority");
//mongodb://ANfMUppDuh6gkLpH2yPdWXKCMpJvyz:yPdsKuYMh6KCMpHM3qK9JvyzkLpH26@194.163.179.200:27217/ANfMUppDuh6gkLpH2yPdWXKCMpJvyz:yPdsKuYMh6KCMpHM3qK9JvyzkLpH26?authSource=stickable&retryWrites=true&w=majority
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