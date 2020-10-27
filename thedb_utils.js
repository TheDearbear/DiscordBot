function getArgs(input) {
    var args = input.split(' ');
    args.shift();
    return args;
}
function cmd(input) { return '/' + input.toLowerCase(); }
function iscommand(message, command) { return message.content.startsWith(command); }
function isfilled(source) {
    var util = require('util');
    if (util.isArray(source)) {
        if (source.length === 0) return false;
        else return true;
    } else if (typeof source === 'object') {
        var length = 0, key;
        for (key in source) {
            if (source.hasOwnProperty(key)) length++;
        }
        if (length === 0) return false;
        else return true;
    } else return TypeError('Input must be an array or an object!');
}
function happymsg(msg) { msg.reply("You are welcome!").then((msg) => { if (msg.author.bot) msg.delete() }); }

module.exports.getArgs = getArgs;
module.exports.cmd = cmd;
module.exports.iscommand = iscommand;
module.exports.isfilled = isfilled;
module.exports.happymsg = happymsg;
