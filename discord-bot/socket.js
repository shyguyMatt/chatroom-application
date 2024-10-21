const { io } = require('socket.io-client')

const URL = 'https://chatroom.shyguymatt.com'
socket = io(URL)

module.exports = { socket }