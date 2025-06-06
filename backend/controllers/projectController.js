const db = require('../config/db');

// Get all projects
exports.getAllProjects = (req, res) => {
  db.query('SELECT * FROM projects', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Create a new project
exports.createProject = (req, res) => {
  const { title, description, image_url } = req.body;
  db.query(
    'INSERT INTO projects (title, description, image_url) VALUES (?, ?, ?)',
    [title, description, image_url],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, title, description, image_url });
    }
  );
};

// Update a project
exports.updateProject = (req, res) => {
  const { id } = req.params;
  const { title, description, image_url } = req.body;
  db.query(
    'UPDATE projects SET title = ?, description = ?, image_url = ? WHERE id = ?',
    [title, description, image_url, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, title, description, image_url });
    }
  );
};

// Delete a project
exports.deleteProject = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM projects WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Project deleted successfully' });
  });
};
