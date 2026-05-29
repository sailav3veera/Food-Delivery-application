const express = require("express");

const router = express.Router();

const db = require("../database");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM orders";

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/", (req, res) => {
  const { user_id, total_amount, cartItems } = req.body;

  const insertOrderQuery = `
    INSERT INTO orders (
      user_id,
      total_amount
    )
    VALUES (?, ?)
  `;

  db.run(
    insertOrderQuery,
    [user_id, total_amount],

    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      const orderId = this.lastID;

      const insertItemQuery = `
        INSERT INTO order_items (
          order_id,
          menu_item_id,
          quantity,
          subtotal
        )
        VALUES (?, ?, ?, ?)
      `;

      cartItems.forEach((item) => {
        db.run(insertItemQuery, [
          orderId,
          item.id,
          item.quantity,
          item.price * item.quantity,
        ]);
      });

      res.json({
        message: "Order placed successfully",
        order_id: orderId,
      });
    },
  );
});

module.exports = router;
