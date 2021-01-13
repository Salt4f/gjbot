const Discord = require("discord.js");
const Database = require("pg");

module.exports = {
	name: 'register',
	description: 'Et registra com a participant --- Te registra como participante',
	usage: 'register (email_ggj_site) (order_nr_eventbrite)',
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args 
     * @param {Discord.Client} client
     */
    execute(msg, args, client) {
        
        if (args.length < 2) {
            msg.channel.send("Introdueix l'email amb el que estas registrat a la nostra location de la GGJ i el numero de la comanda del teu tiquet d'Eventbrite\n---\n"
                +"Introduce el email con el que estas registrado en nuestra location de la GGJ y el numero de pedido de tu tiquet de Eventbrite\nUsage: ```gjbot ${this.usage}```");
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
                                msg.channel.send(`Gràcies ${user.username}! El registre s'ha completat correctament.\n---\n¡Gracias ${user.username}! El registro se ha completado correctamente.`);
                                console.log(`${user.id} (${user.tag}) tiene el rol de jammer ahora`);
                            });
                        });
                    });
                    
                })
                .catch(err => {
                    if (err.code == '23503') msg.reply("No estaves registrat previament!\n---\n¡No estabas registrado previamente!");
                    else if (err.code == '23505') msg.reply("Ja estas registrat!\n---\n¡Ya estás registrado!");
                    else console.error(err);
                });

            });
        });

        

	},
};