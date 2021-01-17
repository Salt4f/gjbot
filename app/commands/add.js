const Discord = require("discord.js");
const Database = require("pg");

module.exports = {
	name: 'add',
	description: 'Registra un nuevo email o ticket',
	usage: 'add {email | ticket} (arg)',
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args
     * @param {Discord.Client} client
     */
    execute(msg, args, client) {

        client.guilds.fetch('780469092456726538', false, true).then( (guild) => {
            guild.members.fetch(msg.author)
            .then(member => {
                if (member.roles.cache.get('780474551280205868') != null) {
                    switch (args[0]) {
                        case 'create':
                            create.execute(msg, args, client);
                            break;
                        case 'join':
                            join.execute(msg, args, client);
                            break;
                        case 'list':
                            list.execute(msg, args, client);
                            break;
                        default:
                            break;
                    }
                }
            })
            .catch(err => {
                return;
            })
        });

        if (args.length < 2) {

            msg.channel.send(`Introduce un nombre de grupo por favor\n\`\`\`gjbot ${this.usage}\`\`\``);
            return;
        }

        console.log(`${msg.author.id} (${msg.author.tag}) intenta ejecutar gjbot group join`);
        
        var pool = new Database.Pool();

        pool.query("UPDATE participants SET grup = $1::text WHERE discord_id = $2::text", [args[1], msg.author.id])
        .then(result => {
            console.log(`${msg.author.id} (${msg.author.tag}) se une al grupo ${args[1]}`);
            msg.reply(`¡Unido al grupo ${args[1]}!`);
        }).catch(err => {
            if (err.code == '23503') msg.reply(`El grupo ${args[1]} no existe`)
            else console.error(err);
        });

	},
};