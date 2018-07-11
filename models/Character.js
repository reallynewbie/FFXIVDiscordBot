const mongoose = require("mongoose");
// Define schema
var Schema = mongoose.Schema;

let charSchema = new Schema({
    CharID: Number,
    Jobs: Array, 
    HP: Number,
    MP: Number,
    AccountID: String,
    dateJoined: Date 
});

var Character = mongoose.model("Character", charSchema);

module.exports = Character;