const Discord = require("discord.js");
const Database = require("pg");

module.exports = {
	name: 'group register',
	description: "Registra l'url del projecte del grup --- Registra la url del proyecto del grupo",
	usage: 'group register (url)',
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args
     * @param {Discord.Client} client
     */
    execute(msg, args, client) {

        if (args.length < 2) {
            msg.channel.send(`Introdueix una url si us plau\n---\nIntroduce una url por favor\n\`\`\`gjbot ${this.usage}\`\`\``);
            return;
        }

        console.log(`${msg.author.id} (${msg.author.tag}) intenta ejecutar gjbot group register`);
        
        var pool = new Database.Pool();

        pool.query("UPDATE grups SET project_url = $1::text WHERE grup_name = (SELECT grup FROM participants WHERE discord_id = $2::text);", [args[1], msg.author.id])
        .then(result => {
            if (result.rowCount == 0) {
                msg.channel.send(`No ets a cap grup registrat!\n---\n¡No estás en un grupo registrado!`);
            }
            else {
                console.log(`${msg.author.id} (${msg.author.tag}) registra para su grupo: ${args[1]}`);
                msg.channel.send(`Has registrat: ${args[1]}\n---\nHas registrado: ${args[1]}`);

                client.channels.fetch('805027666125652009')
                .then(urlChannel => {
                    urlChannel.messages.fetch('805054681499303988').then(mess => {
                        pool.query("SELECT g.grup_name as name, g.project_url as url FROM grups g WHERE g.project_url IS NOT NULL ORDER BY g.grup_name;")
                        .then(result => {
                            var list = '';
                            result.rows.forEach( (row) => {
                                list += row.name + ' - ' + row.url + '\n';
                            })
                            mess.edit(list);
                            //msg.channel.send(`¡Gracias ${user.username} por registrarte!`);
                        })
                        .catch(err => {
                            //if (err.code == '23503') msg.channel.send("¡No estabas registrado previamente!");
                            //else if (err.code == '23505') msg.channel.send("¡Ya estás registrado!");
                            console.error(err);
                        });
                    })
                })
                .catch(e => {
                    console.error(e);
                });
            }
        }).catch(err => {
            console.error(err);
        });

	},
};
