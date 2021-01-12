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
     * @param {Discord.Client} client
     */
    execute(msg, args, client) {

        if (args.length < 2) {

            msg.channel.send(`Introduce un nombre de grupo por favor\n\`\`\`gjbot ${this.usage}\`\`\``);
            return;
        }
        
        console.log(`${msg.author.id} (${msg.author.tag}) intenta ejecutar gjbot group create`);

        var pool = new Database.Pool();
        pool.query("INSERT INTO grups values ($1::text);", [args[1]])
        .then(result => {
            msg.channel.send(`¡Grupo ${args[1]} creado!`);
            console.log(`Grupo ${args[1]} creado`);
            pool.query("UPDATE participants SET grup = $1::text WHERE discord_id = $2::text", [args[1], msg.author.id])
            .then(() => {
                console.log(`${msg.author.id} (${msg.author.tag}) se une al grupo ${args[1]}`);
                msg.channel.send(`¡Unido al grupo ${args[1]}!`);
            }).catch(err => {
                console.error(err);
            });
        })
        .catch(err => {
            if (err.code == '23505') msg.channel.send("Lo siento, ya existe un grupo con ese nombre");
            else console.error(err);
        });

	},
};