const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'OKIDAjemo99@',
  database: 'okidabuilders',
});

module.exports = db;
