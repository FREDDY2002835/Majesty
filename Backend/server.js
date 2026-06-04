const express = require("express");
const pool = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Majesty API is running"
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