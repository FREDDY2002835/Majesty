import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import WaveForm from "../components/WaveForm";
import { translate, getHistory, detectLanguage, deleteHistoryItem, getSupportedLanguages } from "../api";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";





const languages = [
  { code: "af", label: "Afrikaans", flag: "🇿🇦" },
  { code: "sq", label: "Albanian", flag: "🇦🇱" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "hy", label: "Armenian", flag: "🇦🇲" },
  { code: "az", label: "Azerbaijani", flag: "🇦🇿" },
  { code: "eu", label: "Basque", flag: "🇪🇸" },
  { code: "be", label: "Belarusian", flag: "🇧🇾" },
  { code: "bn", label: "Bengali", flag: "🇧🇩" },
  { code: "bs", label: "Bosnian", flag: "🇧🇦" },
  { code: "bg", label: "Bulgarian", flag: "🇧🇬" },
  { code: "ca", label: "Catalan", flag: "🇪🇸" },
  { code: "zh", label: "Chinese", flag: "🇨🇳" },
  { code: "hr", label: "Croatian", flag: "🇭🇷" },
  { code: "cs", label: "Czech", flag: "🇨🇿" },
  { code: "da", label: "Danish", flag: "🇩🇰" },
  { code: "nl", label: "Dutch", flag: "🇳🇱" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "eo", label: "Esperanto", flag: "🌍" },
  { code: "et", label: "Estonian", flag: "🇪🇪" },
  { code: "tl", label: "Filipino", flag: "🇵🇭" },
  { code: "fi", label: "Finnish", flag: "🇫🇮" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "gl", label: "Galician", flag: "🇪🇸" },
  { code: "ka", label: "Georgian", flag: "🇬🇪" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "el", label: "Greek", flag: "🇬🇷" },
  { code: "gu", label: "Gujarati", flag: "🇮🇳" },
  { code: "ht", label: "Haitian Creole", flag: "🇭🇹" },
  { code: "ha", label: "Hausa", flag: "🇳🇬" },
  { code: "he", label: "Hebrew", flag: "🇮🇱" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "hu", label: "Hungarian", flag: "🇭🇺" },
  { code: "is", label: "Icelandic", flag: "🇮🇸" },
  { code: "ig", label: "Igbo", flag: "🇳🇬" },
  { code: "id", label: "Indonesian", flag: "🇮🇩" },
  { code: "ga", label: "Irish", flag: "🇮🇪" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "jw", label: "Javanese", flag: "🇮🇩" },
  { code: "kn", label: "Kannada", flag: "🇮🇳" },
  { code: "kk", label: "Kazakh", flag: "🇰🇿" },
  { code: "km", label: "Khmer", flag: "🇰🇭" },
  { code: "ko", label: "Korean", flag: "🇰🇷" },
  { code: "ku", label: "Kurdish", flag: "🌍" },
  { code: "ky", label: "Kyrgyz", flag: "🇰🇬" },
  { code: "lo", label: "Lao", flag: "🇱🇦" },
  { code: "la", label: "Latin", flag: "🌍" },
  { code: "lv", label: "Latvian", flag: "🇱🇻" },
  { code: "lt", label: "Lithuanian", flag: "🇱🇹" },
  { code: "lb", label: "Luxembourgish", flag: "🇱🇺" },
  { code: "mk", label: "Macedonian", flag: "🇲🇰" },
  { code: "mg", label: "Malagasy", flag: "🇲🇬" },
  { code: "ms", label: "Malay", flag: "🇲🇾" },
  { code: "ml", label: "Malayalam", flag: "🇮🇳" },
  { code: "mt", label: "Maltese", flag: "🇲🇹" },
  { code: "mi", label: "Maori", flag: "🇳🇿" },
  { code: "mr", label: "Marathi", flag: "🇮🇳" },
  { code: "mn", label: "Mongolian", flag: "🇲🇳" },
  { code: "my", label: "Myanmar (Burmese)", flag: "🇲🇲" },
  { code: "ne", label: "Nepali", flag: "🇳🇵" },
  { code: "no", label: "Norwegian", flag: "🇳🇴" },
  { code: "ny", label: "Nyanja (Chichewa)", flag: "🇲🇼" },
  { code: "ps", label: "Pashto", flag: "🇦🇫" },
  { code: "fa", label: "Persian", flag: "🇮🇷" },
  { code: "pl", label: "Polish", flag: "🇵🇱" },
  { code: "pt", label: "Portuguese", flag: "🇧🇷" },
  { code: "pa", label: "Punjabi", flag: "🇮🇳" },
  { code: "ro", label: "Romanian", flag: "🇷🇴" },
  { code: "ru", label: "Russian", flag: "🇷🇺" },
  { code: "sm", label: "Samoan", flag: "🇼🇸" },
  { code: "gd", label: "Scottish Gaelic", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { code: "sr", label: "Serbian", flag: "🇷🇸" },
  { code: "st", label: "Sesotho", flag: "🇱🇸" },
  { code: "sn", label: "Shona", flag: "🇿🇼" },
  { code: "sd", label: "Sindhi", flag: "🇵🇰" },
  { code: "si", label: "Sinhala", flag: "🇱🇰" },
  { code: "sk", label: "Slovak", flag: "🇸🇰" },
  { code: "sl", label: "Slovenian", flag: "🇸🇮" },
  { code: "so", label: "Somali", flag: "🇸🇴" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "su", label: "Sundanese", flag: "🇮🇩" },
  { code: "sw", label: "Swahili", flag: "🇰🇪" },
  { code: "sv", label: "Swedish", flag: "🇸🇪" },
  { code: "tg", label: "Tajik", flag: "🇹🇯" },
  { code: "ta", label: "Tamil", flag: "🇮🇳" },
  { code: "te", label: "Telugu", flag: "🇮🇳" },
  { code: "th", label: "Thai", flag: "🇹🇭" },
  { code: "tr", label: "Turkish", flag: "🇹🇷" },
  { code: "uk", label: "Ukrainian", flag: "🇺🇦" },
  { code: "ur", label: "Urdu", flag: "🇵🇰" },
  { code: "uz", label: "Uzbek", flag: "🇺🇿" },
  { code: "vi", label: "Vietnamese", flag: "🇻🇳" },
  { code: "cy", label: "Welsh", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
  { code: "xh", label: "Xhosa", flag: "🇿🇦" },
  { code: "yi", label: "Yiddish", flag: "🌍" },
  { code: "yo", label: "Yoruba", flag: "🇳🇬" },
  { code: "zu", label: "Zulu", flag: "🇿🇦" },
];


export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const [starred, setStarred] = useState({});
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [detectedLang, setDetectedLang] = useState("");
  const [sourceLang, setSourceLang] = useState({ code: "en", label: "English", flag: "🇬🇧" });
  const [langSearch, setLangSearch] = useState("");
  const [recentHistory, setRecentHistory] = useState([]);
  const [saveLabel, setSaveLabel] = useState("Save");
  const navigate = useNavigate();

  useEffect(() => {
  getHistory().then(data => {
    if (data.translations) {
      setRecentHistory(data.translations.slice(0, 3));
    }
  });
}, []);
  
 useEffect(() => {
  if (!inputText.trim()) {
    setDetectedLang("");
    return;
  }

  const timer = setTimeout(async () => {
    const data = await detectLanguage(inputText);
    console.log("Detection response:", data);
    if (data.detected_language) {
      setDetectedLang(data.detected_language);
      setSourceLang({ code: data.code, label: data.detected_language, flag: "" });
    }
  }, 600);

  return () => clearTimeout(timer);
}, [inputText]);


  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;


  const handleTranslate = async () => {
  if (!inputText.trim()) return;
   console.log("Detected lang:", detectedLang); 
  console.log("Source lang code:", sourceLang.code); 
  console.log("Target lang:", selectedLang.code);
  setIsTranslating(true);
  setTranslationError("");

  // Use detected language if available, otherwise use dropdown selection
  const sourceLangCode = detectedLang === "Swahili" ? "sw"
    : detectedLang === "French" ? "fr"
    : detectedLang === "Spanish" ? "es"
    : detectedLang === "German" ? "de"
    : detectedLang === "Portuguese" ? "pt"
    : detectedLang === "Italian" ? "it"
    : detectedLang === "Arabic" ? "ar"
    : detectedLang === "Chinese" ? "zh"
    : sourceLang.code; // fallback to dropdown

  const data = await translate(inputText, sourceLangCode, selectedLang.code);
  console.log("Final sourceLangCode:", sourceLangCode);
  
  console.log("Sending to API:", { text: inputText, source: sourceLangCode, target: selectedLang.code });

    console.log("API response:", data);

  setIsTranslating(false);

  if (data.translated_text) {
    setTranslatedText(data.translated_text);
    setDetectedLang(detectedLang);
  } else {
    setTranslationError("Translation failed. Please try again.");
  }
};

const startListening = () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("Your browser doesn't support speech recognition. Try Chrome.");
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;        // ← reste actif
  recognition.interimResults = true;    // ← texte en direct
  recognition.lang = sourceLang.code || 'en';

  recognition.onstart = () => {
    setListening(true);
    setTimer(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = 0; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    setInputText(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setListening(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  recognition.onend = () => {
    setListening(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  try {
    recognition.start();
    window.currentRecognition = recognition;
  } catch (err) {
    console.error("Failed to start:", err);
  }
};


const stopListening = () => {
  if (window.currentRecognition) {
    window.currentRecognition.stop();
    window.currentRecognition = null;
  }
  if (timerRef.current) clearInterval(timerRef.current);
  setListening(false);
};

const playTranslation = () => {
  if (!translatedText) {
    alert("No translation to play yet.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(translatedText);
  utterance.lang = selectedLang.code;
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
};
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>

       {/* Global hover styles for dashboard buttons */}
    <style>{`
      .dash-btn:hover {
        opacity: 0.85;
        transform: translateY(-1px);
        transition: all 0.2s;
      }
      .dash-btn-accent:hover {
        filter: brightness(1.1);
        transform: translateY(-1px);
        transition: all 0.2s;
      }
      .dash-btn-danger:hover {
        background: #ef4444 !important;
        color: white !important;
        transform: translateY(-1px);
        transition: all 0.2s;
      }
      .dash-btn-ghost:hover {
        background: var(--bg-secondary) !important;
        border-color: var(--accent) !important;
        color: var(--accent) !important;
        transition: all 0.2s;
      }
        filter: invert(27%) sepia(96%) saturate(1234%) hue-rotate(210deg) brightness(95%) contrast(97%);
    `}</style>

        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)", zIndex: 20,
          }} />
        )}

        <div style={{
          position: "fixed", top: 0, left: 0,
          height: "100vh", zIndex: 30,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
    </div>

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "auto" }}>

        {/* Top navbar */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 28px", borderBottom: "1px solid var(--border)",
          background: "var(--bg-secondary)", position: "sticky", top: 0, zIndex: 10,
        }}>
          <button onClick={() => setSidebarOpen(true)} className="dash-btn-ghost" style={{ background: "none", border: "none", color: "var(--text-secondary)", padding: 0, cursor: "pointer" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          {/* Center logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <img 
  src={logo} 
  alt="Logo" 
  style={{ 
    width: "70px", 
    height: "auto",
    filter: "var(--logo-filter)",
    transition: "filter 0.3s ease",
  }} 
/>
                          
                        </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "700", color: "var(--accent)" }}>Majesty</span>
          </div>

          {/* Right: bell + user */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button style={{ background: "none", border: "none", color: "var(--text-secondary)", padding: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: "var(--accent)", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "13px", fontWeight: "600", color: "white",
                  overflow: "hidden",
                }}>
                  {user.avatar ? (
                    <img
                      src={`http://localhost:5000${user.avatar}`}
                      alt="avatar"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    user.name?.charAt(0).toUpperCase()
                  )}
                </div>
              <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>{user.name}</span>
              
            </div>
          </div>
        </header>

        {/* Page body */}
        <main style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Welcome + language selector */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "700", marginBottom: "4px", color: "var(--accent)" }}>
                Welcome, {user.name}! 👋
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                Speak, translate and connect with the world.
              </p>
            </div>

            {/* Language dropdown */}
            <div style={{ position: "relative" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)", padding: "6px 12px",
                marginBottom: "6px", fontSize: "12px", color: "var(--text-secondary)",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                Target Language
              </div>
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)", padding: "10px 14px",
                  color: "var(--text-primary)", fontSize: "14px", fontWeight: "500",
                  width: "200px", justifyContent: "space-between", cursor: "pointer",
                }}
              >
                <span>{selectedLang.flag} {selectedLang.label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {showLangDropdown && (
                <div style={{
                  position: "absolute", top: "calc(100% + 4px)", right: 0,
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)", zIndex: 20,
                  width: "220px", boxShadow: "var(--shadow)",
                }}>
                  {/* Search bar */}
                  <div style={{ padding: "8px", borderBottom: "1px solid var(--border)" }}>
                    <input
                      type="text"
                      placeholder="Search language..."
                      value={langSearch}
                      onChange={e => setLangSearch(e.target.value)}
                      style={{
                        width: "100%", padding: "8px 10px",
                        background: "var(--bg-secondary)", border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)", color: "var(--text-primary)",
                        fontSize: "13px", outline: "none",
                      }}
                    />
                  </div>

                  {/* Scrollable list */}
                  <div style={{ maxHeight: "240px", overflowY: "auto" }}>
                    {languages
                      .filter(l => l.label.toLowerCase().includes(langSearch.toLowerCase()))
                      .map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => { setSelectedLang(lang); setShowLangDropdown(false); setLangSearch(""); }}
                          style={{
                            display: "flex", alignItems: "center", gap: "10px",
                            width: "100%", padding: "10px 14px", background: "none",
                            border: "none",
                            color: lang.code === selectedLang.code ? "white" : "var(--text-secondary)",
                            backgroundColor: lang.code === selectedLang.code ? "var(--accent)" : "transparent",
                            fontSize: "13px", cursor: "pointer", textAlign: "left",
                          }}
                        >
                          {lang.flag} {lang.label}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Translation panels */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0", alignItems: "stretch" }}>

            {/* Original speech */}
            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "var(--radius) 0 0 var(--radius)", padding: "20px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
                <span style={{ color: "var(--accent)", fontWeight: "600", fontSize: "14px" }}>Original Speech</span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Detected: <span style={{ color: "var(--accent)" }}>{detectedLang}</span>
                </span>
              </div>
              <textarea
                placeholder="Type something to translate..."
                value={inputText}
                onChange={e => {
                  if (e.target.value.length <= 500) {
                    setInputText(e.target.value);
                  }
                }}
                style={{
                  width: "100%", minHeight: "80px",
                  background: "transparent", border: "none",
                  color: "var(--text-primary)", fontSize: "16px",
                  resize: "none", outline: "none",
                  marginBottom: "20px", fontFamily: "inherit",
                }}
              />
              <p style={{ 
              fontSize: "11px", 
              color: inputText.length > 450 ? "#ef4444" : "var(--text-muted)",
              textAlign: "right",
              marginTop: "4px"
            }}>
              {inputText.length}/500
            </p>
              <WaveForm active={listening} />
            </div>

            {/* Swap button */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "var(--bg-card)", borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)", padding: "0 4px",
            }}>
              <button 
              
              style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "var(--accent)", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", cursor: "pointer", boxShadow: "var(--shadow-accent)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "rotate(180deg)"}
              onMouseLeave={e => e.currentTarget.style.transform = "rotate(0deg)"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="17 1 21 5 17 9"/>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                  <polyline points="7 23 3 19 7 15"/>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                </svg>
              </button>
            </div>

            {/* Translation */}
            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "0 var(--radius) var(--radius) 0", padding: "20px",
            }}>
              <div style={{ marginBottom: "14px" }}>
                <span style={{ color: "var(--accent)", fontWeight: "600", fontSize: "14px" }}>Translation</span>
              </div>
              <p style={{ color: "var(--text-primary)", fontSize: "16px", marginBottom: "20px", minHeight: "80px" }}>
              {isTranslating ? "Translating..." : translatedText || "Translation will appear here..."}
            </p>
            {translationError && (
              <p style={{ color: "#ef4444", fontSize: "13px" }}>{translationError}</p>
            )}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "13px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
                Click play to listen
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>

            {/* Left: start/stop */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={handleTranslate} className="dash-btn-ghost"
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "10px 18px", background: "var(--bg-card)",
                  border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                  color: "var(--text-primary)", fontSize: "14px", cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                </svg>
                 {isTranslating ? "Translating..." : "Translate"}
              </button>

              {/* Big mic button */}
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {listening && (
                  <span style={{
                    position: "absolute", width: "70px", height: "70px",
                    borderRadius: "50%", background: "var(--accent-glow)",
                    animation: "pulse-ring 1.2s ease-out infinite",
                  }} />
                )}
                <button
                   onClick={listening ? stopListening : startListening} className="dash-btn-ghost"
                  style={{
                    width: "60px", height: "60px", borderRadius: "50%",
                    background: listening ? "var(--accent)" : "var(--bg-card)",
                    border: listening ? "none" : "1px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: listening ? "white" : "var(--text-secondary)",
                    cursor: "pointer", boxShadow: listening ? "var(--shadow-accent)" : "none",
                    transition: "all 0.3s", position: "relative", zIndex: 1,
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <button 
              onClick={stopListening} className="dash-btn-ghost"
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 18px", background: "var(--bg-card)",
                border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)", fontSize: "14px", cursor: "pointer",
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                </svg>
                Stop
              </button>
            </div>

            {/* Right: play + save */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {listening && (
                <div style={{ textAlign: "center", marginRight: "8px" }}>
                  <p style={{ color: "var(--accent)", fontSize: "13px", fontWeight: "500" }}>Listening...</p>
                  <p style={{ color: "var(--text-primary)", fontSize: "15px", fontWeight: "600" }}>{formatTime(timer)}</p>
                </div>
              )}
              <button
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setIsPlaying(false);
                }} className="dash-btn-ghost"
                 style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 18px", background: "var(--bg-card)",
                border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)", fontSize: "14px", cursor: "pointer",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                </svg>
                Stop
              </button>

              <button
              onClick={playTranslation} className="dash-btn-ghost"
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "11px 20px", background: "var(--accent)",
                border: "none", borderRadius: "var(--radius-sm)",
                color: "white", fontSize: "14px", fontWeight: "500",
                cursor: "pointer", boxShadow: "var(--shadow-accent)",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Play Translation
              </button>
              <button 
                onClick={() => {
                  if (!translatedText) return;
                  // Find the latest history item and star it
                  getHistory().then(data => {
                    if (data.translations && data.translations.length > 0) {
                      const latest = data.translations[0];
                      const current = JSON.parse(localStorage.getItem("starred_translations") || "{}");
                      const updated = { ...current, [latest.id]: true };
                      localStorage.setItem("starred_translations", JSON.stringify(updated));
                      setSaveLabel("✓ Saved!");
                      setTimeout(() => setSaveLabel("Save"), 2000);
                    }
                  });
                }}  className="dash-btn-ghost"
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "11px 20px", background: "var(--bg-card)",
                border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)", fontSize: "14px", cursor: "pointer",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                Save
              </button>
            </div>
          </div>

         {/* Recent History */}
              <div style={{
                background: "var(--bg-card)",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                padding: "20px",
                marginTop: "20px"
              }}>

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ color: "var(--accent)", fontWeight: "600", fontSize: "15px" }}>
                    Recent History
                  </span>
                  {/* this is the history button */}
                  <button
                    onClick={() => navigate("/dashboard/history")} className="dash-btn-ghost"
                    style={{
                      background: "none", border: "1px solid var(--border)",
                      borderRadius: "var(--radius-sm)", padding: "6px 14px",
                      color: "var(--text-secondary)", fontSize: "12px",
                      cursor: "pointer"
                    }}
                  >
                    View All History
                  </button>
                </div>

                {/* History items */}
                {recentHistory.length === 0 ? (
                  <p style={{ color: "var(--text-muted)", fontSize: "13px", textAlign: "center", padding: "20px" }}>
                    No translations yet. Start translating!
                  </p>
                ) : (
                  recentHistory.map((item, i) => (
                    <div key={item.id} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "14px 0",
                      borderBottom: i < recentHistory.length - 1 ? "1px solid var(--border)" : "none"
                    }}>

                      {/* Original text */}
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "14px", color: "var(--text-primary)", marginBottom: "2px" }}>
                          {item.original_text}
                        </p>
                        <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                          {item.source_language} → {item.target_language}
                        </p>
                      </div>

                      {/* Translated text */}
                      <div style={{ flex: 1, textAlign: "center" }}>
                        <p style={{ fontSize: "14px", color: "var(--text-primary)" }}>
                          {item.translated_text}
                        </p>
                      </div>

                      {/* Date + time + delete */}
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)", textAlign: "right" }}>
                          {new Date(item.created_at).toLocaleDateString([], { month: "short", day: "numeric" })}
                          {" "}
                          {new Date(item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <button
                          onClick={async () => {
                            await deleteHistoryItem(item.id);
                            setRecentHistory(prev => prev.filter(h => h.id !== item.id));
                          }}
                          style={{
                            background: "none", border: "none", cursor: "pointer",
                            color: "#ef4444", fontSize: "16px", padding: "4px",
                            lineHeight: 1
                          }}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>

                    </div>
                  ))
                )}

              </div>

        </main>
      </div>
    </div>
  );
} 