'use strict';
console.log('Importing libraries. Please wait.');

const ut = require('./thedb_utils');
const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core-discord');

//===========================
//         Global          ||
//===========================
var _connection;
var _dispatcher;
var token = 'YouTokenGoesHere';
var calls = {
    enabled: true,
    text_channel: 'IdOfTextChatForCallingNotifications',
    voice_channel: 'IdOfVoiceChannelForMeeting',
    role: 'IdOfRoleForMembersOfCallingSystem'
}
//===========================
console.log('Initializing bot...');

client.once('ready', () => {
    console.log('Started!');
    client.user.setActivity('Call me later...');
});

//===========================
client.on('message', async msg => {
    //===========================
    //           Basics        ||
    //===========================
    var msg_c = msg.content;
    var args = msg_c.getArgs();

    // no bots
    if (!msg.author.bot) {
        //===========================
        //          Calls          ||
        //===========================
        if (calls.enabled) {
            if (msg_c.isCommand('call')) {
                msg.delete();
                if (msg.member.voice.channel.id == calls.voice_channel) {
                    let notify_channel = client.channels.cache.get(calls.text_channel);
                    if (notify_channel != null) {
                        notify_channel.send("<@&" + calls.role + ">, " + msg.author.username + " is calling you!");
                    }
                    else {
                        msg.channel.send("Channel with notifications for bot not found!");
                    }
                }
                else {
                    msg.channel.send("Please join to VC for calling!");
                }
                return;
            }
        }

        //===========================
        //           Radio         ||
        //===========================
        if (msg_c.isCommand('radio')) {
            var volume = 0.75;
            var volume_prefix = 'volume:';

            args.forEach(function(value, index, array) {
                if (args.length == 0) {
                    msg.channel.send("/radio <library|yt|skip|leave> <LibraryFile|YtVideo'sId>");
                }
                if (value.startsWith(volume_prefix)) {
                    var volume_value = Number(value.slice(volume_prefix.length));
                    if (volume_value == NaN) volume = volume_prefix / 100;
                }
            });
            let play_music = function(play_argument, connection) {
                let dispatcher = connection.play(play_argument, {bitrate: connection.channel.bitrate, volume: volume});
                if (msg.channel.lastMessage.content.startsWith('radio'.cmd())) {
                    msg.channel.lastMessage.delete();
                }
                return dispatcher;
            }

            
            if (msg.member.voice.channel) {
                _connection = await msg.member.voice.channel.join();
                try {
                    switch (args[0]) {
                        case 'library':
                            _dispatcher = play_music(__dirname + '/musiclib/' + args[1] + '.mp3', _connection);
                            break;
                        case 'yt':
                            _dispatcher = play_music(await ytdl("https://www.youtube.com/watch?v=" + args[1], {filter: "audioonly"}), _connection).on('error', console.error);
                            break;
                        case 'skip':
                            _dispatcher.destroy();
                            break;
                        case 'leave':
                            _connection.channel.leave();
                            _connection = null;
                            break;
                        default:
                            _dispatcher = play_music(__dirname + '/musiclib/default.mp3', _connection);
                            break;
                    }
                } catch (e) {
                    msg.channel.send("Error while executing command!"); console.warn('Error: ' + e);
                }
            } else
                msg.reply("Please connect to VC!");
        }

        /*

        //===========================
        //   Account Verification  ||
        //===========================
        if (msg.channel.id == 'channel_verify' && ut.iscommand(msg, ut.cmd('verify')) && args.length === 1) {
            msg.delete();
            if (args[0].length == 10) {
                switch (args[0]) {
                    case 'key_verify_1':
                        msg.member.roles.add('role_1');
                        msg.member.roles.add('role_verify');
                        break;
                    case 'key_verify_2':
                        msg.member.roles.add('role_2');
                        msg.member.roles.add('role_verify');
                        break;
                }
            }
        } else if (msg.channel.id == 'channel_verify' && !msg.author.bot) msg.delete();
        
        */
    }
});

client.login(token);
