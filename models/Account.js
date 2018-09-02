const mongoose = require("mongoose");

// Define schema
var Schema = mongoose.Schema;

var accountSchema = new Schema({
  discordName: String,
  discordAcctID: String,
  accountID: "",
  collector: { type: Boolean, default: false }
});

// Compile model from schema
var Account = mongoose.model("Account", accountSchema);

module.exports = {
  schema: accountSchema,
  model: Account
};