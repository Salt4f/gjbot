const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
fs.readFile('data/token', (err, data) => {
    if (err) {
        return console.error(err);
    }
    client.login(data.toString());
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.users.fetch('469515141239668786').then( user => {
        user.send('Estoy listo!');
    });
});

client.on('message', msg => {
    if (msg.author.id == '207837369787744257')
    {
        msg.channel.send('Hola Ernitis!');
    }
});