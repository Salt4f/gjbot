const Discord = require("discord.js");
const Database = require("pg");

module.exports = {
	name: 'alone',
	description: 'Lista los participantes registrados sin grupo',
	usage: 'alone',
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
                if (member.roles.cache.get('780474551280205868') != null ||
                    member.roles.cache.get('790210998225207296') != null) {

                    var pool = new Database.Pool();
                    pool.query("SELECT discord_tag FROM participants WHERE grup IS NULL;").then(result => {
                        var list = '';
                        result.rows.forEach( (row) => {
                            list += row.discord_tag + '\n';
                        })
                        msg.channel.send(list);
                    });
                }
            })
            .catch(err => {
                return;
            })
        });

	},
};