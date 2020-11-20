const Discord = require("discord.js");
const Database = require("pg");

module.exports = {
	name: 'register',
	description: 'Te registra',
	usage: 'register',
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args 
     */
    execute(msg , args) {
        
        var pool = new Database.Pool();
        var user = msg.author;
        pool.query("INSERT INTO participants values ($1);", [user.tag])
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            if (err.code == '23503') msg.reply("Not previously registered!");
            else if (err.code == '23505') msg.reply("Already registered!");
        });

	},
};