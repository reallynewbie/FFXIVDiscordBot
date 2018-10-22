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
    permResult = checkPermissions(guild);
    if (permResult == true) {
      discordinit();
    } else {
      console.log(permResult);
    }
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

function discordinit() {
  message.guild.createChannel("FFXIVBot", "category", [{
      id: message.guild.id,
      deny: ['MANAGE_MESSAGES'],
      allow: ['SEND_MESSAGES']
    }])
    .then((category) => {
      console.log(category);
      message.guild.createChannel("Leaderboard", "text", [{
          id: message.guild.id,
          deny: ['MANAGE_MESSAGES'],
          allow: ['SEND_MESSAGES']
        }])
        .then((res) => {
          res.setParent(category, "Set to Category Child");
        })
        .catch(console.error);
      message.guild.createChannel("New-Account", "text", [{
          id: message.guild.id,
          deny: ['MANAGE_MESSAGES'],
          allow: ['SEND_MESSAGES']
        }])
        .then((res) => {
          res.setParent(category);
        })
        .catch(console.error);
    })
    .catch(console.error);
}

function checkPermissions(guild) {
  botPermissions = guild.me.permissions;
  finalStr = "Missing the following permissions:";
  if (botPermissions.has(11280))
    return true;
  else {
    if (!botPermissions.has("VIEW_CHANNEL"))
      finalStr += " VIEW_CHANNEL ";
    if (!botPermissions.has("MANAGE_CHANNELS"))
      finalStr += " MANAGE_CHANNEL ";
    if (!botPermissions.has("SEND_MESSAGES"))
      finalStr += " SEND_MESSAGES ";
    if (!botPermissions.has("MANAGE_MESSAGES"))
      finalStr += " MANAGE_MESSAGES ";
      return finalStr;
  }
}