import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getHistory, deleteHistoryItem } from "../api";

const collections = ["All", "Travel", "Medical", "Shopping", "General"];

const collectionColors = {
  Travel: { bg: "rgba(37,99,235,0.1)", color: "var(--accent)" },
  Medical: { bg: "rgba(239,68,68,0.1)", color: "#ef4444" },
  Shopping: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
  General: { bg: "rgba(34,197,94,0.1)", color: "#22c55e" },
};

export default function SavedPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCollection, setActiveCollection] = useState("All");
  const [playing, setPlaying] = useState(null);
  const [view, setView] = useState("list");
  const [historyData, setHistoryData] = useState([]);
  const [starred, setStarred] = useState(() => {
    const stored = localStorage.getItem("starred_translations");
    return stored ? JSON.parse(stored) : {};
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory().then(data => {
      if (data.translations) {
        setHistoryData(data.translations);
      }
      setLoading(false);
    });
  }, []);

  const toggleStar = (id) => {
    const updated = { ...starred, [id]: !starred[id] };
    setStarred(updated);
    localStorage.setItem("starred_translations", JSON.stringify(updated));
  };

  // Only show starred items
  const savedItems = historyData.filter(item => starred[item.id]);

  const filtered = savedItems.filter(item => {
    const matchSearch =
      item.original_text?.toLowerCase().includes(search.toLowerCase()) ||
      item.translated_text?.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const handlePlay = (id) => {
    setPlaying(id);
    setTimeout(() => setPlaying(null), 2000);
  };

  const handleRemove = (id) => {
    toggleStar(id);
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
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>
              Saved Translations
            </h1>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              Your bookmarked translations
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{
              background: "rgba(250,204,21,0.15)", color: "#facc15",
              borderRadius: "20px", padding: "4px 14px",
              fontSize: "13px", fontWeight: "600",
              border: "1px solid rgba(250,204,21,0.3)",
            }}>
              ⭐ {savedItems.length} saved
            </span>

            {/* View toggle */}
            <div style={{
              display: "flex", background: "var(--bg-card)",
              border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
              overflow: "hidden",
            }}>
              {["list", "grid"].map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    padding: "8px 12px", background: view === v ? "var(--accent)" : "transparent",
                    border: "none", cursor: "pointer",
                    color: view === v ? "white" : "var(--text-muted)",
                    transition: "all 0.2s",
                  }}
                >
                  {v === "list" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>

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
              placeholder="Search saved translations..."
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

          {/* Content */}
          {loading ? (
            <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "40px" }}>
              Loading saved translations...
            </p>
          ) : filtered.length > 0 ? (
            view === "list" ? (
              /* List view */
              <div style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", overflow: "hidden",
              }}>
                {filtered.map((item, i) => (
                  <div
                    key={item.id}
                    style={{
                      padding: "18px 20px",
                      borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto", alignItems: "center", gap: "16px" }}>

                      {/* Original */}
                      <div>
                        <p style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: "500", marginBottom: "6px" }}>
                          {item.original_text}
                        </p>
                        <span style={{
                          fontSize: "11px", color: "var(--text-muted)",
                          background: "var(--bg-secondary)", padding: "2px 8px", borderRadius: "10px",
                        }}>
                          {item.source_language}
                        </span>
                      </div>

                      {/* Arrow */}
                      <div style={{ color: "var(--text-muted)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12"/>
                          <polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </div>

                      {/* Translated */}
                      <div>
                        <p style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: "500", marginBottom: "6px" }}>
                          {item.translated_text}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{
                            fontSize: "11px", color: "var(--accent)",
                            background: "rgba(37,99,235,0.1)", padding: "2px 8px", borderRadius: "10px",
                          }}>
                            {item.target_language}
                          </span>
                          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                            {new Date(item.created_at).toLocaleDateString([], { month: "short", day: "numeric" })}
                            {" · "}
                            {new Date(item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button
                          onClick={() => handlePlay(item.id)}
                          style={{
                            background: playing === item.id ? "var(--accent)" : "var(--bg-secondary)",
                            border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                            padding: "6px 10px", cursor: "pointer",
                            color: playing === item.id ? "white" : "var(--text-muted)",
                            transition: "all 0.2s", display: "flex", alignItems: "center", gap: "4px",
                            fontSize: "12px",
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                          </svg>
                          {playing === item.id ? "Playing..." : "Play"}
                        </button>

                        {/* Unstar button */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          title="Remove from saved"
                          style={{
                            background: "none", border: "none", cursor: "pointer",
                            padding: "6px", color: "#facc15",
                            transition: "color 0.2s", borderRadius: "var(--radius-sm)",
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                          onMouseLeave={e => e.currentTarget.style.color = "#facc15"}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Grid view */
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
                {filtered.map(item => (
                  <div
                    key={item.id}
                    style={{
                      background: "var(--bg-card)", border: "1px solid var(--border)",
                      borderRadius: "var(--radius)", padding: "18px",
                      display: "flex", flexDirection: "column", gap: "12px",
                      transition: "border-color 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    {/* Language badge */}
                    <span style={{
                      alignSelf: "flex-start", fontSize: "11px", padding: "3px 10px",
                      borderRadius: "10px", fontWeight: "600",
                      background: "rgba(37,99,235,0.1)", color: "var(--accent)",
                    }}>
                      {item.source_language} → {item.target_language}
                    </span>

                    {/* Original */}
                    <div>
                      <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>Original</p>
                      <p style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: "500" }}>{item.original_text}</p>
                    </div>

                    {/* Arrow */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                      <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                    </div>

                    {/* Translated */}
                    <div>
                      <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>Translation</p>
                      <p style={{ fontSize: "14px", color: "var(--accent)", fontWeight: "500" }}>{item.translated_text}</p>
                    </div>

                    {/* Footer */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                        {new Date(item.created_at).toLocaleDateString([], { month: "short", day: "numeric" })}
                        {" · "}
                        {new Date(item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => handlePlay(item.id)}
                          style={{
                            background: playing === item.id ? "var(--accent)" : "var(--bg-secondary)",
                            border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                            padding: "5px 8px", cursor: "pointer",
                            color: playing === item.id ? "white" : "var(--text-muted)",
                            transition: "all 0.2s",
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleRemove(item.id)}
                          style={{
                            background: "none", border: "1px solid var(--border)",
                            borderRadius: "var(--radius-sm)", padding: "5px 8px",
                            cursor: "pointer", color: "#facc15",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = "#ef4444"; e.currentTarget.style.color = "#ef4444"; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "#facc15"; }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Empty state */
            <div style={{
              textAlign: "center", padding: "80px 20px",
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>⭐</div>
              <p style={{ color: "var(--text-primary)", fontSize: "16px", fontWeight: "600", marginBottom: "6px" }}>
                No saved translations yet
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "20px" }}>
                Click the ⭐ star on any translation in your History to save it here.
              </p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}