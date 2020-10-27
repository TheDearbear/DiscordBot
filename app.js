'use strict';
const ut = require('./thedb_utils');
const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core-discord');
const fs = require('fs');

console.log('Starting bot...');

client.once('ready', () => {
    console.log('Started!\n');
});

client.on('guildMemberAdd', member => {
    console.log("=================New=member==================");
    console.log("Member ID: " + member.toString());
    console.log("Member Username: " + member.username.toString());
    console.log("=============================================\n");
});

//===========================
client.on('message', async msg => {
    else {
        //===========================
        //           Basics        ||
        //===========================
        var msg_c = msg.content;
        var args = ut.getArgs(msg_c);

        //===========================
        //           Radio         ||
        //===========================
        if (ut.iscommand(msg, ut.cmd('radio'))) {
            var path = '';
            if (msg.member.voice.channel) {
                var connection = await msg.member.voice.channel.join();

                try {
                    switch (args[0]) {
                        case 'library':
                            path = __dirname + '/musiclib/' + args[1] + '.mp3';
                            break;
                        case 'yt':
                            var dispatcher = connection.play(await ytdl("https://www.youtube.com/watch?v=" + args[1]),
                                { type: "opus", bitrate: connection.channel.bitrate })
                                .on('error', console.error);
                            break;
                        case 'skip':
                            connection.end();
                            break;
                        default:
                            var dispatcher = connection.play(__dirname + '/sample.mp3')
                                .on('error', console.error);
                            break;
                    }
                } catch (e) {
                    msg.channel.send('Error while trying play music!');
                }
            } else msg.reply("Please connect to voice channel!");

        }

        //===========================
        //   Account Verification  ||
        //===========================
        if (msg.channel.id == 'channel_verify' && ut.iscommand(msg, ut.cmd('verify')) && args.length === 1) {
            console.log("===============New=verification==============");
            console.log("Verificator ID: " + msg.author.id);
            console.log("Verificator Username: " + msg.author.username);
            console.log("Verification key: " + args[0]);
            console.log("=============================================\n");

            msg.delete();
            if (args[0].length == 10) {
                switch (args[0]) {
                    case 'key_verify_1':
                        msg.member.roles.add('role_1');
                        msg.member.roles.add('role_verify');
                        ut.happymsg(msg);
                        break;
                    case 'key_verify_2':
                        msg.member.roles.add('role_2');
                        msg.member.roles.add('role_verify');
                        ut.happymsg(msg);
                        break;
                }
            }
        } else if (msg.channel.id == 'channel_verify' && !msg.author.bot) msg.delete();

        //===========================
        //         Anti-Caps       ||
        //===========================

        if (msg_c.slice(0, 4) === msg_c.slice(0, 4).toUpperCase() && msg_c.slice(0, 4) !== msg_c.slice(0, 4).toLowerCase() && !msg.author.bot) {
            msg.delete();
            msg.reply("Please do not use CAPS!");
        };
    };
});

client.login('token');
