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

const detectLanguage = async (req, res) => {
  
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'text is required.' });
  }

  try {
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: 'autodetect|en'
      }
    });

    console.log('MyMemory detect response:', JSON.stringify(response.data, null, 2));

   const detectedCode = response.data.responseData?.detectedLanguage || 'en';

// Normalize all region-specific codes to base language codes
const codeMap = {
  'zh-CN': 'zh', 'zh-TW': 'zh', 'zh-HK': 'zh',
  'pt-BR': 'pt', 'pt-PT': 'pt',
  'en-US': 'en', 'en-GB': 'en', 'en-AU': 'en',
  'es-ES': 'es', 'es-MX': 'es', 'es-419': 'es',
  'fr-FR': 'fr', 'fr-CA': 'fr', 'fr-BE': 'fr',
  'de-DE': 'de', 'de-AT': 'de', 'de-CH': 'de',
  'it-IT': 'it', 'it-CH': 'it',
  'nl-NL': 'nl', 'nl-BE': 'nl',
  'ar-SA': 'ar', 'ar-EG': 'ar', 'ar-MA': 'ar',
  'sw-KE': 'sw', 'sw-TZ': 'sw',
  'sr-Cyrl': 'sr', 'sr-Latn': 'sr',
  'uz-Cyrl': 'uz', 'uz-Latn': 'uz',
  'mn-Cyrl': 'mn', 'mn-Mong': 'mn',
  'hy-AM': 'hy', 'ka-GE': 'ka',
  'nb-NO': 'no', 'nn-NO': 'no',
  'fil': 'tl',
};

const normalizedCode = codeMap[detectedCode] || detectedCode.split('-')[0];

const languageNames = {
  'en': 'English', 'fr': 'French', 'es': 'Spanish',
  'de': 'German', 'it': 'Italian', 'pt': 'Portuguese',
  'ru': 'Russian', 'zh': 'Chinese', 'ja': 'Japanese',
  'ko': 'Korean', 'ar': 'Arabic', 'hi': 'Hindi',
  'sw': 'Swahili', 'zu': 'Zulu', 'af': 'Afrikaans',
  'nl': 'Dutch', 'pl': 'Polish', 'tr': 'Turkish',
  'uk': 'Ukrainian', 'vi': 'Vietnamese', 'th': 'Thai',
  'id': 'Indonesian', 'ms': 'Malay', 'fa': 'Persian',
  'he': 'Hebrew', 'bn': 'Bengali', 'ta': 'Tamil',
  'te': 'Telugu', 'mr': 'Marathi', 'ur': 'Urdu',
  'pa': 'Punjabi', 'gu': 'Gujarati', 'kn': 'Kannada',
  'ml': 'Malayalam', 'si': 'Sinhala', 'ne': 'Nepali',
  'my': 'Myanmar', 'km': 'Khmer', 'lo': 'Lao',
  'ka': 'Georgian', 'am': 'Amharic', 'so': 'Somali',
  'ha': 'Hausa', 'yo': 'Yoruba', 'ig': 'Igbo',
  'mg': 'Malagasy', 'ny': 'Nyanja', 'sn': 'Shona',
  'st': 'Sesotho', 'xh': 'Xhosa', 'tl': 'Filipino',
  'no': 'Norwegian', 'sv': 'Swedish', 'da': 'Danish',
  'fi': 'Finnish', 'hu': 'Hungarian', 'cs': 'Czech',
  'sk': 'Slovak', 'ro': 'Romanian', 'bg': 'Bulgarian',
  'hr': 'Croatian', 'sr': 'Serbian', 'sl': 'Slovenian',
  'et': 'Estonian', 'lv': 'Latvian', 'lt': 'Lithuanian',
  'el': 'Greek', 'sq': 'Albanian', 'mk': 'Macedonian',
  'hy': 'Armenian', 'az': 'Azerbaijani', 'kk': 'Kazakh',
  'uz': 'Uzbek', 'tk': 'Turkmen', 'mn': 'Mongolian',
  'mt': 'Maltese', 'ga': 'Irish', 'cy': 'Welsh',
  'eu': 'Basque', 'ca': 'Catalan', 'gl': 'Galician',
  'lb': 'Luxembourgish', 'is': 'Icelandic',
};

