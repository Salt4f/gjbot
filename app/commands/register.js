const Discord = require("discord.js");
const Database = require("pg");

module.exports = {
	name: 'register',
	description: 'Te registra como participante',
	usage: 'register (email) (ticket_id)',
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args 
     * @param {Discord.Client} client
     */
    execute(msg, args, client) {
        
        if (args.length < 2) {
            msg.channel.send(`Introduce un correo y el identificador del ticket por favor\nEscribe \`\`\`gjbot ${this.usage}\`\`\``);
            return;
        }
        
        var pool = new Database.Pool();
        var user = msg.author;
        pool.query("INSERT INTO participants values ($1::text, $2::text, $3::text, $4::text);", [args[0], user.id, user.tag, args[1]])
        .then(result => {
            msg.channel.send(`¡Gracias ${user.username} por registrarte!`);
        })
        .catch(err => {
            if (err.code == '23503') msg.channel.send("¡No estabas registrado previamente!");
            else if (err.code == '23505') msg.channel.send("¡Ya estás registrado!");
            else console.error(err);
        });

	},
};