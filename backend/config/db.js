const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'OKIDAjemo99@',
  database: 'okidabuilder',
});

module.exports = db;
