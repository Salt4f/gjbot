const Discord = require('discord.js');
const Database = require('pg');

const client = new Discord.Client();
//const db = new Database.Client();

const prefix = 'gjbot ';

const fs = require('fs');
const { exit } = require('process');
const { url } = require('inspector');
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
        channel.messages.fetch('802935389593403413', true); //PROGRAMMING
        channel.messages.fetch('802935440675569674', true); //GAME DESIGN
        channel.messages.fetch('802935480882167838', true); //MUSIC
        channel.messages.fetch('802935528495644692', true); //SOUND EFFECTS
        channel.messages.fetch('802935559378042921', true); //3D ART
        channel.messages.fetch('802935596511002674', true); //2D ART
        channel.messages.fetch('802935638012723240', true); //USER INTERFACE DESIGN      
    })

    client.channels.fetch('805027666125652009')
    .then(urlChannel => {
        urlChannel.send('Test');
    });

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
            case '802935389593403413': //PROGRAMMING
                guild.roles.fetch('802885024390184980')
                .then(role => {
                    guild.member(author).roles.add(role);
                })
                .catch(e => {
                    console.error(e)
                })
                break;
            case '802935440675569674': //GAME DESIGN
                guild.roles.fetch('802885293727416320')
                .then(role => {
                    guild.member(author).roles.add(role);
                })
                .catch(e => {
                    console.error(e)
                })
                break;
            case '802935480882167838': //MUSIC
                guild.roles.fetch('802885234986188830')
                .then(role => {
                    guild.member(author).roles.add(role);
                })
                .catch(e => {
                    console.error(e)
                })
                break;
            case '802935528495644692': //SOUND EFFECTS
                guild.roles.fetch('802885276611379220')
                .then(role => {
                    guild.member(author).roles.add(role);
                })
                .catch(e => {
                    console.error(e)
                })
                break;
            case '802935559378042921': //3D ART
                guild.roles.fetch('802885199649832960')
                .then(role => {
                    guild.member(author).roles.add(role);
                })
                .catch(e => {
                    console.error(e)
                })
                break;
            case '802935596511002674': //2D ART
                guild.roles.fetch('802885153005109299')
                .then(role => {
                    guild.member(author).roles.add(role);
                })
                .catch(e => {
                    console.error(e)
                })
                break;
            case '802935638012723240': //USER INTERFACE DESIGN
                guild.roles.fetch('802885537173078047')
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
