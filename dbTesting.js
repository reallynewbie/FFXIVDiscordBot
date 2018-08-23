require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var mongoose = require("mongoose");
const app = express();
const autoIncrement = require("mongoose-auto-increment");


const Accounts = require("./models/Account");

app.use(bodyParser.json());
app.use(cors());

//Set up default mongoose connection
var mongoDB = "mongodb://127.0.0.1/test_database";
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

autoIncrement.initialize(db);

Accounts.schema.plugin(autoIncrement.plugin, {
  model: "Accounts",
  field: "accountID"
})

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// var accountSchema = new Schema({
//   discordName: String,
//   discordAcctID: String,
//   accountID: Number,
//   updateffLogsTrigger: {type: Boolean, default: false}
// });

function addAccount() {
  acctInfo = {
    discordAcctID: "dbTesting_AcctID",
    discordName: "dbTesting_Name",
  };
  //Check if account exists
  try {
    let discordID = acctInfo.discordAcctID;
    findAccount(discordID, function (err, result) {
      if (result.length != 0) {
        console.log("Result = ", result);
      } else {
        newAccount = new Accounts.model(acctInfo);
        newAccount.save(function (err, res) {
          if (err) return console.error(err);
          console.log("Save completed");
        });
      }
    });
  } catch (err) {
    if (err.name == "ReferenceError") {
      console.log("discordAcctID doesn't exist", err);
    } else console.log(err);
  }
}

function findAccount(acctID, callback) {
  Accounts.model.find({
    discordAcctID: "acctID"
  }, "discordName", function (
    err,
    account
  ) {
    if (err) return console.log(err);
    callback(null, account);
  });
}

function clearDB() {
  Accounts.model.remove({}, function (err) {
    console.log("Accounts removed");
  });
}


function testing() {
  addAccount();
  //clearDB();
  console.log("dbTesting Completed");
}

testing();