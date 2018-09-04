const mongoose = require("mongoose");
// Define schema
var Schema = mongoose.Schema;


//dateJoined is now in UTC Epoch time - let date = new Date(seconds) 
let charSchema = new Schema({
    charID: Number,
    jobs: Array,
    discordID: String,
    dateJoined: Number,
    lastUpdate: Number,
    charFName: String,
    charLName: String,
    fflogs: String
});

//Custom Functions
//Need Error Checking and confirmation that this works.
charSchema.methods.addJob = function (newJob) {
    this.model.Jobs.push(newJob);
    this.save();
};


var Character = mongoose.model("Character", charSchema);

module.exports = {
    schema: charSchema,
    model: Character
};