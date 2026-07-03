<div align="center">
  <img src="assets/fred-logo.png" alt="Majesty Logo" width="150"/>

🎤 **MAJESTY** — AI-Powered Speech Translation Platform

> Speak. Translate. Connect with the world.

**Majesty** is a real-time speech translation platform that eliminates language barriers. 
It listens to spoken language, automatically detects the speaker's language, translates it into the user's preferred language, 
and delivers the translated audio instantly — all powered by AI.


**Screenshots**
<img width="1348" height="639" alt="Screenshot 2026-06-08 151053" src="https://github.com/user-attachments/assets/41a9d1ba-36e9-4fec-a0e7-e066dd29334a" />
<img width="1317" height="488" alt="Screenshot 2026-06-19 151240" src="https://github.com/user-attachments/assets/acda74dd-a53a-47cd-b7a6-0a657773fd57" />
<img width="1359" height="635" alt="Screenshot 2026-06-10 120801" src="https://github.com/user-attachments/assets/c7509ee7-fb45-4b8b-9dd9-608586580025" />


## ✨ Features

- 🎙️ **Real-Time Speech Recognition** — Captures spoken words through the microphone and converts them to text instantly
- 🌍 **Automatic Language Detection** — Identifies the language being spoken without manual selection (supports 87+ languages)
- 🔄 **Real-Time Translation** — Translates recognized speech immediately using AI-powered translation
- 🔊 **Text-to-Speech Output** — Converts translated text into natural-sounding audio
- 📋 **Translation History** — Saves, searches, filters and manages all past translations
- ⭐ **Saved Translations** — Bookmark important translations for quick access
- 👤 **User Authentication** — Secure signup, login and account management with JWT
- 🖼️ **Profile Picture Upload** — Personalize your account with a profile image
- 🎨 **Appearance Customization** — Choose from 5 accent colors and Light/Dark/System themes
- 📱 **Responsive UI** — Smooth, intuitive interface that works across devices
- 🌐 **87+ Languages Supported** — Including English, French, Swahili, Chinese, Arabic, Lingala, Zulu and many more



## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React (Vite) | UI framework |
| React Router | Client-side routing |
| Web Speech API | Microphone input & text-to-speech |
| CSS Variables | Theming and appearance |
| localStorage | Persistent user preferences |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| PostgreSQL | Relational database |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| Multer | Profile image uploads |
| Winston | Error logging |
| Nodemailer | Welcome emails |
| MyMemory API | Translation & language detection |


## 📁 Project Structure

```
Majesty/
├── frontend/                  # React (Vite) application
│   ├── src/
│   │   ├── assets/            # Logo and static assets
│   │   ├── components/        # Reusable components (Sidebar, WaveForm, etc.)
│   │   ├── hooks/             # Custom hooks (useTheme, useThemeColor)
│   │   ├── pages/             # All page components
│   │   │   ├── dashboard.jsx  # Main translation interface
│   │   │   ├── history.jsx    # Translation history
│   │   │   ├── saved.jsx      # Bookmarked translations
│   │   │   ├── profile.jsx    # User profile
│   │   │   ├── settings.jsx   # App settings
│   │   │   ├── languages.jsx  # Language management
│   │   │   ├── help.jsx       # Help & FAQ
│   │   │   ├── login.jsx      # Login page
│   │   │   ├── register.jsx   # Registration page
│   │   │   └── forgotPassword.jsx
│   │   ├── api.js             # All API calls in one place
│   │   └── App.jsx            # Routes
│   └── package.json
│
└── backend/                   # Node.js + Express API
    ├── src/
    │   ├── config/
    │   │   ├── database.js    # PostgreSQL connection
    │   │   └── schema.sql     # Database tables
    │   ├── controllers/
    │   │   ├── authController.js        # Auth logic
    │   │   ├── translationController.js # Translation logic
    │   │   └── contactController.js     # Contact form
    │   ├── middleware/
    │   │   ├── auth.js          # JWT protection
    │   │   ├── optionalAuth.js  # Optional JWT
    │   │   ├── upload.js        # File upload (Multer)
    │   │   ├── errorHandler.js  # Global error handling
    │   │   └── validate.js      # Input validation
    │   ├── routes/
    │   │   ├── auth.js          # /api/auth/*
    │   │   ├── translate.js     # /api/translate/*
    │   │   └── contact.js       # /api/contact
    │   ├── utils/
    │   │   ├── errors.js        # Custom error classes
    │   │   └── logger.js        # Winston logger
    │   └── index.js             # App entry point
    ├── uploads/                 # Profile images
    ├── logs/                    # Error & access logs
    └── package.json
```


## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL
- Git

### 1. Clone the repository
```bash
git clone https://github.com/FREDDY2002835/Majesty
cd majesty
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/majesty_db
JWT_SECRET=your_super_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=your_gmail@gmail.com
```

Create the database and tables:
```bash
psql -U postgres -c "CREATE DATABASE majesty_db;"
psql -U postgres -d majesty_db -f src/config/schema.sql
```

Start the backend:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### 3. Set up the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | No | Create account |
| POST | `/api/auth/login` | No | Login, receive JWT |
| GET | `/api/auth/me` | ✅ | Get current user |
| PUT | `/api/auth/me` | ✅ | Update profile |
| DELETE | `/api/auth/me` | ✅ | Delete account |
| POST | `/api/auth/avatar` | ✅ | Upload profile picture |

### Translation
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/translate` | Optional | Translate text |
| POST | `/api/translate/detect` | No | Detect language |
| GET | `/api/translate/languages` | No | Get supported languages |
| GET | `/api/translate/history` | ✅ | Get translation history |
| DELETE | `/api/translate/history/:id` | ✅ | Delete one translation |
| DELETE | `/api/translate/history` | ✅ | Clear all history |

### Contact
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/contact` | Optional | Send support message |

---

## 🌍 Supported Languages (87+)

Afrikaans, Albanian, Arabic, Armenian, Azerbaijani, Basque, Bengali, Bosnian, 
Bulgarian, Catalan, Chinese, Croatian, Czech, Danish, Dutch, English, Estonian,
Filipino, Finnish, French, Galician, Georgian, German, Greek, Gujarati, Hausa, Hebrew, 
Hindi, Hungarian, Icelandic, Igbo, Indonesian, Irish, Italian, Japanese, Kannada, Kazakh, 
Khmer, Korean, Kyrgyz, Lao, Latvian, **Lingala**, Lithuanian, Macedonian, Malagasy, Malay, 
Malayalam, Maltese, Maori, Marathi, Mongolian, Myanmar, Nepali, Norwegian, Persian, Polish, 
Portuguese, Punjabi, Romanian, Russian, Samoan, Serbian, Sesotho, Shona, Sinhala, Slovak, 
Slovenian, Somali, Spanish, Swahili, Swedish, Tajik, Tamil, Telugu, Thai, Turkish, Ukrainian, 
Urdu, Uzbek, Vietnamese, Welsh, Xhosa, Yiddish, Yoruba, **Zulu** and more.

---

## 🔐 Security Features

- Passwords hashed with **bcryptjs** (12 salt rounds)
- Authentication via **JWT tokens** (7-day expiry)
- Input validation on all routes using **express-validator**
- Protected routes block unauthorized access
- Custom error classes with appropriate HTTP status codes
- Winston logging for error tracking

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Frederick Muhimuzi**
- GitHub: https://github.com/FREDDY2002835
- Email: aganzemuhimuzi8@gmail.com
Built as a final project for CodeBlossom 🌸
---


## 🙏 Acknowledgements

- inspired by ***Marion** founder of codeblossom🌸, thanks for all 
- mentorship of ***Alice*** who always check for my progress and reviewed my assignments
- [MyMemory Translation API](https://mymemory.translated.net/) — Free translation service
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) — Browser speech recognition
- [Express.js](https://expressjs.com/) — Backend framework
- [React](https://reactjs.org/) — Frontend framework

---

<div align="center">
  Made with ❤️ by Frederick Muhimuzi for the codeblossom Community
  <br/>
  <strong>Majesty — Breaking language barriers, one translation at a time.</strong>
</div>
