const Discord = require("discord.js");
const create = require("./groupCreate.js");
const join = require("./groupJoin.js");
const list = require("./groupList.js");

module.exports = {
	name: 'group',
	description: '',
	usage: '',
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args
     * @param {Discord.Client} client
     */
    execute(msg , args, client) {

        if (args.length < 1) {
            msg.channel.send("Comando demasiado corto");
            return;
        }

        client.guilds.fetch('780469092456726538', false, true).then( (guild) => {
            guild.members.fetch(msg.author)
            .then(member => {
                if (member.roles.cache.get('796321102418804806') != null ||
                    member.roles.cache.get('780474551280205868') != null ||
                    member.roles.cache.get('790210998225207296') != null) {
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

	},
};