const Discord = require("discord.js");
const Database = require("pg");

module.exports = {
	name: 'group list',
	description: 'Muestra los grupos creados y sus miembros',
	usage: 'group list',
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args
     * @param {Discord.client} client
     */
    execute(msg, args, client) {

        console.log(`${msg.author.id} (${msg.author.tag}) intenta ejecutar gjbot group list`);
        
        var pool = new Database.Pool();
        pool.query("SELECT g.grup_name as name, p.discord_tag as tag FROM grups g, participants p WHERE g.grup_name = p.grup ORDER BY g.grup_name, p.discord_tag;")
        .then(result => {
            var list = ', ';
            var lastGroup = null;
            result.rows.forEach( (row) => {
                if (row.name != lastGroup) {
                    list = list.slice(0, list.length - 2); 
                    list += '\n' + row.name + ' - ';
                    lastGroup = row.name;
                }
                list += row.tag + ', ';
            })
            list = list.slice(0, list.length - 2);
            msg.channel.send(list);
            //msg.channel.send(`¡Gracias ${user.username} por registrarte!`);
        })
        .catch(err => {
            //if (err.code == '23503') msg.channel.send("¡No estabas registrado previamente!");
            //else if (err.code == '23505') msg.channel.send("¡Ya estás registrado!");
            console.error(err);
        });

	},
};
