const express = require("express");

const router = express.Router();

const db = require("../database");

router.get("/:useremail", (req, res) => {
  const { useremail } = req.params;

  const sql = `
    SELECT * FROM users
    WHERE email = ?
  `;

  db.all(sql, [useremail], (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
