const helpString = `__**Available Commands:**__ 
help - *Displays this message with available commands*
updatefflogs - *Links your account with a new FFLogs Account*
char/me/stats - *Displays your current stats*`;

let db = require("../mongoosedb.js");

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
              .catch(err => {
                return err;
              });
          })
          .catch(err => {
            throw new Error(err);
          })
      } else {
        throw new Error("more or less than one account found in findAccount");
      }
    }).then(confirmedAccount => {
      console.log("IN THEREEEE", confirmedAccount);
      if (confirmedAccount.collector == false) {
        //No Collector Active, proceeed with normal parse of command
      } else {
        //Collector active, need to look at next string.
      }
    })
    .catch(err => {
      console.log(err);
    });

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
      break
    default:
  }
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