const helpString = `__**Available Commands:**__ 
help - *Displays this message with available commands*
updatefflogs - *Links your account with a new FFLogs Account*
char/me/stats - *Displays your current stats*`;

let db = require("../mongoosedb.js");

module.exports = function(client, inmsg) {
  let args = parseMessage(inmsg);
  let command = args.shift().toLowerCase();
  console.log("Incoming Command:", command, "\n----------------------\n");

  // console.log("Client:", client, "\n----------------------\n");
  // console.log("inmsg:", inmsg, "\n----------------------\n");

  // Check if user has an account
  //!!!-What if user has a name change, does it change ID? -!!!
  db.findAccount(inmsg.author.id, result => {
    console.log(result);
    if (result !== null) {
      console.log("\n\nAccountfound\n\n");
      return;
    } else {
      db.addAccount({ discordName: inmsg.author.username, discordAcctID: inmsg.author.id});
      console.log("New User Account Created");
      return;
    }
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
