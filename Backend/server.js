const express = require("express");
const authRoutes = require("./routes/authRoutes");
const pool = require("./config/db");
const cors = require("cors");
const protect = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Majesty API is running"
  });
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected data!",
    user: req.user
  });
});

const PORT = process.env.PORT || 5000;

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully");
    console.log(result.rows[0]);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});