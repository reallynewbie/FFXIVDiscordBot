# FFLogsLeaderboardBot

A Discord Bot built using [DiscordJS](https://discord.js.org) which pulls character information from the [FFLOGS API](https://www.fflogs.com/v1/docs/) and compiles it into a updating leaderboard for posting in a Discord Server.  

### Built Using:
* NodeJS(8.9.4)
* MongoDB
* MongooseJS
* DiscordJS

### Setup Instructions:
* ```
git clone https://github.com/reallynewbie/FFXIVDiscordBot.git
npm install
* ```
* Populate .env file in the root of directory with the following keys:
  * DISCORD_KEY=
  * BOT_NAME=
  * FFLOGS_KEY=
* Start up MongoDB Server
* node discordBot.js

Upon inviting the bot into the server, the bot will create a new category with a text channel named leaderboard. It will only monitor
that one channel for commands and will update the leaderboard there.
User accounts are created upon running !newaccount on the leaderboard channel.  The rest of the setup will be done in Direct Messages to the user.

### Missing Functionality:
* Support for storing user information for multiple discord servers.

### Vulnerabilities:
* Mongoose/MongoDB queries are not santitized though there is limited feedback points for the user.
* Nothing is encrypted here.