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
            msg.channel.send("Introdueix l'email amb el que estàs registrat a la nostra location de la GGJ i el numero de la comanda del teu tiquet d'Eventbrite\n---\n"
                +`Introduce el email con el que estás registrado en nuestra location de la GGJ y el número de pedido de tu tique de Eventbrite\nUsage: \`\`\`gjbot ${this.usage}\`\`\``);
            return;
        }

        // super simple front-end email check, només really useful per a notificar l'user de que han comes probablement un typo
        if (!/\S+@\S+\.\S+/.test(args[0]))
        {
            msg.channel.send("L'email no sembla vàlid.. si us plau, revisa'l!\n---\nEl email no parece válido.. por favor, revísalo!");
            return;
        }
        // el nr de pedido de eventbrite ha de ser només numeros, aprox 10 characters
        if (!/^\d+$/.test(args[1]))
        {
            msg.channel.send("El número de comanda ha de consistir només de números.. si us plau, revisa'l!\n---\nEl número de pedido debe consistir sólo de números.. por favor, revísalo!\nEx: ```1234567890```");
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
                    if (err.code == '23503') msg.reply("No trobo el teu email entre els participants de la GGJ site!"
                        +"\nPots confirmar que t'has unit a la site i que l'email que m'has donat és el mateix amb el que has fet l'usuari de la GGJ?"
                        +"\nEn el cas de que t'hagis unit a la site en les últimes 24 hores, potser encara no tinc les dades actualitzades. Si us plau torna-ho a provar demà o contacta amb @Organització!"
                        +"\n---\n¡No encuentro tu email entre los participantes de la GGJ site!"
                        +"\nPuedes confirmar que te has unido a la site i que el email que me has dado es el mismo con el que te has hecho el usuario de la GGJ?"
                        +"\nEn caso de que te hayas unido a la site en las últimas 24 horas, quizás aún no tengo los datos actualizados. Por favor, vuelve a intentarlo mañana o contacta con @Organització!"+
                        "\n\nLink a la GGJ site: https://globalgamejam.org/2021/jam-sites/game-jam-barcelona-upc-2021");
                    else if (err.code == '23505') msg.reply("Ja estàs registrat!\n---\n¡Ya estás registrado!");
                    else console.error(err);
                });

            });
        });

        

	},
};