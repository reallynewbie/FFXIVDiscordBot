const db = require("../mongoosedb");
const ffAPI = require("../fflogs");

/*Need:
A get that returns whether or not an account exists for discordDM

Get for Existing Char info from db
Post for updating/creating a char using db

Get for last updated time
*/

async function newCharacter(discordID, addr) {
  try {
    let incomingData = await ffAPI.getFFLogs(addr);
    let parses = incomingData.parses;
    let nameArray = incomingData.charName;

    let jobArray = new Array();
    parses.forEach(function (parse) {
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

    return await db.addNewCharacter(discordID, jobArray, nameArray, addr);
  } catch (err) {
    console.log("newCharacter: ", err);
  }
}

const testAddr = "https://www.fflogs.com/character/na/diabolos/really%20newbie";
newCharacter("TestDiscordID", testAddr);



module.exports = {
  newCharacter
}