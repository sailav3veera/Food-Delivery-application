const express = require("express");

const router = express.Router();

const db = require("../database");

/* GET MENU ITEMS BY RESTAURANT */

router.get("/:restaurantId", (req, res) => {
  const { restaurantId } = req.params;

  const sql = `
    SELECT * FROM menu_items
    WHERE restaurant_id = ?
  `;

  db.all(sql, [restaurantId], (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(rows);
    }
  });
});

/* ADD MENU ITEM */

router.post("/", (req, res) => {
  const {
    restaurant_id,
    item_name,
    description,
    price,
    image_url,
  } = req.body;

  const sql = `
    INSERT INTO menu_items
    (
      restaurant_id,
      item_name,
      description,
      price,
      image_url
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      restaurant_id,
      item_name,
      description,
      price,
      image_url,
    ],
    function (err) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({
          message: "Menu item added successfully",
          id: this.lastID,
        });
      }
    }
  );
});

module.exports = router;