const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const db = require('./config/database');
const authRoutes = require('./routes/auth');
const translateRoutes = require('./routes/translate');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/translate', translateRoutes);

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Majesty API is running!' });
});

// 👇 Add this route to test the database
app.get('/api/health/db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW() as time');
    res.json({ status: 'ok', db_time: result.rows[0].time });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});