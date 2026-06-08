import { useState } from "react";
import Sidebar from "../components/Sidebar";

const savedData = [
  { id: 1, original: "How much is this?", translated: "Combien ça coûte?", from: "English", to: "French", date: "Today", time: "10:45 AM", collection: "Shopping" },
  { id: 2, original: "Where is the nearest hotel?", translated: "Où est l'hôtel le plus proche?", from: "English", to: "French", date: "Today", time: "10:30 AM", collection: "Travel" },
  { id: 3, original: "I need a doctor", translated: "J'ai besoin d'un médecin", from: "English", to: "French", date: "Today", time: "8:45 AM", collection: "Medical" },
  { id: 4, original: "Where is the airport?", translated: "Où est l'aéroport?", from: "English", to: "French", date: "Yesterday", time: "3:00 PM", collection: "Travel" },
  { id: 5, original: "Nice to meet you", translated: "Ravi de vous rencontrer", from: "English", to: "French", date: "Yesterday", time: "9:30 AM", collection: "General" },
  { id: 6, original: "Can you help me?", translated: "Pouvez-vous m'aider?", from: "English", to: "French", date: "This Week", time: "5:15 PM", collection: "General" },
  { id: 7, original: "I would like to order food", translated: "Je voudrais commander à manger", from: "English", to: "French", date: "This Week", time: "1:00 PM", collection: "Shopping" },
  { id: 8, original: "Call an ambulance!", translated: "Appelez une ambulance!", from: "English", to: "French", date: "This Week", time: "11:00 AM", collection: "Medical" },
];

const collections = ["All", "Travel", "Medical", "Shopping", "General"];

const collectionColors = {
  Travel: { bg: "rgba(37,99,235,0.1)", color: "var(--accent)" },
  Medical: { bg: "rgba(239,68,68,0.1)", color: "#ef4444" },
  Shopping: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
  General: { bg: "rgba(34,197,94,0.1)", color: "#22c55e" },
};

export default function SavedPage() {
  const [search, setSearch] = useState("");
  const [activeCollection, setActiveCollection] = useState("All");
  const [removed, setRemoved] = useState([]);
  const [playing, setPlaying] = useState(null);
  const [view, setView] = useState("list"); // list or grid

  const data = savedData.filter(item => !removed.includes(item.id));

  const filtered = data.filter(item => {
    const matchSearch =
      item.original.toLowerCase().includes(search.toLowerCase()) ||
      item.translated.toLowerCase().includes(search.toLowerCase());
    const matchCollection = activeCollection === "All" || item.collection === activeCollection;
    return matchSearch && matchCollection;
  });

  const handlePlay = (id) => {
    setPlaying(id);
    setTimeout(() => setPlaying(null), 2000);
  };

  const handleRemove = (id) => {
    setRemoved([...removed, id]);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>

        {/* Header */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 28px", borderBottom: "1px solid var(--border)",
          background: "var(--bg-secondary)", position: "sticky", top: 0, zIndex: 10,
        }}>
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
              ⭐ {data.length} saved
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

          {/* Collection filters */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {collections.map(c => (
              <button
                key={c}
                onClick={() => setActiveCollection(c)}
                style={{
                  padding: "8px 16px", borderRadius: "20px",
                  background: activeCollection === c ? "var(--accent)" : "var(--bg-card)",
                  border: `1px solid ${activeCollection === c ? "var(--accent)" : "var(--border)"}`,
                  color: activeCollection === c ? "white" : "var(--text-secondary)",
                  fontSize: "13px", cursor: "pointer",
                  fontWeight: activeCollection === c ? "600" : "400",
                  transition: "all 0.2s",
                }}
              >
                {c}
                <span style={{
                  marginLeft: "6px", fontSize: "11px",
                  opacity: 0.8,
                }}>
                  {c === "All" ? data.length : data.filter(d => d.collection === c).length}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          {filtered.length > 0 ? (
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
                          {item.original}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{
                            fontSize: "11px", color: "var(--text-muted)",
                            background: "var(--bg-secondary)", padding: "2px 8px", borderRadius: "10px",
                          }}>
                            {item.from}
                          </span>
                          <span style={{
                            fontSize: "11px", padding: "2px 8px", borderRadius: "10px",
                            background: collectionColors[item.collection]?.bg,
                            color: collectionColors[item.collection]?.color,
                          }}>
                            {item.collection}
                          </span>
                        </div>
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
                          {item.translated}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{
                            fontSize: "11px", color: "var(--accent)",
                            background: "rgba(37,99,235,0.1)", padding: "2px 8px", borderRadius: "10px",
                          }}>
                            {item.to}
                          </span>
                          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                            {item.date} · {item.time}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button
                          onClick={() => handlePlay(item.id)}
                          title="Play translation"
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

                        <button
                          onClick={() => handleRemove(item.id)}
                          title="Remove from saved"
                          style={{
                            background: "none", border: "none", cursor: "pointer",
                            padding: "6px", color: "var(--text-muted)",
                            transition: "color 0.2s", borderRadius: "var(--radius-sm)",
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                          onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6"/><path d="M14 11v6"/>
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
                    {/* Collection badge */}
                    <span style={{
                      alignSelf: "flex-start", fontSize: "11px", padding: "3px 10px",
                      borderRadius: "10px", fontWeight: "600",
                      background: collectionColors[item.collection]?.bg,
                      color: collectionColors[item.collection]?.color,
                    }}>
                      {item.collection}
                    </span>

                    {/* Original */}
                    <div>
                      <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>Original ({item.from})</p>
                      <p style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: "500" }}>{item.original}</p>
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
                      <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>Translation ({item.to})</p>
                      <p style={{ fontSize: "14px", color: "var(--accent)", fontWeight: "500" }}>{item.translated}</p>
                    </div>

                    {/* Footer */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                        {item.date} · {item.time}
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
                            cursor: "pointer", color: "var(--text-muted)",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = "#ef4444"; e.currentTarget.style.color = "#ef4444"; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
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
                Star any translation from the dashboard or history to save it here.
              </p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}