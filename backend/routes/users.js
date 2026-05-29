const express = require("express");
const router = express.Router();

const db = require("../database");

// GET users
router.get("/", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(rows);
    }
  });
});

// ADD user
router.post("/", (req, res) => {
  const { name, email, password, role } = req.body;

  const sql =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.run(sql, [name, email, password, role], function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({
        message: "User added successfully",
        id: this.lastID,
      });
    }
  });
});

module.exports = router;
