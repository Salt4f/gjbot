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
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.channels.fetch('780480286286020618')
    .then(channel => {
        channel.messages.fetch('messageID', true);
        channel.messages.fetch('messageID', true);
        channel.messages.fetch('messageID', true);        
    })


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

client.on('messageReactionAdd', async (msg, author) => {

    if (msg.message.channel != '780480286286020618' || author.bot) return; //Canal anuncis

    client.guilds.fetch('780469092456726538')
    .then(guild => {
        switch (msg.message.id) {
            case 'messageID':
                guild.roles.fetch('roleID')
                .then(role => {
                    guild.member(author).roles.add(role);
                })
                .catch(e => {
                    console.error(e)
                })
                break;
            default:
                break;
        }
        
    })
    .catch(e => {
        console.error(e)
    })

});

/*client.on('guildMemberAdd', async userM => {

    /*if (userM.guild.id != '780469092456726538') return;

    userM.createDM().then(channel => {
        channel.send(`¡Hola ${userM.user.username}! Gracias por unirte al servidor. Para poder acceder al servidor introduce el siguiente comando: \`\`\`gjbot register (email) (ticket_id)\`\`\`
        \ndonde _email_ es el correo que usaste para registrarte en la página de la Global Game Jam y *ticket_id* es el código del ticket de eventbrite.`)
    });

});*/
