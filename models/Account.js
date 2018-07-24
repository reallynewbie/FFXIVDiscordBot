const mongoose = require("mongoose");
// Define schema
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    username: String,
    password: String,
    discordName: String,
    accountID: Number,
    updateffLogsTrigger: Boolean
});



// Compile model from schema
var Account = mongoose.model("Account", accountSchema);

module.exports = Account;