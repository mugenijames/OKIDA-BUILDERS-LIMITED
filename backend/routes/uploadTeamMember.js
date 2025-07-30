const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../config/db');

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // save in backend/uploads/
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST /api/team-members/upload
router.post('/team-members/upload', upload.single('photo'), async (req, res) => {
  const { name, role } = req.body;
  const photo = `/uploads/${req.file.filename}`;

  try {
    await db.query(
      'INSERT INTO team_members (name, role, photo) VALUES (?, ?, ?)',
      [name, role, photo]
    );
    res.status(201).json({ message: 'Team member added successfully' });
  } catch (err) {
    console.error('Error adding team member:', err);
    res.status(500).json({ error: 'Failed to add team member' });
  }
});

module.exports = router;
