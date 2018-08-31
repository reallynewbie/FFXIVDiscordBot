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

  return new Promise((resolve, reject) => {
    checkNewAccount(acctInfo)
      .then(() => {
        let discordID = acctInfo.discordAcctID;
        findAccount(discordID)
          .then(results => {
            if (results.length == 0) {
              let newAccount = new Accounts.model(acctInfo);
              newAccount.save(function (err, res) {
                if (err) return console.error(err);
                resolve("addAccount: Save completed");
              });
            } else {
              console.log(results);
              reject("addAccount: Account already exists");
            }
          })
      });
  });
}

function checkNewAccount(acctInfo) {
  return new Promise((resolve, reject) => {
    if (acctInfo.discordAcctID !== undefined) {
      if (acctInfo.discordName !== undefined) {
        resolve("checkNewAccount:  ok params");
      } else {
        reject("checkNewAccount: undefined discordName");
      }
    } else {
      reject("checkNewAccount: undefined discordAcctID");
    }
  })
}

function findAccountHelper(acctID, callback) {
  Accounts.model.find({
    discordAcctID: acctID
  }, null, function (
    err,
    account
  ) {
    if (err) return console.log(err);
    callback(null, account);
  });
}

function findAccount(acctID) {
  return new Promise((resolve, reject) => {
    Accounts.model.find({
      discordAcctID: acctID
    }, null, function (
      err,
      account
    ) {
      if (err) reject(err);
      resolve(account);
    });
  })
}

function deleteAccount(acctID) {}

module.exports = {
  addAccount,
  findAccount,
  deleteAccount
};
// addAccount({
//     discordAcctID: "fff",
//     discordName: "ffff"
//   }).then(msg => {
//     console.log(msg);
//   })
//   .catch(err => {
//     console.log("ERR DETECTEED", err);
//   });
console.log("Mongoosedb Completed");