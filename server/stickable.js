require('dotenv').config()
var express = require('express');
var app = express();
var cors = require('cors');
const bodyparser = require("body-parser");
const apiroute = require('./routes/apiroute');
const mongoose  = require("mongoose");
const path = require('path');

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
})

// const __dirname = path.resolve();

mongoose.connect(process.env.MONGO_URI);
app.use(cors());
app.use(express.static('./public'));
app.use(bodyparser.json({limit: '5000mb'}));
// app.use(express.static('./public/front'));

// app.get('/', function (req, res) {
//     res.send('You have no permission to access');
// })

 app.use("/api", apiroute);
 app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});
 
 app.listen(process.env.PORT, function () {
    
    console.log(`Server running at ${process.env.PORT}`);
 })