const Discord = require('discord.js');
const Database = require('pg');

const client = new Discord.Client();
//const db = new Database.Client();

const prefix = 'gjbot ';

const fs = require('fs');
const { exit } = require('process');
fs.readFile('data/token', (err, data) => {
    if (err) {
        return console.error(err);
    }
    client.login(data.toString()).catch(() => {
        console.error('Could not login!');
        exit(1);
    });
});

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    if (file != 'help.js') {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.users.fetch('469515141239668786')
    .then( user => {
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
        command.execute(msg, args, client);
    }
    catch (error) {
        console.error(error);
    }

});

/*client.on('guildMemberAdd', async userM => {

    /*if (userM.guild.id != '780469092456726538') return;

    userM.createDM().then(channel => {
        channel.send(`¡Hola ${userM.user.username}! Gracias por unirte al servidor. Para poder acceder al servidor introduce el siguiente comando: \`\`\`gjbot register (email) (ticket_id)\`\`\`
        \ndonde _email_ es el correo que usaste para registrarte en la página de la Global Game Jam y *ticket_id* es el código del ticket de eventbrite.`)
    });

});*/
