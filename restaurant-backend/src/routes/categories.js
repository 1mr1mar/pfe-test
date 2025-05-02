const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all categories
router.get("/", (req, res) => {
  const sql = "SELECT * FROM categories";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).json({ error: "Failed to fetch categories" });
    }

    res.json(results);
  });
});

module.exports = router;
