const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Render-hosted PostgreSQL requires TLS. Local PostgreSQL can opt out with PGSSLMODE=disable.
  ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 10,
});

pool.on('connect', () => {
  console.log('PostgreSQL connection established.');
});

// Log pool errors without terminating the entire service. A transient DB issue
// should not cause a restart loop; requests will return a controlled error.
pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err.message);
});

module.exports = pool;
