module.exports = function(client, inmsg) {
  let args = parseMessage(inmsg);
  let command = args.shift().toLowerCase();
  console.log("Incoming Command:", command, "\n----------------------\n");

  // console.log("Client:", client, "\n----------------------\n");
  // console.log("inmsg:", inmsg, "\n----------------------\n");

  switch (command) {
    case "help":
      inmsg.channel.send("You called for help?");
      break;
    case "update":
    case "updatefflogs":
      inmsg.channel.send("You called for update?");
      break;
    case "char":
    case "mychar":
    case "stats":
      inmsg.channel.send("You called for char?");
      break;

    default:
  }
};

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

    --To be done--
    use
    changejob


*/
