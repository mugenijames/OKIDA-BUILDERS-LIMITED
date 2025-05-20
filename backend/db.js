const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "OKIDAjemo99@", // Replace with your MySQL password
  database: "okidabuilders", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    process.exit(1);
  }
  console.log("Connected to MySQL");
});

module.exports = db;
