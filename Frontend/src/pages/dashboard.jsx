import { useState } from "react";
import Sidebar from "../components/Sidebar";
import WaveForm from "../components/WaveForm";


const languages = [
  { code: "fr", label: "French (Français)", flag: "🇫🇷" },
  { code: "es", label: "Spanish (Español)", flag: "🇪🇸" },
  { code: "de", label: "German (Deutsch)", flag: "🇩🇪" },
  { code: "zh", label: "Chinese (中文)", flag: "🇨🇳" },
  { code: "ar", label: "Arabic (العربية)", flag: "🇸🇦" },
  { code: "pt", label: "Portuguese (Português)", flag: "🇧🇷" },
];

const history = [
  { original: "How much is this?", translated: "Combien ça coûte?", from: "English", to: "French", time: "10:45 AM" },
  { original: "Where is the nearest hotel?", translated: "Où est l'hôtel le plus proche?", from: "English", to: "French", time: "10:30 AM" },
  { original: "Thank you very much!", translated: "Merci beaucoup!", from: "English", to: "French", time: "10:15 AM" },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [timer, setTimer] = useState(5);
  const [starred, setStarred] = useState({});

  const toggleListening = () => {
    setListening(!listening);
    if (!listening) {
      let t = 0;
      const interval = setInterval(() => {
        t++;
        setTimer(t);
      }, 1000);
      setTimeout(() => clearInterval(interval), 30000);
    } else {
      setTimer(5);
    }
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

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

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "auto" }}>

        {/* Top navbar */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 28px", borderBottom: "1px solid var(--border)",
          background: "var(--bg-secondary)", position: "sticky", top: 0, zIndex: 10,
        }}>
          <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", color: "var(--text-secondary)", padding: 0, cursor: "pointer" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          {/* Center logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%",
              background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" fill="white"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
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
                justifyContent: "center", fontSize: "13px", fontWeight: "600",
              }}>F</div>
              <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>Frederick</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
        </header>

        {/* Page body */}
        <main style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Welcome + language selector */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "700", marginBottom: "4px", color: "var(--accent)" }}>
                Welcome ! 👋
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
                  minWidth: "200px", overflow: "hidden", boxShadow: "var(--shadow)",
                }}>
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setSelectedLang(lang); setShowLangDropdown(false); }}
                      style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        width: "100%", padding: "10px 14px", background: "none",
                        border: "none", color: lang.code === selectedLang.code ? "white" : "var(--text-secondary)",
                        background: lang.code === selectedLang.code ? "var(--accent)" : "transparent",
                        fontSize: "14px", cursor: "pointer", textAlign: "left",
                        transition: "background 0.15s",
                      }}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
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
                  Detected: <span style={{ color: "var(--success)" }}>English</span>
                </span>
              </div>
              <p style={{ color: "var(--text-primary)", fontSize: "16px", marginBottom: "20px", minHeight: "48px" }}>
                Hello, how are you today?
              </p>
              <WaveForm active={listening} />
            </div>

            {/* Swap button */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "var(--bg-card)", borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)", padding: "0 4px",
            }}>
              <button style={{
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
              <p style={{ color: "var(--text-primary)", fontSize: "16px", marginBottom: "20px", minHeight: "48px" }}>
                Bonjour, comment allez-vous aujourd'hui?
              </p>
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
                onClick={toggleListening}
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
                {listening ? "Listening..." : "Start Speaking"}
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
                  onClick={toggleListening}
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

              <button style={{
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
              <button style={{
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
              <button style={{
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
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", padding: "20px",
          }}>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "16px",
              fontWeight: "600", marginBottom: "16px", color: "var(--accent)",
            }}>
              Recent History
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {history.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr auto",
                    alignItems: "center",
                    gap: "16px",
                    padding: "14px 12px",
                    borderRadius: "var(--radius-sm)",
                    transition: "background 0.15s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <span style={{ fontSize: "14px", color: "var(--text-primary)" }}>{item.original}</span>
                  <div>
                    <p style={{ fontSize: "14px", color: "var(--text-primary)", marginBottom: "2px" }}>{item.translated}</p>
                    <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>{item.from} → {item.to}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{item.time}</span>
                    <button
                      onClick={() => setStarred(s => ({ ...s, [i]: !s[i] }))}
                      style={{ background: "none", border: "none", color: starred[i] ? "#facc15" : "var(--text-muted)", cursor: "pointer", padding: 0 }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill={starred[i] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    </button>
                    <button style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* View all */}
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "10px 20px", background: "var(--bg-secondary)",
                border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                color: "var(--text-secondary)", fontSize: "13px", cursor: "pointer",
                transition: "all 0.2s",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
                View All History
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}