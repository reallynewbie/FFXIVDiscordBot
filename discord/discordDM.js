module.exports = function(client, inmsg) {
  let args = parseMessage(inmsg);
  let command = args.shift().toLowerCase();
  console.log("Incoming Command:", command, "\n----------------------\n");

  // console.log("Client:", client, "\n----------------------\n");
  // console.log("inmsg:", inmsg, "\n----------------------\n");

  switch (command) {
    case "help":
      break;
    case "update":
    case "updatefflogs":
      break;
    case "char":
    case "mychar":
    case "stats":
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
