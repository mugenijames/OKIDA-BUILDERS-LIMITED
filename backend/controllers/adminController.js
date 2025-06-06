const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Admin Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findByUsername(username);
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, username: admin.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
