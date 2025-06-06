const express = require('express');
const cors = require('cors');
const path = require('path');

const adminAuthRoutes = require('./routes/adminAuth');
const teamMembersRoutes = require('./routes/teamMembers');
const messagesRoutes = require('./routes/messages');

const app = express();

const PORT = process.env.PORT || 5000;

// Use cors and body parser BEFORE routes
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/messages', messagesRoutes);
app.use('/api', adminAuthRoutes);
app.use('/api/team-members', teamMembersRoutes);

// Serve frontend static files (your React build)
app.use(express.static(path.join(__dirname, '../okidabuilders/dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Catch-all to serve React's index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../okidabuilders/dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
