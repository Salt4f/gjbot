//const Discord = require("discord.js");
const create = require("./groupCreate.js");
const join = require("./groupJoin.js");
const list = require("./groupList.js");

module.exports = {
	name: 'group',
	description: '',
	usage: '',
    /**
     * 
     * @param {Discord.Message} msg 
     * @param {string[]} args 
     */
    execute(msg , args) {

        if (args.length < 1) {
            msg.channel.send("Comando demasiado corto");
            return;
        }
        
        switch (args[0]) {
            case 'create':
                create.execute(msg, args);
                break;
            case 'join':
                join.execute(msg, args);
                break;
            case 'list':
                list.execute(msg, args);
                break;
            default:
                break;
        }

	},
};