const helpString = `__**Available Commands:**__ 
help - *Displays this message with available commands*
createchar - *Links your account with a new FFLogs Account*
deleteaccount - *Deletes your account with FFLogs Leaderboard*
changefflogs - Not implemented yet - *Unlinks your FFLogs account from this bot and links it with another account*
update - *Updates your jobs and levels with current information*
char/me/stats - *Displays your current stats*`;

const fflogsString = `__**Link FFLogs Account**__
*Copy and paste a link to your FFLogs page*
ex:  https://www.fflogs.com/character/na/diabolos/really%20newbie
Note:  Linking via ID number page isn't supported yet (https://www.fflogs.com/character/id/207082)`

const fflogsUpdateStr = `__**Update FFLogs Account**__
*Copy and paste a link to your new associated FFLogs Page*
ex:  https://www.fflogs.com/character/na/diabolos/really%20newbie
Note:  Linking via ID number page isn't supported yet (https://www.fflogs.com/character/id/207082)`

const deleteAccountStr = `__**Delete FFXIV Discord Bot Character**__
*Are you sure you want to delete your account?*
Type 'delete account' without the quotes to confirm this.`

const fflogsLinkWrong = `__**Invalid FFLogs Account**__
Unable to find the FFLogs account posted.  Please double check the link.
It should be in the following format:
ex:  https://www.fflogs.com/character/na/diabolos/really%20newbie
`

const Discord = require("discord.js");
const db = require("../mongoosedb.js");
const charController = require("../controllers/charController.js");
const filter = m => !m.author.bot;


module.exports = function (client, inmsg) {
  let args = parseMessage(inmsg);
  let command = args.shift().toLowerCase();
  console.log("Incoming Command:", command, "\n----------------------\n");

  // console.log("Client:", client, "\n----------------------\n");
  // console.log("inmsg:", inmsg, "\n----------------------\n");

  // Check if user has an account
  //!!!-What if user has a name change, does it change ID? -!!!
  db.findAccount(inmsg.author.id)
    .then(results => {
      if (results.length == 1) {
        //Found only one account
        return results;
      } else if (results.length == 0) {
        //New Account, no other accounts here with that AcctID
        return db.addAccount({
            discordName: inmsg.author.username,
            discordAcctID: inmsg.author.id
          })
          .then(() => {
            return db.findAccount(inmsg.author.id)
              .then(newacct => {
                return newacct;
              })
          })
          .catch(err => {
            throw new Error(err);
          })
      } else {
        throw new Error("more or less than one account found in findAccount");
      }
    }).then(async confirmedAccount => {
      console.log("IN THEREEEE", confirmedAccount);
      //No Collector Active, proceeed with normal parse of command
      switch (command) {
        case "help":
          inmsg.channel.send(helpString);
          break;
        case "update":
          //Check if char exists or not.
          let charExists = await charController.findChar(inmsg.author.id);
          if (charExists) {
            try {
              charController.updateFFLogs(inmsg.author.id);
            } catch (err) {
              throw Error("discordDM Update: ", err);
            }
          }
          break;
        case "changefflogs":
          inmsg.channel.send(fflogsUpdateStr);
          inmsg.channel.awaitMessages(filter, {
              max: 1
            })
            .then(collected => {
              if (checkFFURL(collected.first())) { // Checks if fflogs url is correct
                //changefflogs function
              } else {
                //Failed the url check
                inmsg.channel.send(fflogsLinkWrong);
                console.log(collected.first(), "Incorrect link: ", collected.first())
              }
            })
          break;
        case "char":
        case "mychar":
        case "stats":
          let charInfo = await charController.findChar(inmsg.author.id);
          let statsMsg = embeddedStatsCreator(charInfo.charFName, charInfo.charLName, charInfo.jobs);
          inmsg.channel.send(statsMsg);
          break;
        case "createchar":

          //**CHECK IF ACCOUNT IS THERE ALREADY FIRST**

          //If account not there, display Text to guide user to paste in the fflogs link next.
          inmsg.channel.send(fflogsString);
          inmsg.channel.awaitMessages(filter, {
              max: 1
            })
            .then(collected => {
              let response = collected.first();
              if (response.content.toLowerCase().startsWith("https://www.fflogs.com/character")) {
                if (response.content.toLowerCase().startsWith("https://www.fflogs.com/character/id")) {
                  //Scrape the webpage to get char name and server + region.
                  console.error("Using ID, not yet supported", response)
                  throw new Error("Using ID, not yet supported");
                } else {

                  //Do stuff with the FFlogs Link
                  //console.log("filtered", inmsg.author.id, response.content);
                  try {
                    charController.newCharacter(inmsg.author.id, response.content);
                  } catch (err) {
                    console.error(err);
                  }
                }
              } else {
                //Invalid response, display error message
                console.log(false);
              }

            })
            .catch(err => {
              throw (err);
            })
          break;
        case "deletechar":
            //Once multi chars are supported, need to refactor to include options to check
            inmsg.channel.send(deleteAccountStr);
            inmsg.channel.awaitMessages(filter, {
              max: 1
            }).then(collected => {
              let message = collected.first();
              if (message.toLowerCase() == "delete account") {
                
              } else {
                inmsg.channel.send("Delete Character command cancelled.");
              }
            })
          break;
        default:
          break;
      }
    })
    .catch(err => {
      throw (err);
    });
};

function updateFFLogs(acctID) {
  //charcontroller.updatefflogs is not able to support multi-chars.
  charController.updateFFLogs(acctID);
}

function embeddedStatsCreator(fName, lName, jobArray) { //This is bad, don't send an entire object.  Send parameters separated.
  if (jobArray.length == 0) {
    //Show custom message
  } else {
    let finalMsg = new Discord.RichEmbed();
    finalMsg.setTitle("__**" + fName + " " + lName + "**__");

    jobArray.forEach(element => {
      finalMsg.addField(element.job, element.exp, true);
    });
    return finalMsg;
  }
}

function checkFFURL(url) {
  if (url.content.toLowerCase().startsWith("https://www.fflogs.com/character")) {
    if (url.content.toLowerCase().startsWith("https://www.fflogs.com/character/id")) {
      //Scrape the webpage to get char name and server + region. In the future
      console.error("Using ID, not yet supported", response)
      throw new Error("Using ID, not yet supported");
    } else {
      return true;
    }
  }
}

function parseMessage(msg) {
  return msg.content.trim().split(/ +/g);
}