const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = 'gjbot ';

const fs = require('fs');
fs.readFile('data/token', (err, data) => {
    if (err) {
        return console.error(err);
    }
    client.login(data.toString());
});

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.users.fetch('469515141239668786').then( user => {
        user.send('Estoy listo!');
    });
});

client.on('message', async msg => {

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(msg, args);
    }
    catch (error) {
        console.error(error);
    }

});