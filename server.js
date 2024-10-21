const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors')
const path = require('path')

const db = require('./db')
const port = 1300;

const corsOptions = {
  origin: 'https://shyguymatt.com/',
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.static(path.join(__dirname, 'chatbox')))
app.use(cors(corsOptions))

//routes
io.on('connection', async (socket) => {
  const [data] = await db.query("SELECT * FROM messages")
  let socketId = socket.id
  io.to(socketId).emit('chat logs', data)
});

io.on('connection', (socket) => {
  socket.on('chat message', async (msg) => {
    const user = msg.user;
    const message = msg.message
    const color = msg.color
    
    try {
      await db.query(`INSERT INTO messages (user, message, color) VALUES ('${user}', '${message}', '${color}')`)
      io.emit('chat message', {
        message: message,
        user: user,
        color: color
      });
    } catch (err) {
      console.log(err)
      let socketId = socket.id
      io.to(socketId).emit('error send', message)
    }
  });
});

io.on('connection', (socket) => {
  socket.on('discord chat message', async (msg) => {
    const user = msg.user;
    const message = msg.message
    const color = msg.color
    await db.query(`INSERT INTO messages (user, message, color) VALUES ('${user}', '${message}', '${color}')`)
    io.emit('discord chat message', {
      message: message,
      user: user,
      color: color
    });
  });
});

app.get('/test', async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM messages")
    res.send(data)   
  } catch (err) {
    console.log(err)
    res.send(err)
  }

})

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});