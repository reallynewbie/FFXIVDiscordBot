const mongoose = require("mongoose");

//const WoL = require("./Character");
// Define schema
var Schema = mongoose.Schema;

var accountSchema = new Schema({
  discordName: String,
  discordAcctID: String,
  accountID: Number,
  updateffLogsTrigger: { type: Boolean, default: false }
});

// Compile model from schema
var Account = mongoose.model("Account", accountSchema);

module.exports = {
  schema: accountSchema,
  model: Account
};