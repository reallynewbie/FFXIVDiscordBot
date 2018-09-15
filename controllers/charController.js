const db = require("../mongoosedb");
const ffAPI = require("../fflogs");

/*Need:
A get that returns whether or not an account exists for discordDM

Get for Existing Char info from db
Post for updating/creating a char using db

Get for last updated time
*/
async function findChar(discordID) {
  try {
    let results = await db.findCharacter(discordID);
    if (results.length > 1) {
      throw new Error("More than one char associated with this discordID", discordID);
    } else if (results.length == 0) {
      throw new Error("No Results Found");
    } else {
      return results[0];
    }
  } catch (err) {
    console.error(err);
  }
}

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
    console.error("newCharacter: ", err);
  }
}

async function updateFFLogs(charID) {
  try {
    let charInfo = await findChar(charID);
    let newData = await ffAPI.getFFLogs(charInfo);
    let parses = newData.parses;
    let jobArray = newData.jobs;
    parses.forEach(function(parse) {
      if (parse.time > charInfo.lastUpdate) {
        //maynot be correct syntax for parse.time
        let foundJob = jobArray.find(element => {
          element.job.toString() == parse.spec.toString();
        })
      }
    })

  } catch (err) {
    throw (err);
  }
}

// const testAddr = "https://www.fflogs.com/character/na/diabolos/really%20newbie";
// newCharacter("TestDiscordID", testAddr);


module.exports = {
  newCharacter,
  findChar
}