const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var mongoose = require("mongoose");
const app = express();

const Account = require("./models/Account");

app.use(bodyParser.json());
app.use(cors());

//Set up default mongoose connection
var mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
  var testAccount = new Account({
    username: "test",
    password: "test",
    discordName: "testDiscord",
    accountID: 5
  });
  var promise = Account.find(function(err, accounts) {
    if (err) return console.error(err);
    console.log("Accounts found: ", accounts);
  });
  promise.then(function() {
    promise = testAccount.save(function(err, res) {
      if (err) return console.error(err);
      console.log("Save completed");
    });
  });
  promise.then(function() {
    promise = Account.find(function(err, accounts) {
      if (err) return console.error(err);
      console.log("Accounts found: ", accounts);
    });
  }).then(function() {
    Account.remove({}, function(err) {
      console.log("collection removed");
    });
  });

  
});

console.log("completed");