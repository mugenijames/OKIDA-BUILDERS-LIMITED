const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Your MySQL connection

// Get all messages
router.get("/", (req, res) => {
  db.query("SELECT * FROM messages ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get message by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM messages WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Not found" });
    res.json(results[0]);
  });
});

// Create new message
router.post("/", (req, res) => {
  const { name, email, subject, message } = req.body;
  db.query(
    "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
    [name, email, subject, message],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Message received!" });
    }
  );
});

// Update message
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, message } = req.body;
  db.query(
    "UPDATE messages SET name = ?, email = ?, message = ? WHERE id = ?",
    [name, email, message, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, name, email, message });
    }
  );
});

// Delete message
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM messages WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Deleted successfully" });
  });
});

module.exports = router;
