const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// POST /api/upload (form-data with 'image')
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

module.exports = router;
