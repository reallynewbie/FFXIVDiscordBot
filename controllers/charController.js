const db = require("../mongoosedb");
const ffAPI = require("../fflogs");

/*Need:
A get that returns whether or not an account exists for discordDM

Get for Existing Char info from db
Post for updating/creating a char using db

Get for last updated time
*/

//dateJoined is now in UTC Epoch time - let date = new Date(seconds) 
// let charSchema = new Schema({
//   CharID: Number,
//   Jobs: Array,
//   AccountID: String,
//   dateJoined: Number,
//   lastUpdate: Number,
//   CharFName: String,
//   CharLName: String,
//   fflogs: String
// });

async function newAccount(addr) {
  try {
    let incomingData = await ffAPI.getFFLogs(addr);

    let jobArray = new Array();
    incomingData.forEach(function (parse) {
      if (jobArray.find(element => element.job == parse.spec) == undefined) {
        jobArray.push({
          job: parse.spec,
          exp: 100 + parse.percentile
        });
      } else {
        let foundJob = jobArray.find(element =>
          element.job.toString() == parse.spec.toString()
        )
        foundJob.exp += (100 + parse.percentile);
      }
    });
    jobArray = jobArray.sort((a, b) => {
      return a.job > b.job
    });
  } catch (err) {
    console.log("newAccount: ", err);
  }
}

const testAddr = "https://www.fflogs.com/character/na/diabolos/really%20newbie";
newAccount(testAddr);

module.exports = {
  newAccount
}