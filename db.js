const { createPool } = require('mysql2')
const dotenv = require('dotenv')

dotenv.config();

const db = createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: 'chatroomMessages'
}).promise()

module.exports = db
