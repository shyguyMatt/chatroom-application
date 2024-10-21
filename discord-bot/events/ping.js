const { Events } = require('discord.js');
const { socket } = require('./../socket')

module.exports = {
	name: Events.MessageCreate,
	execute(message) {
    if (!message.author.bot == true) {
      socket.emit('discord chat message', {
        message: message.content,
        user: message.author.username,
        color: '#577c8a'
      });
    }
	},
};