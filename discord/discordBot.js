const Discord = require("discord.js");
const directMessage = require("./discordDM.js");
//const serverMessage = require("./discordServerText.js");

const client = new Discord.Client();

require("dotenv").config();
try {
  discordLogin();
} catch (err) {
  console.log("Error from discordLogin: ", err);
}

function discordLogin() {
  client.on("ready", () => {
    console.log("I am ready!");
  });
  client.on("message", message => {
    let messageType = message.channel.type;
    if (message.author.username != process.env.BOT_NAME) {
      switch (messageType) {
        case "dm":
          console.log("Enter DM");
          directMessage(client, message);
          break;
        case "text":
          console.log("Enter server text");
          //serverMessage(client, message);
          break;
        default:
          console.log("messageType = " + messageType);
      }
    }
    

    // if (message.content.startsWith("server")) {
    //   discordGetServer(client);
    // }
    // if (message.content.startsWith("channel")) {
    //   discordGetChannels(client);
    // }
    // if (message.content.startsWith("author")) {
    //   console.log(message.author + "Channel:  " + message.channel.type);
    // }
  });
  client.login(process.env.DISCORD_KEY);
}



function discordGetChannels(myClient) {
  console.log(myClient.channels.findAll("name", "test"));
}
function discordGetServer(myClient) {
  console.log(myClient.guilds);
}
