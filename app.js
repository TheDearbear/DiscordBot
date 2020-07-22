'use strict';
const timer = ms => new Promise(res => setTimeout(res, ms));
const Discord = require('discord.js');
const client = new Discord.Client();;


console.log('Discord bot by TheDearbear');

client.once('ready', () => console.log('Ready for use!'));

client.on('guildMemberAdd', member => {
    console.log("=================New=member==================");
    console.log("Member ID: " + member.toString());
    console.log("Member Username: " + member.username.toString());
    console.log("=============================================");
    member.roles.add('somerole');
});

client.on('message', msg => {
    //===========================
    //   Account Verification  ||
    //===========================
    if (msg.channel.id == 'channelid' && msg.content.slice(0, 8) == '/verify ' && msg.content.slice(18, 19) == '') {
        var ikey = msg.content.slice(8, 18);

        console.log("=================New=verification============");
        console.log("Verificator ID: " + msg.author.id);
        console.log("Verificator Username: " + msg.author.username);
        console.log("Verification key: " + ikey);
        console.log("=============================================");

        if (ikey == 'ikey' || ikey == 'ikey' || ikey == 'ikey' || ikey == 'ikey' || ikey == 'ikey' || ikey == 'ikey' || ikey == 'ikey') {
            msg.delete();
            msg.reply("Добро пожаловать!").then(_=> msg.member.roles.remove('somerole').then(_=> msg.channel.lastMessage.delete()));

            if (ikey == 'ikey') {
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
            } else if (ikey == 'ikey') {
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
            } else if (ikey == 'ikey') {
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
            } else if (ikey == 'ikey') {
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
            } else if (ikey == 'ikey') {
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
            } else if (ikey == 'ikey') {
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
            } else if (ikey == 'ikey') {
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
                msg.member.roles.add('somerole');
            }
        } else msg.delete();
    } else if (msg.channel.id == 'channelid' && msg.author.bot === false) msg.delete();
});


client.login('token');
