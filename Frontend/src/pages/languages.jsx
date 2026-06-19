import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const BASE_URL = "http://localhost:5000/api";

const getSupportedLanguages = () =>
  fetch(`${BASE_URL}/translate/languages`).then(r => r.json());

export default function LanguagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allLanguages, setAllLanguages] = useState([]);
  const [active, setActive] = useState(["en", "fr", "es", "sw", "ar", "zh"]);
  const [search, setSearch] = useState("");
  const [added, setAdded] = useState(null);
  const [removed, setRemoved] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSupportedLanguages().then(data => {
      if (data.languages) {
        const extras = {
          en: { native: "English", speakers: "1.5B", flag: "🇬🇧" },
          fr: { native: "Français", speakers: "280M", flag: "🇫🇷" },
          es: { native: "Español", speakers: "500M", flag: "🇪🇸" },
          de: { native: "Deutsch", speakers: "100M", flag: "🇩🇪" },
          zh: { native: "中文", speakers: "1.1B", flag: "🇨🇳" },
          ar: { native: "العربية", speakers: "420M", flag: "🇸🇦" },
          sw: { native: "Kiswahili", speakers: "200M", flag: "🇰🇪" },
          pt: { native: "Português", speakers: "260M", flag: "🇧🇷" },
          hi: { native: "हिन्दी", speakers: "600M", flag: "🇮🇳" },
          ru: { native: "Русский", speakers: "258M", flag: "🇷🇺" },
          ja: { native: "日本語", speakers: "125M", flag: "🇯🇵" },
          ko: { native: "한국어", speakers: "77M", flag: "🇰🇷" },
          it: { native: "Italiano", speakers: "85M", flag: "🇮🇹" },
          tr: { native: "Türkçe", speakers: "88M", flag: "🇹🇷" },
          nl: { native: "Nederlands", speakers: "24M", flag: "🇳🇱" },
          pl: { native: "Polski", speakers: "45M", flag: "🇵🇱" },
          af: { native: "Afrikaans", speakers: "7M", flag: "🇿🇦" },
          sq: { native: "Shqip", speakers: "7M", flag: "🇦🇱" },
          hy: { native: "Հայերեն", speakers: "7M", flag: "🇦🇲" },
          az: { native: "Azərbaycan", speakers: "23M", flag: "🇦🇿" },
          bn: { native: "বাংলা", speakers: "230M", flag: "🇧🇩" },
          bg: { native: "Български", speakers: "9M", flag: "🇧🇬" },
          ca: { native: "Català", speakers: "10M", flag: "🇪🇸" },
          hr: { native: "Hrvatski", speakers: "7M", flag: "🇭🇷" },
          cs: { native: "Čeština", speakers: "10M", flag: "🇨🇿" },
          da: { native: "Dansk", speakers: "6M", flag: "🇩🇰" },
          et: { native: "Eesti", speakers: "1M", flag: "🇪🇪" },
          tl: { native: "Filipino", speakers: "90M", flag: "🇵🇭" },
          fi: { native: "Suomi", speakers: "5M", flag: "🇫🇮" },
          ka: { native: "ქართული", speakers: "4M", flag: "🇬🇪" },
          el: { native: "Ελληνικά", speakers: "13M", flag: "🇬🇷" },
          gu: { native: "ગુજરાતી", speakers: "55M", flag: "🇮🇳" },
          he: { native: "עברית", speakers: "9M", flag: "🇮🇱" },
          hu: { native: "Magyar", speakers: "13M", flag: "🇭🇺" },
          is: { native: "Íslenska", speakers: "400K", flag: "🇮🇸" },
          id: { native: "Bahasa Indonesia", speakers: "270M", flag: "🇮🇩" },
          ga: { native: "Gaeilge", speakers: "2M", flag: "🇮🇪" },
          km: { native: "ភាសាខ្មែរ", speakers: "16M", flag: "🇰🇭" },
          kk: { native: "Қазақша", speakers: "13M", flag: "🇰🇿" },
          lv: { native: "Latviešu", speakers: "2M", flag: "🇱🇻" },
          lt: { native: "Lietuvių", speakers: "3M", flag: "🇱🇹" },
          mk: { native: "Македонски", speakers: "2M", flag: "🇲🇰" },
          ms: { native: "Bahasa Melayu", speakers: "290M", flag: "🇲🇾" },
          mt: { native: "Malti", speakers: "500K", flag: "🇲🇹" },
          mi: { native: "Māori", speakers: "200K", flag: "🇳🇿" },
          mn: { native: "Монгол", speakers: "5M", flag: "🇲🇳" },
          ne: { native: "नेपाली", speakers: "17M", flag: "🇳🇵" },
          no: { native: "Norsk", speakers: "5M", flag: "🇳🇴" },
          fa: { native: "فارسی", speakers: "110M", flag: "🇮🇷" },
          ro: { native: "Română", speakers: "24M", flag: "🇷🇴" },
          sr: { native: "Српски", speakers: "12M", flag: "🇷🇸" },
          sk: { native: "Slovenčina", speakers: "5M", flag: "🇸🇰" },
          sl: { native: "Slovenščina", speakers: "2M", flag: "🇸🇮" },
          so: { native: "Soomaali", speakers: "22M", flag: "🇸🇴" },
          sv: { native: "Svenska", speakers: "10M", flag: "🇸🇪" },
          ta: { native: "தமிழ்", speakers: "75M", flag: "🇮🇳" },
          te: { native: "తెలుగు", speakers: "83M", flag: "🇮🇳" },
          th: { native: "ภาษาไทย", speakers: "60M", flag: "🇹🇭" },
          uk: { native: "Українська", speakers: "40M", flag: "🇺🇦" },
          ur: { native: "اردو", speakers: "230M", flag: "🇵🇰" },
          vi: { native: "Tiếng Việt", speakers: "95M", flag: "🇻🇳" },
          cy: { native: "Cymraeg", speakers: "900K", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
          zu: { native: "isiZulu", speakers: "12M", flag: "🇿🇦" },
          xh: { native: "isiXhosa", speakers: "8M", flag: "🇿🇦" },
          yo: { native: "Yorùbá", speakers: "45M", flag: "🇳🇬" },
          ig: { native: "Igbo", speakers: "24M", flag: "🇳🇬" },
          ha: { native: "Hausa", speakers: "63M", flag: "🇳🇬" },
          my: { native: "မြန်မာ", speakers: "33M", flag: "🇲🇲" },
          ml: { native: "മലയാളം", speakers: "38M", flag: "🇮🇳" },
          kn: { native: "ಕನ್ನಡ", speakers: "44M", flag: "🇮🇳" },
          mr: { native: "मराठी", speakers: "83M", flag: "🇮🇳" },
          pa: { native: "ਪੰਜਾਬੀ", speakers: "113M", flag: "🇮🇳" },
          si: { native: "සිංහල", speakers: "17M", flag: "🇱🇰" },
          uz: { native: "O'zbek", speakers: "35M", flag: "🇺🇿" },
        };

        const enriched = data.languages.map(l => ({
          code: l.code,
          name: l.name,
          flag: extras[l.code]?.flag || "🌍",
          native: extras[l.code]?.native || l.name,
          speakers: extras[l.code]?.speakers || "—",
        }));

        setAllLanguages(enriched);
      }
      setLoading(false);
    });
  }, []);

  const filtered = allLanguages.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.native.toLowerCase().includes(search.toLowerCase())
  );

  const availableLanguages = filtered.filter(l => !active.includes(l.code));
  const activeFiltered = filtered.filter(l => active.includes(l.code));

  const addLanguage = (code) => {
    setActive([...active, code]);
    setAdded(code);
    setTimeout(() => setAdded(null), 2000);
  };

  const removeLanguage = (code) => {
    setActive(active.filter(c => c !== code));
    setRemoved(code);
    setTimeout(() => setRemoved(null), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>

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

      <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>

        {/* Header */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 28px", borderBottom: "1px solid var(--border)",
          background: "var(--bg-secondary)", position: "sticky", top: 0, zIndex: 10,
        }}>
          <button onClick={() => setSidebarOpen(true)} style={{
            background: "none", border: "none",
            color: "var(--text-secondary)", cursor: "pointer", padding: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>
            Languages
          </h1>
          <span style={{
            background: "rgba(37,99,235,0.15)", color: "var(--accent)",
            borderRadius: "20px", padding: "4px 14px", fontSize: "13px", fontWeight: "600",
            border: "1px solid rgba(37,99,235,0.3)",
          }}>
            {active.length} active
          </span>
        </header>

        <main style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: "400px" }}>
            <span style={{
              position: "absolute", left: "14px", top: "50%",
              transform: "translateY(-50%)", color: "var(--text-muted)",
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search languages..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "11px 14px 11px 40px",
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)", color: "var(--text-primary)",
                fontSize: "14px", outline: "none",
              }}
            />
          </div>

          {loading ? (
            <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "40px" }}>
              Loading languages...
            </p>
          ) : (
            <>
              {/* Active Languages */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: "600", color: "var(--text-primary)" }}>
                    Your Active Languages
                  </h2>
                  <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
                  {activeFiltered.map(lang => (
                    <div key={lang.code} style={{
                      background: "var(--bg-card)", border: "1px solid var(--accent)",
                      borderRadius: "var(--radius)", padding: "16px",
                      display: "flex", flexDirection: "column", gap: "10px",
                      transition: "all 0.2s",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "28px" }}>{lang.flag}</span>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{lang.name}</p>
                          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{lang.native}</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                          {lang.speakers} speakers
                        </span>
                        <span style={{
                          fontSize: "10px", color: "var(--accent)",
                          background: "rgba(37,99,235,0.1)", padding: "2px 8px",
                          borderRadius: "10px", fontWeight: "600",
                        }}>
                          ACTIVE
                        </span>
                      </div>
                      <button
                        onClick={() => removeLanguage(lang.code)}
                        style={{
                          width: "100%", padding: "7px",
                          background: "transparent", border: "1px solid var(--border)",
                          borderRadius: "var(--radius-sm)", color: "var(--text-muted)",
                          fontSize: "12px", cursor: "pointer", transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#ef4444"; e.currentTarget.style.color = "#ef4444"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {activeFiltered.length === 0 && (
                  <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No active languages match your search.</p>
                )}
              </div>

              {/* Available Languages */}
              {availableLanguages.length > 0 && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: "600", color: "var(--text-primary)" }}>
                      Add More Languages
                    </h2>
                    <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
                    {availableLanguages.map(lang => (
                      <div key={lang.code} style={{
                        background: "var(--bg-card)", border: "1px solid var(--border)",
                        borderRadius: "var(--radius)", padding: "16px",
                        display: "flex", flexDirection: "column", gap: "10px",
                        transition: "all 0.2s",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontSize: "28px" }}>{lang.flag}</span>
                          <div>
                            <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{lang.name}</p>
                            <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{lang.native}</p>
                          </div>
                        </div>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                          {lang.speakers} speakers
                        </span>
                        <button
                          onClick={() => addLanguage(lang.code)}
                          style={{
                            width: "100%", padding: "7px",
                            background: added === lang.code ? "#22c55e" : "var(--accent)",
                            border: "none", borderRadius: "var(--radius-sm)",
                            color: "white", fontSize: "12px", cursor: "pointer",
                            transition: "all 0.2s", fontWeight: "500",
                          }}
                        >
                          {added === lang.code ? "✓ Added!" : "+ Add Language"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats banner */}
              <div style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", padding: "20px",
                display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "center",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    background: "rgba(37,99,235,0.1)", display: "flex",
                    alignItems: "center", justifyContent: "center", color: "var(--accent)",
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", color: "var(--text-primary)" }}>
                      {allLanguages.length}
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Total Supported Languages</p>
                  </div>
                </div>

                <div style={{ width: "1px", height: "40px", background: "var(--border)" }} />

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    background: "rgba(34,197,94,0.1)", display: "flex",
                    alignItems: "center", justifyContent: "center", color: "#22c55e",
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", color: "var(--text-primary)" }}>
                      {active.length}
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Your Active Languages</p>
                  </div>
                </div>

                <div style={{ width: "1px", height: "40px", background: "var(--border)" }} />

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    background: "rgba(245,158,11,0.1)", display: "flex",
                    alignItems: "center", justifyContent: "center", color: "#f59e0b",
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", color: "var(--text-primary)" }}>
                      4B+
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>People You Can Reach</p>
                  </div>
                </div>
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
}