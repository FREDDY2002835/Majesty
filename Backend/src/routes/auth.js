const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { signup, login, getMe, updateMe, deleteMe, uploadAvatar } = require('../controllers/authController');

// Public routes (no token needed)
router.post('/signup', signup);
router.post('/login', login);

// Protected routes (token required)
router.get('/me', auth, getMe);
router.put('/me', auth, updateMe);
router.delete('/me', auth, deleteMe);
router.post('/avatar', auth, upload.single('avatar'), uploadAvatar);

module.exports = router;