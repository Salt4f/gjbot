const Discord = require("discord.js");
const Database = require("pg");

module.exports = {
	name: 'group create',
	description: 'Crea un nuevo grupo de nombre group_name (¡sin espacios!)',
	usage: 'group create (group_name)',
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args 
     */
    execute(msg , args) {

        if (args.length < 2) {

            msg.channel.send(`Introduce un nombre de grupo por favor\n\`\`\`gjbot ${this.usage}\`\`\``);
            return;
        }
        
        var pool = new Database.Pool();
        var user = msg.author;
        pool.query("INSERT INTO grups values ($1::text);", [args[1]])
        .then(result => {
            msg.channel.send(`¡Grupo ${args[1]} creado!`);
        })
        .catch(err => {
            if (err.code == '23505') msg.channel.send("Lo siento, ya existe un grupo con ese nombre");
            else console.error(err);
        });

	},
};