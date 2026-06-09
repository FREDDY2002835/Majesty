import { useState } from "react";
import Sidebar from "../components/Sidebar";


const allLanguages = [
  { code: "en", name: "English", flag: "🇬🇧", native: "English", speakers: "1.5B" },
  { code: "fr", name: "French", flag: "🇫🇷", native: "Français", speakers: "280M" },
  { code: "es", name: "Spanish", flag: "🇪🇸", native: "Español", speakers: "500M" },
  { code: "de", name: "German", flag: "🇩🇪", native: "Deutsch", speakers: "100M" },
  { code: "zh", name: "Chinese", flag: "🇨🇳", native: "中文", speakers: "1.1B" },
  { code: "ar", name: "Arabic", flag: "🇸🇦", native: "العربية", speakers: "420M" },
  { code: "sw", name: "Swahili", flag: "🇰🇪", native: "Kiswahili", speakers: "200M" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷", native: "Português", speakers: "260M" },
  { code: "hi", name: "Hindi", flag: "🇮🇳", native: "हिन्दी", speakers: "600M" },
  { code: "ru", name: "Russian", flag: "🇷🇺", native: "Русский", speakers: "258M" },
  { code: "ja", name: "Japanese", flag: "🇯🇵", native: "日本語", speakers: "125M" },
  { code: "ko", name: "Korean", flag: "🇰🇷", native: "한국어", speakers: "77M" },
  { code: "it", name: "Italian", flag: "🇮🇹", native: "Italiano", speakers: "85M" },
  { code: "tr", name: "Turkish", flag: "🇹🇷", native: "Türkçe", speakers: "88M" },
  { code: "nl", name: "Dutch", flag: "🇳🇱", native: "Nederlands", speakers: "24M" },
  { code: "pl", name: "Polish", flag: "🇵🇱", native: "Polski", speakers: "45M" },
];

export default function LanguagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState(["en", "fr", "es", "sw", "ar", "zh"]);
  const [search, setSearch] = useState("");
  const [added, setAdded] = useState(null);
  const [removed, setRemoved] = useState(null);

  const filtered = allLanguages.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.native.toLowerCase().includes(search.toLowerCase())
  );

  const activeLanguages = allLanguages.filter(l => active.includes(l.code));
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
                <div
                  key={lang.code}
                  style={{
                    background: "var(--bg-card)", border: "1px solid var(--accent)",
                    borderRadius: "var(--radius)", padding: "16px",
                    display: "flex", flexDirection: "column", gap: "10px",
                    position: "relative", transition: "all 0.2s",
                  }}
                >
                  {/* Flag + name */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "28px" }}>{lang.flag}</span>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{lang.name}</p>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{lang.native}</p>
                    </div>
                  </div>

                  {/* Speakers */}
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

                  {/* Remove button */}
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
                  <div
                    key={lang.code}
                    style={{
                      background: "var(--bg-card)", border: "1px solid var(--border)",
                      borderRadius: "var(--radius)", padding: "16px",
                      display: "flex", flexDirection: "column", gap: "10px",
                      transition: "all 0.2s",
                    }}
                  >
                    {/* Flag + name */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "28px" }}>{lang.flag}</span>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{lang.name}</p>
                        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{lang.native}</p>
                      </div>
                    </div>

                    {/* Speakers */}
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                      {lang.speakers} speakers
                    </span>

                    {/* Add button */}
                    <button
                      onClick={() => addLanguage(lang.code)}
                      style={{
                        width: "100%", padding: "7px",
                        background: added === lang.code ? "var(--success)" : "var(--accent)",
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

        </main>
      </div>
    </div>
  );
}