const helpString = `__**Available Commands:**__ 
help - *Displays this message with available commands*
updatefflogs - *Links your account with a new FFLogs Account*
char/me/stats - *Displays your current stats*`;

const fflogsString = `__**Link FFLogs Account**__
*Copy and paste a link to your FFLogs page*`

const db = require("../mongoosedb.js");
const charController = require("../controllers/charController.js");

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
    }).then(confirmedAccount => {
      console.log("IN THEREEEE", confirmedAccount);
      //No Collector Active, proceeed with normal parse of command
      switch (command) {
        case "help":
          inmsg.channel.send(helpString);
          break;
        case "update":
        case "updatefflogs":
          updateFFLogs(inmsg);
          break;
        case "char":
        case "mychar":
        case "stats":
          inmsg.channel.send("You called for char?");
          break;
        case "createchar":

          //CHECK IF ACCOUNT IS THERE ALREADY FIRST

          //If account not there, display Text to guide user to paste in the fflogs link next.
          inmsg.channel.send(fflogsString);
          const filter = m => !m.author.bot;
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
                  console.log("filtered", inmsg.author.id, response.content);
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
        default:
          break;
      }
    })
    .catch(err => {
      throw (err);
    });
};

function updateFFLogs(message) {}

function parseMessage(msg) {
  return msg.content.trim().split(/ +/g);
}

/* 
    Available commands:
    help
    update
        updatefflogs

    char/mychar/stats
    menu
    deleteaccount(ask for confirmation)


    --To be done--
    use
    changejob


*/