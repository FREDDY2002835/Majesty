const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { signup, login, getMe, updateMe, deleteMe, uploadAvatar } = require('../controllers/authController');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

// Public routes (no token needed)
router.post('/signup',
  [
    body('email').isEmail().withMessage('Please provide a valid email address.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
    body('name').notEmpty().withMessage('Name is required.'),
  ],
  validate,
  signup
);
router.post('/login', login);

// Protected routes (token required)
router.get('/me', auth, getMe);
router.put('/me', auth, updateMe);
router.delete('/me', auth, deleteMe);
router.post('/avatar', auth, upload.single('avatar'), uploadAvatar);

module.exports = router;