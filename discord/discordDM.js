module.exports = function (inmsg) {
    let args = parseMessage(inmsg);
    let command = args.shift().toLowerCase();



}

function parseMessage(msg) {
    return msg.content.slice(prefix.length).trim().split(/ +/g);
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