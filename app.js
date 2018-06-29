const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var mongoose = require('mongoose');
const app = express();


app.use(bodyParser.json());
app.use(cors());

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(3000);