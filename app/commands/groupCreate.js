const Discord = require("discord.js");
const Database = require("pg");

module.exports = {
	name: 'group create',
	description: 'Crea un nuevo grupo de nombre group_name',
	usage: 'group create (group_name)',
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args 
     */
    execute(msg , args) {

        if (args.length == 0) {
            msg.channel.send(`Introduce un nombre de grupo por favor\nEscribe \`\`\`gjbot ${usage}\`\`\``);
        }
        
        var pool = new Database.Pool();
        var user = msg.author;
        pool.query("INSERT INTO participants values ($1::text, $2::text, $3::text);", [args[0], user.id, user.tag])
        .then(result => {
            msg.channel.send(`¡Gracias ${user.username} por registrarte!`);
        })
        .catch(err => {
            if (err.code == '23503') msg.channel.send("¡No estabas registrado previamente!");
            else if (err.code == '23505') msg.channel.send("¡Ya estás registrado!");
        });

	},
};