const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all projects
router.get("/", (req, res) => {
  const query = "SELECT * FROM projects";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch projects" });
    res.json(results);
  });
});

// Add a new project
router.post("/", (req, res) => {
  const { title, description, image_url, created_at } = req.body;
  const query =
    "INSERT INTO projects (title, description, image_url, created_at) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [title, description, image_url, created_at],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Failed to add project" });
      res
        .status(201)
        .json({
          id: result.insertId,
          title,
          description,
          image_url,
          created_at,
        });
    }
  );
});

// Update a project
router.put("/:project_id", (req, res) => {
  const { project_id } = req.params;
  const { title, description, image_url, created_at } = req.body;

  const query =
    "UPDATE projects SET title = ?, description = ?, image_url = ?, created_at = ? WHERE project_id = ?";
  db.query(
    query,
    [title, description, image_url, created_at, project_id],
    (err, result) => {
      if (err)
        return res.status(500).json({ error: "Failed to update project" });
      if (result.affectedRows === 0)
        return res.status(404).send("Project not found not found");
      res.json({ project_id, title, description, image_url, created_at });
    }
  );
});

// Delete a project
router.delete("/:project_id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM projects WHERE project_id = ?";
  db.query(query, [project_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to delete project" });
    if (result.affectedRows === 0)
      return res.status(404).send("Project not found");
    res.status(204).send();
  });
});

module.exports = router;
