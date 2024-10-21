const { createPool } = require('mysql2')
const dotenv = require('dotenv')

dotenv.config();

const db = createPool({
  host: DBHOST,
  user: DBUSER,
  password: DBPASSWORD,
  database: 'chatroomMessages'
}).promise()

module.exports = db
