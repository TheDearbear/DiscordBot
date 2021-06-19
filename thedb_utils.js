function isfilled(source) {
    if (Array.isArray(source)) {
        if (source.length === 0) return false;
        else return true;
    } else if (typeof source === 'object') {
        var length = 0, key;
        for (key in source) {
            if (source.hasOwnProperty(key)) length++;
        }
        if (length === 0) return false;
        else return true;
    } else return null;
}

String.prototype.cmd = function() { return '/' + this.toLowerCase() };
String.prototype.getArgs = function() {
    var args = this.split(' ');
    args.shift();
    return args;
}
String.prototype.isCommand = function(command) {
    command = command.cmd();
    return this.slice(command.length, command.length + 1) == '' || this.slice(command.length, command.length + 1) == ' ';
}

module.exports.isfilled = isfilled;