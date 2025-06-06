// backend/controllers/authController.js

exports.login = (req, res) => {
  const { email, password } = req.body;

  const adminEmail = 'admin@okida.com';
  const adminPassword = 'admin123';

  if (email === adminEmail && password === adminPassword) {
    // In a real app, you'd return a JWT token
    return res.status(200).json({ token: 'test-token', message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
};
