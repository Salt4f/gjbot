const Discord = require("discord.js");
const Database = require("pg");

module.exports = {
	name: 'group join',
	description: "T'afegeix al grup especificat --- Te une al grupo especificado",
	usage: 'group join (group_name)',
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args
     * @param {Discord.Client} client
     */
    execute(msg, args, client) {

        if (args.length < 2) {
            msg.channel.send(`Introdueix un nom de grupo si us plau\n---\nIntroduce un nombre de grupo por favor\n\`\`\`gjbot ${this.usage}\`\`\``);
            return;
        }

        console.log(`${msg.author.id} (${msg.author.tag}) intenta ejecutar gjbot group join`);
        
        var pool = new Database.Pool();

        pool.query("UPDATE participants SET grup = $1::text WHERE discord_id = $2::text", [args[1], msg.author.id])
        .then(result => {
            console.log(`${msg.author.id} (${msg.author.tag}) se une al grupo ${args[1]}`);
            msg.channel.send(`T'has unit al grup ${args[1]}\n---\n¡Te has unido al grupo ${args[1]}!`);
        }).catch(err => {
            if (err.code == '23503') msg.reply(`El grup ${args[1]} no existeix\n---\n El grupo ${args[1]} no existe`)
            else console.error(err);
        });

	},
};
