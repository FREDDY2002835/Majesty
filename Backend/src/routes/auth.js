const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { signup, login, getMe, updateMe, deleteMe } = require('../controllers/authController');

// Public routes (no token needed)
router.post('/signup', signup);
router.post('/login', login);

// Protected routes (token required)
router.get('/me', auth, getMe);
router.put('/me', auth, updateMe);
router.delete('/me', auth, deleteMe);

module.exports = router;