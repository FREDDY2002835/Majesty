-- Users table: stores all registered accounts
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  preferred_language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Translations table: stores every translation a user makes
CREATE TABLE IF NOT EXISTS translations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  original_text TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  source_language VARCHAR(10) NOT NULL,
  target_language VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);