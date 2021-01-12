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

        client.guilds.fetch('780469092456726538').then( (guild) => {
            guild.members.fetch(msg.author).then(() => {
                console.log(`${msg.author.id} (${msg.author.tag}) intenta ejecutar gjbot register`);
        
                var pool = new Database.Pool();
                var user = msg.author;
                pool.query("INSERT INTO participants values ($1::text, $2::text, $3::text, $4::text);", [args[0], user.id, user.tag, args[1]])
                .then(result => {
                    client.guilds.fetch('780469092456726538').then( (guild) => {
                        guild.members.fetch(msg.author).then((guildUser) => {
                            guild.roles.fetch('796321102418804806').then( (role) => {
                                guildUser.roles.add(role);
                                msg.channel.send(`¡Gracias ${user.username} por registrarte!`);
                                console.log(`${user.id} (${user.tag}) tiene el rol de jammer ahora`);
                            });
                        });
                    });
                    
                })
                .catch(err => {
                    if (err.code == '23503') msg.reply("¡No estabas registrado previamente!");
                    else if (err.code == '23505') msg.reply("¡Ya estás registrado!");
                    else console.error(err);
                });

            });
        });

        

	},
};