const Discord = require("discord.js");
const Database = require("pg");

module.exports = {
	name: 'group create',
	description: 'Crea un nou grup amb nom *group_name* (Sense espais!) --- Crea un nuevo grupo de nombre *group_name* (¡sin espacios!)',
	usage: 'group create (group_name)',
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args 
     * @param {Discord.Client} client
     */
    execute(msg, args, client) {

        if (args.length < 2) {

            msg.channel.send(`Introdueix un nom de grup si us plau\n---\nIntroduce un nombre de grupo por favor\n\`\`\`gjbot ${this.usage}\`\`\``);
            return;
        }
        else if (args.length > 2)
        {
            msg.channel.send(`El nom de grup no pot contenir espais\n---\n¡El nombre de grupo no puede tener espacios!\n\`\`\`gjbot ${this.usage}\`\`\``);
            return;
        }
        
        console.log(`${msg.author.id} (${msg.author.tag}) intenta ejecutar gjbot group create`);

        var pool = new Database.Pool();
        pool.query("INSERT INTO grups values ($1::text);", [args[1]])
        .then(result => {
            msg.channel.send(`Grup ${args[1]} creat!\n---\n¡Grupo ${args[1]} creado!`);
            console.log(`Grupo ${args[1]} creado`);
            pool.query("UPDATE participants SET grup = $1::text WHERE discord_id = $2::text", [args[1], msg.author.id])
            .then(() => {
                console.log(`${msg.author.id} (${msg.author.tag}) se une al grupo ${args[1]}`);
                msg.channel.send(`T'has unit al grup ${args[1]}\n---\n¡Te has unido al grupo ${args[1]}!`);
            }).catch(err => {
                console.error(err);
            });
        })
        .catch(err => {
            if (err.code == '23505') msg.channel.send("Disculpes, sembla que ja existeix un grup amb aquest nom\n---\nLo siento, ya existe un grupo con ese nombre");
            else console.error(err);
        });

	},
};
