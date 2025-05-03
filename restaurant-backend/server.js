const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const categoriesRoutes = require("./src/routes/categories");
app.use("/api/categories", categoriesRoutes);

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully!");
  }
});

// Get all meals with category name and optional filter by category
app.get("/api/meals", (req, res) => {
  const { category_name } = req.query; // نستخدم category_name بدلاً من category_id

  let query = `
    SELECT meals.*, categories.name AS category_name
    FROM meals
    JOIN categories ON meals.category_id = categories.id
  `;

  let params = [];

  if (category_name) {
    query += ` WHERE categories.name = ?`;
    params.push(category_name);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error fetching meals:", err);
      res.status(500).send("Server error");
    } else {
      res.json(result);
    }
  });
});


// Get a single meal by ID
app.get("/api/meals/:id", (req, res) => {
  const mealId = req.params.id;
  const query = `
    SELECT meals.*, categories.name AS category_name
    FROM meals
    JOIN categories ON meals.category_id = categories.id
    WHERE meals.id = ?
  `;

  db.query(query, [mealId], (err, result) => {
    if (err) {
      console.error("Error fetching meal:", err);
      res.status(500).send("Server error");
    } else {
      res.json(result[0]);
    }
  });
});

// Add a new meal
app.post("/api/meals", (req, res) => {
  const { name, description, price, category_id, pic, made_by, rating, popularity } = req.body;
  const query = `
    INSERT INTO meals (name, description, price, category_id, pic, made_by, rating, popularity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [name, description, price, category_id, pic, made_by, rating, popularity], (err, result) => {
    if (err) {
      console.error("Error adding meal:", err);
      res.status(500).send("Server error");
    } else {
      res.status(201).json({ message: "Meal added successfully", id: result.insertId });
    }
  });
});

// Update a meal
app.put("/api/meals/:id", (req, res) => {
  const mealId = req.params.id;
  const { name, description, price, category_id, pic, made_by, rating, popularity } = req.body;
  const query = `
    UPDATE meals
    SET name = ?, description = ?, price = ?, category_id = ?, pic = ?, made_by = ?, rating = ?, popularity = ?
    WHERE id = ?
  `;

  db.query(query, [name, description, price, category_id, pic, made_by, rating, popularity, mealId], (err, result) => {
    if (err) {
      console.error("Error updating meal:", err);
      res.status(500).send("Server error");
    } else {
      res.json({ message: "Meal updated successfully" });
    }
  });
});

// Delete a meal
app.delete("/api/meals/:id", (req, res) => {
  const mealId = req.params.id;
  const query = "DELETE FROM meals WHERE id = ?";

  db.query(query, [mealId], (err, result) => {
    if (err) {
      console.error("Error deleting meal:", err);
      res.status(500).send("Server error");
    } else {
      res.json({ message: "Meal deleted successfully" });
    }
  });
});

// Get all categories for the select input
app.get("/api/categories", (req, res) => {
  const query = "SELECT * FROM categories";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      res.status(500).send("Server error");
    } else {
      res.json(result);
    }
  });
});

// Serve images
app.get("/pic/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "public", "pic", imageName);
  res.sendFile(imagePath);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
