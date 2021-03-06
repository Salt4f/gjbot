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

                    if (args.length < 2) {
                        msg.reply(`Elige una opción y pon su valor\n\`\`\`gjbot ${this.usage}\`\`\``);
                        return;
                    }

                    switch (args[0]) {
                        case 'email':
                            var pool = new Database.Pool();
                            pool.query("INSERT INTO inscrits values ($1::text);", [args[1]]).then(() => {
                                msg.reply(`Se ha registrado el email ${args[1]}`);
                            }).catch(err => {
                                msg.reply(`Ya está registrado el email ${args[1]}`);
                            })
                            break;
                        case 'ticket':
                            var pool = new Database.Pool();
                            pool.query("INSERT INTO tickets values ($1::text);", [args[1]]).then(() => {
                                msg.reply(`Se ha registrado el ticket ${args[1]}`);
                            }).catch(err => {
                                msg.reply(`Ya está registrado el ticket ${args[1]}`);
                            })
                            break;
                        default:
                            msg.reply(`Elige una opción válida y pon su valor\n\`\`\`gjbot ${this.usage}\`\`\``);
                            break;
                    }
                }
            })
            .catch(err => {
                return;
            })
        });

	},
};