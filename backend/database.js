const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./foodDelivery.db", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

/* USERS TABLE */
db.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
)
`);

/* RESTAURANTS TABLE */
db.run(`
CREATE TABLE IF NOT EXISTS restaurants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  image_url TEXT
)
`);

/* MENU ITEMS TABLE */
db.run(`
CREATE TABLE IF NOT EXISTS menu_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  restaurant_id INTEGER,
  item_name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  is_available INTEGER DEFAULT 1,
  image_url TEXT,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
)
`);

/* ORDERS TABLE */
db.run(`
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  total_amount REAL,
  order_status TEXT DEFAULT 'Pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
)
`);

/* ORDER ITEMS TABLE */
db.run(`
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER,
  menu_item_id INTEGER,
  quantity INTEGER,
  subtotal REAL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
)
`);

/* PAYMENTS TABLE */
db.run(`
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER,
  payment_method TEXT,
  payment_status TEXT,
  FOREIGN KEY (order_id) REFERENCES orders(id)
)
`);

/* REVIEWS TABLE */
db.run(`
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  restaurant_id INTEGER,
  rating INTEGER,
  comment TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
)
`);

module.exports = db;
