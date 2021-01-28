const Discord = require("discord.js");

const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
let list = '';
for (const file of commandFiles) {
	if (file !== 'help.js' && file !== 'group.js' && file !== 'add.js' && file !== 'alone.js') {
		const command = require(`./${file}`);
		list += `${'`'}${command.usage}${'`'}:      ${command.description}\n`;
	}
}
const attachment = new Discord.MessageAttachment('./resources/gjb.png', 'gjb.png')

module.exports = {
	name: 'help',
	description: 'Enseña este mensaje',
	usage: 'help',
	execute(msg, args, client) {

		const embed = new Discord.MessageEmbed()
		.setTitle('GameJamBarcelona Online Bot')
		.setColor('#6DC5E5')
		.attachFiles(attachment)
		.setThumbnail('attachment://gjb.png')
		.addFields({name: 'Commands', value: list});
		
		msg.channel.send({embed});
	},
};