const express = require('express');
const cors = require('cors');
const path = require('path');

const adminAuthRoutes = require('./routes/adminAuth');
const teamMembersRoutes = require('./routes/teamMembers');
const messagesRoutes = require('./routes/messages');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api', adminAuthRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/team-members', teamMembersRoutes);

// Serve frontend build (if using React build in production)
app.use(express.static(path.join(__dirname, '../okidabuilders/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../okidabuilders/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
