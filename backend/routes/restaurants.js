const express = require("express");
const router = express.Router();

const db = require("../database");

/* GET all restaurants */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM restaurants";

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(rows);
    }
  });
});

/* ADD new restaurant */
router.post("/", (req, res) => {
  const { name, address, phone, image_url } = req.body;

  const sql = `
    INSERT INTO restaurants 
    (name, address, phone, image_url)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [name, address, phone, image_url], function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({
        message: "Restaurant added successfully",
        id: this.lastID,
      });
    }
  });
});

module.exports = router;
