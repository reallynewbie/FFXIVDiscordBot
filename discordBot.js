const Discord = require("discord.js");
const directMessage = require("./discord/discordDM");
//const serverMessage = require("./discord/discordServerText");

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
    if (!message.author.bot) {
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
  client.on("guildCreate", guild => {
    //On joining a guild
  });
  client.on("guildDelete", guild => {
    //on being kicked from a guild (Delete all maybe?)
  });

  client.login(process.env.DISCORD_KEY);
}

function discordGetChannels(myClient) {
  console.log(myClient.channels.findAll("name", "test"));
}
function discordGetServer(myClient) {
  console.log(myClient.guilds);
}
