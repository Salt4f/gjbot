const Discord = require("discord.js");
const Database = require("pg");

module.exports = {
	name: 'vote',
	description: "Registra la teva puntuació al projecte del grup especificat --- Registra tu puntuación al proyecto del grupo especificado",
	usage: 'vote (grup_name) (punt)',
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args
     * @param {Discord.Client} client
     */
    execute(msg, args, client) {

        client.guilds.fetch('780469092456726538', false, true).then( (guild) => {
            guild.members.fetch(msg.author)
            .then(member => {
                if (member.roles.cache.get('796321102418804806') != null) {

                    if (args.length < 2) {
                        msg.channel.send(`Introdueix el nom d'un grup i una puntuació de l'1 al 5 si us plau\n---\nIntroduce el nombre de un grupo y una puntuación del 1 al 5 por favor\n\`\`\`gjbot ${this.usage}\`\`\``);
                        return;
                    }

                    var punt = Number(args[1]);

                    if (punt == NaN || punt < 1 || punt > 5) {
                        msg.channel.send(`Introdueix una puntuació de l'1 al 5 si us plau\n---\nIntroduce una puntuación del 1 al 5 por favor\n\`\`\`gjbot ${this.usage}\`\`\``)
                        return;
                    }

                    var pool = new Database.Pool();

                    pool.query("SELECT grup FROM participants WHERE discord_id = $1::text;", [msg.author.id]).then(res => {
                        if (res.rowCount == 0) {
                            msg.reply(`No ets a cap grup!\n---\n¡No estás en ningún grupo!`);
                            return;
                        }

                        if (res.rows[0].grup == args[0]) {
                            msg.reply(`No et pots votar a tú mateix!\n---\n¡No te puedes votar a ti mismo!`);
                            return;
                        }

                        pool.query("SELECT punt FROM votes WHERE discord_id = $1::text AND grup_name = $2::text;", [msg.author.id, args[0]]).then(result => {
                            if (result.rowCount == 0) {
                                pool.query("INSERT INTO votes VALUES($1::text, $2::text, $3::integer);", [msg.author.id, args[0], punt])
                                .then(res => {
                                    msg.reply(`Has registrat: ${args[0]} - ${args[1]} \n---\nHas registrado: ${args[1]}`);
                                })
                                .catch(err => {
                                    if (err.code == '23503') msg.reply(`El grup ${args[0]} no existeix!\n---\n¡El grupo ${args[0]} no existe!`);
                                    else console.error(err);
                                });
                            }
                            else {
                                pool.query("UPDATE votes SET punt = $3::integer WHERE discord_id = $1::text AND grup_name = $2::text;", [msg.author.id, args[0], punt])
                                .then(res => {
                                    msg.reply(`Has registrat: ${args[0]} - ${args[1]} \n---\nHas registrado: ${args[1]}`);
                                })
                                .catch(err => {
                                    console.error(err);
                                });
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        });
                    })
                }
            })
            .catch(err => {
                return;
            })
        });

	},
};