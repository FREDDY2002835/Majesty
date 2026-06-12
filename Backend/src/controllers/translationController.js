const axios = require('axios');
const pool = require('../config/database');

// POST /api/translate
const translateText = async (req, res) => {
  const { text, source_language = 'auto', target_language } = req.body;

  if (!text || !target_language) {
    return res.status(400).json({
      message: 'text and target_language are required.'
    });
  }

  try {
    // MyMemory API — free, no key needed
    const langPair = source_language === 'auto'
      ? `|${target_language}`
      : `${source_language}|${target_language}`;

    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: langPair
      }
    });

    const translatedText = response.data.responseData.translatedText;
    const detectedLanguage = source_language === 'auto' ? 'auto' : source_language;

    // If user is logged in, save to their history automatically
    if (req.user) {
      await pool.query(
        `INSERT INTO translations 
           (user_id, original_text, translated_text, source_language, target_language)
         VALUES ($1, $2, $3, $4, $5)`,
        [req.user.id, text, translatedText, detectedLanguage, target_language]
      );
    }

    res.json({
      original_text: text,
      translated_text: translatedText,
      source_language: detectedLanguage,
      target_language
    });

  } catch (err) {
    console.error('Translation error:', err.response?.data || err.message);
    res.status(502).json({
      message: 'Translation failed.',
      detail: err.response?.data || err.message
    });
  }
};

// POST /api/translate/detect
const detectLanguage = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'text is required.' });
  }

  try {
    // Detect by translating to English and checking the response
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: '|en'
      }
    });

    const detected = response.data.responseData.detectedLanguage || 'unknown';
    res.json({ detected_language: detected });

  } catch (err) {
    console.error('Detect error:', err.message);
    res.status(502).json({ message: 'Language detection failed.' });
  }
};

// GET /api/translate/languages
const getSupportedLanguages = async (req, res) => {
  res.json({
    languages: [
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'French' },
      { code: 'es', name: 'Spanish' },
      { code: 'de', name: 'German' },
      { code: 'zh', name: 'Chinese' },
      { code: 'ar', name: 'Arabic' },
      { code: 'sw', name: 'Swahili' },
      { code: 'pt', name: 'Portuguese' },
      { code: 'ru', name: 'Russian' },
      { code: 'ja', name: 'Japanese' },
      { code: 'it', name: 'Italian' },
      { code: 'hi', name: 'Hindi' },
      { code: 'ko', name: 'Korean' },
    ]
  });
};


// GET /api/translate/history
const getHistory = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  try {
    const [rows, count] = await Promise.all([
      pool.query(
        `SELECT * FROM translations
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT $2 OFFSET $3`,
        [req.user.id, limit, offset]
      ),
      pool.query(
        'SELECT COUNT(*) FROM translations WHERE user_id = $1',
        [req.user.id]
      )
    ]);

    res.json({
      translations: rows.rows,
      pagination: {
        total: parseInt(count.rows[0].count),
        page,
        limit,
        pages: Math.ceil(count.rows[0].count / limit)
      }
    });

  } catch (err) {
    console.error('getHistory error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// GET /api/translate/history/:id
const getHistoryById = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM translations WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ message: 'Translation not found.' });
    }

    res.json({ translation: result.rows[0] });

  } catch (err) {
    console.error('getHistoryById error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// DELETE /api/translate/history/:id
const deleteHistoryItem = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM translations WHERE id = $1 AND user_id = $2 RETURNING id',
      [req.params.id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Translation not found.' });
    }

    res.json({ message: 'Translation deleted.' });

  } catch (err) {
    console.error('deleteHistoryItem error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// DELETE /api/translate/history (clear all)
const clearHistory = async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM translations WHERE user_id = $1',
      [req.user.id]
    );

    res.json({ message: 'Translation history cleared.' });

  } catch (err) {
    console.error('clearHistory error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { 
    translateText, 
    detectLanguage, 
    getSupportedLanguages, 
    getHistory,
    getHistoryById,
    deleteHistoryItem,
    clearHistory
};