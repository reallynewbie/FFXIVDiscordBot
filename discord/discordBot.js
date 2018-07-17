const Discord = require("discord.js");
const directMessage = require("./discordDM");
const serverMessage = require("./discordServerText");

const client = new Discord.Client();

require("dotenv").config();
discordLogin();

function discordLogin() {
  client.on("ready", () => {
    console.log("I am ready!");
  });
  client.on("message", message => {
    let messageType = message.channel.type;
    switch (messageType) {
      case "dm":
        console.log("Enter DM");
        directMessage.handle
        break;
      case "text":
        console.log("Enter server text");
        break;
      default:
        console.log("messageType = " + messageType);
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
