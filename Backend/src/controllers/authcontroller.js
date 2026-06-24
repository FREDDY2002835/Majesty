const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Helper: generate a JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// POST /api/auth/signup
const signup = async (req, res) => {
  const { name, email, password, preferred_language = 'en' } = req.body;

  try {
    // Check if email already exists
    const existing = await pool.query(
      'SELECT id FROM users WHERE email = $1', [email]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    // Hash the password (never store plain passwords)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save user to database
    const result = await pool.query(
      `INSERT INTO users (name, email, password, preferred_language)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, preferred_language, created_at`,
      [name, email, hashedPassword, preferred_language]
    );

    const user = result.rows[0];
    const token = generateToken(user);

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error during signup.' });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare password with hashed version
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Logged in successfully!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        preferred_language: user.preferred_language
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, preferred_language, created_at, avatar FROM users WHERE id = $1',
      [req.user.id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ user: result.rows[0] });

  } catch (err) {
    console.error('getMe error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// PUT /api/auth/me
const updateMe = async (req, res) => {
  const { name, preferred_language, password } = req.body;

  try {
    let hashedPassword = null;

    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    const result = await pool.query(
      `UPDATE users
       SET
         name = COALESCE($1, name),
         preferred_language = COALESCE($2, preferred_language),
         password = COALESCE($3, password),
         updated_at = NOW()
       WHERE id = $4
       RETURNING id, name, email, preferred_language, avatar`,
       
      [
        name,
        preferred_language,
        hashedPassword,
        req.user.id
      ]
    );

    res.json({
      message: 'Profile updated.',
      user: result.rows[0]
    });

  } catch (err) {
    console.error('updateMe error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// DELETE /api/auth/me
const deleteMe = async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [req.user.id]);
    res.json({ message: 'Account deleted successfully.' });

  } catch (err) {
    console.error('deleteMe error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};


const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    await pool.query(
      'UPDATE users SET avatar = $1 WHERE id = $2',
      [avatarUrl, req.user.id]
    );

    res.json({ message: 'Avatar updated!', avatar: avatarUrl });

  } catch (err) {
    console.error('Avatar upload error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};




module.exports = { signup, login, getMe, updateMe, deleteMe, uploadAvatar };