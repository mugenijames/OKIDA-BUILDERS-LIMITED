const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all team members
router.get("/", (req, res) => {
  const query = "SELECT * FROM team_members";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch members" });
    res.json(results);
  });
});

// Add a new member
router.post("/", (req, res) => {
  const { name, role, photo } = req.body;
  const query = "INSERT INTO team_members (name, role, photo) VALUES (?, ?, ?)";
  db.query(query, [name, role, photo], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to add member" });
    res.status(201).json({ id: result.insertId, name, role, photo });
  });
});

// Update a member
router.put("/:member_id", (req, res) => {
  const { member_id } = req.params;
  const { name, role, photo } = req.body;

  const query =
    "UPDATE team_members SET name = ?, role = ?, photo = ? WHERE member_id = ?";
  db.query(query, [name, role, photo, member_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to update member" });
    if (result.affectedRows === 0)
      return res.status(404).send("Member not found");
    res.json({ member_id, name, role, photo });
  });
});

// Delete a member
router.delete("/:member_id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM team_members WHERE member_id = ?";
  db.query(query, [member_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to delete member" });
    if (result.affectedRows === 0)
      return res.status(404).send("Member not found");
    res.status(204).send();
  });
});

module.exports = router;
