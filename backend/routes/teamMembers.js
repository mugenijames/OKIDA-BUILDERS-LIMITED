const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// ✅ Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Get all team members
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM team_members');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// ✅ Update a team member with optional photo
router.put('/:id', upload.single('photo'), async (req, res) => {
  const memberId = req.params.id;
  const { name, role } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    let query = 'UPDATE team_members SET name = ?, role = ?';
    const values = [name, role];

    if (photo) {
      query += ', photo = ?';
      values.push(photo);
    }

    query += ' WHERE member_id = ?';
    values.push(memberId);

    await db.query(query, values);
    res.json({ message: 'Team member updated successfully' });
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ error: 'Failed to update team member' });
  }
});


module.exports = router;
