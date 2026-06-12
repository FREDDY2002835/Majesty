const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');
const {
  translateText,
  detectLanguage,
  getSupportedLanguages,
  getHistory,
  getHistoryById,
  deleteHistoryItem,
  clearHistory
} = require('../controllers/translationController');

// Public routes (guests can translate too)
router.post('/', optionalAuth, translateText);
router.post('/detect', detectLanguage);
router.get('/languages', getSupportedLanguages);

// Protected routes (must be logged in)
router.get('/history', auth, getHistory);
router.get('/history/:id', auth, getHistoryById);
router.delete('/history', auth, clearHistory);
router.delete('/history/:id', auth, deleteHistoryItem);

module.exports = router;