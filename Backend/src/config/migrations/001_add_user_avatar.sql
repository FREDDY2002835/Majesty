-- Safe to run on an existing PostgreSQL database; does not delete user data.
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT;
