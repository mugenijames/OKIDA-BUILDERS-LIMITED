const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

router.get('/', async (req, res) => {
  console.log('GET /api/team-members hit');
  try {
    const [rows] = await db.query('SELECT * FROM team_members');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching team members:', err.message);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

module.exports = router;
