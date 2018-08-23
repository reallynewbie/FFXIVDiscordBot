require("dotenv").config();

var mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const Accounts = require("./models/Account");

//Set up default mongoose connection
var mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Init Autoincrement for field accountID and for a model named Accounts.
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
//   accountID: Number, (Filled with autoincrement)
//   updateffLogsTrigger: {type: Boolean, default: false}
// });

function addAccount(acctInfo) {
  //Error Checking for acctInfo, returns promise
  let acctCheck = checkNewAccount(acctInfo);

  acctCheck.then(success => {
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
  }, reject => {
    console.log(reject);
  });
}

function checkNewAccount(acctInfo) {
  return new Promise((resolve, reject) => {
    if (acctInfo.discordAcctID !== undefined) {
      if (acctInfo.discordName !== undefined) {
        resolve(true);
      } else {
        reject("undefined discordName");
      }
    } else {
      reject("undefined discordAcctID");
    }
  })
}

function findAccount(acctID, callback) {
  Accounts.model.find({
    discordAcctID: acctID
  }, "discordName", function (
    err,
    account
  ) {
    if (err) return console.log(err);
    callback(null, account);
  });
}

function deleteAccount(acctID) {}

module.exports = {
  addAccount,
  findAccount,
  deleteAccount
};
// addAccount({
//   discordAcctID: "",
//   discordName: ""
// }) ;
console.log("Mongoosedb Completed");