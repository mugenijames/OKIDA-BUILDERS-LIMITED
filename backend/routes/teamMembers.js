const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM team_members';

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching team members:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    res.json(results);
  });
});

module.exports = router;
