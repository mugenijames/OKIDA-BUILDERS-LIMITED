const mysql = require('mysql2/promise');
const db = require('../config/db');  // your MySQL connection pool

class Admin {
  static async findByUsername(username) {
    const [rows] = await db.execute('SELECT * FROM admins WHERE username = ?', [username]);
    return rows[0];
  }

  static async create({ username, email, password }) {
    const [result] = await db.execute(
      'INSERT INTO admins (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    return result.insertId;
  }
}

module.exports = Admin;
