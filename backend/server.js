const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/userdata");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

const userRoutes = require("./routes/users");
const restaurantRoutes = require("./routes/restaurants");
const menuItemRoutes = require("./routes/menuItems");
const orderRoutes = require("./routes/orders");

app.use("/users", userRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/menu-items", menuItemRoutes);
app.use("/profile", profileRoutes);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