const detectedName = languageNames[normalizedCode] || 'English';

res.json({
  detected_language: detectedName,
  code: normalizedCode
});
  } catch (err) {
    console.error('Detect error:', err.message);
    res.json({ detected_language: 'English', code: 'en' });
  }
};
// GET /api/translate/languages
const getSupportedLanguages = async (req, res) => {
  res.json({
    languages: [
      { code: "af", name: "Afrikaans" }, { code: "sq", name: "Albanian" },
      { code: "ar", name: "Arabic" }, { code: "hy", name: "Armenian" },
      { code: "az", name: "Azerbaijani" }, { code: "eu", name: "Basque" },
      { code: "bn", name: "Bengali" }, { code: "bs", name: "Bosnian" },
      { code: "bg", name: "Bulgarian" }, { code: "ca", name: "Catalan" },
      { code: "zh", name: "Chinese" }, { code: "hr", name: "Croatian" },
      { code: "cs", name: "Czech" }, { code: "da", name: "Danish" },
      { code: "nl", name: "Dutch" }, { code: "en", name: "English" },
      { code: "et", name: "Estonian" }, { code: "tl", name: "Filipino" },
      { code: "fi", name: "Finnish" }, { code: "fr", name: "French" },
      { code: "gl", name: "Galician" }, { code: "ka", name: "Georgian" },
      { code: "de", name: "German" }, { code: "el", name: "Greek" },
      { code: "gu", name: "Gujarati" }, { code: "ha", name: "Hausa" },
      { code: "he", name: "Hebrew" }, { code: "hi", name: "Hindi" },
      { code: "hu", name: "Hungarian" }, { code: "is", name: "Icelandic" },
      { code: "ig", name: "Igbo" }, { code: "id", name: "Indonesian" },
      { code: "ga", name: "Irish" }, { code: "it", name: "Italian" },
      { code: "ja", name: "Japanese" }, { code: "kn", name: "Kannada" },
      { code: "kk", name: "Kazakh" }, { code: "km", name: "Khmer" },
      { code: "ko", name: "Korean" }, { code: "ky", name: "Kyrgyz" },
      { code: "lo", name: "Lao" }, { code: "lv", name: "Latvian" },
      { code: "lt", name: "Lithuanian" }, { code: "mk", name: "Macedonian" },
      { code: "mg", name: "Malagasy" }, { code: "ms", name: "Malay" },
      { code: "ml", name: "Malayalam" }, { code: "mt", name: "Maltese" },
      { code: "mi", name: "Maori" }, { code: "mr", name: "Marathi" },
      { code: "mn", name: "Mongolian" }, { code: "my", name: "Myanmar" },
      { code: "ne", name: "Nepali" }, { code: "no", name: "Norwegian" },
      { code: "fa", name: "Persian" }, { code: "pl", name: "Polish" },
      { code: "pt", name: "Portuguese" }, { code: "pa", name: "Punjabi" },
      { code: "ro", name: "Romanian" }, { code: "ru", name: "Russian" },
      { code: "sm", name: "Samoan" }, { code: "sr", name: "Serbian" },
      { code: "st", name: "Sesotho" }, { code: "sn", name: "Shona" },
      { code: "si", name: "Sinhala" }, { code: "sk", name: "Slovak" },
      { code: "sl", name: "Slovenian" }, { code: "so", name: "Somali" },
      { code: "es", name: "Spanish" }, { code: "sw", name: "Swahili" },
      { code: "sv", name: "Swedish" }, { code: "tg", name: "Tajik" },
      { code: "ta", name: "Tamil" }, { code: "te", name: "Telugu" },
      { code: "th", name: "Thai" }, { code: "tr", name: "Turkish" },
      { code: "uk", name: "Ukrainian" }, { code: "ur", name: "Urdu" },
      { code: "uz", name: "Uzbek" }, { code: "vi", name: "Vietnamese" },
      { code: "cy", name: "Welsh" }, { code: "xh", name: "Xhosa" },
      { code: "yi", name: "Yiddish" }, { code: "yo", name: "Yoruba" },
      { code: "zu", name: "Zulu" },
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