import { useState } from "react";
import Sidebar from "../components/Sidebar";


const historyData = [
  { id: 1, original: "How much is this?", translated: "Combien ça coûte?", from: "English", to: "French", time: "10:45 AM", date: "Today" },
  { id: 2, original: "Where is the nearest hotel?", translated: "Où est l'hôtel le plus proche?", from: "English", to: "French", time: "10:30 AM", date: "Today" },
  { id: 3, original: "Thank you very much!", translated: "Merci beaucoup!", from: "English", to: "French", time: "10:15 AM", date: "Today" },
  { id: 4, original: "Good morning everyone", translated: "Bonjour tout le monde", from: "English", to: "French", time: "9:00 AM", date: "Today" },
  { id: 5, original: "I need a doctor", translated: "J'ai besoin d'un médecin", from: "English", to: "French", time: "8:45 AM", date: "Today" },
  { id: 6, original: "What time is it?", translated: "Quelle heure est-il?", from: "English", to: "French", time: "7:30 PM", date: "Yesterday" },
  { id: 7, original: "Can you help me?", translated: "Pouvez-vous m'aider?", from: "English", to: "French", time: "5:15 PM", date: "Yesterday" },
  { id: 8, original: "Where is the airport?", translated: "Où est l'aéroport?", from: "English", to: "French", time: "3:00 PM", date: "Yesterday" },
  { id: 9, original: "I would like to order food", translated: "Je voudrais commander à manger", from: "English", to: "French", time: "1:00 PM", date: "Yesterday" },
  { id: 10, original: "How are you doing?", translated: "Comment allez-vous?", from: "English", to: "French", time: "10:00 AM", date: "This Week" },
  { id: 11, original: "Nice to meet you", translated: "Ravi de vous rencontrer", from: "English", to: "French", time: "9:30 AM", date: "This Week" },
  { id: 12, original: "See you tomorrow", translated: "À demain", from: "English", to: "French", time: "8:00 AM", date: "This Week" },
];

export default function HistoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [starred, setStarred] = useState({});
  const [deleted, setDeleted] = useState([]);
  const [playing, setPlaying] = useState(null);

  const data = historyData.filter(item => !deleted.includes(item.id));

  const filtered = data.filter(item => {
    const matchSearch =
      item.original.toLowerCase().includes(search.toLowerCase()) ||
      item.translated.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || item.date === filter;
    return matchSearch && matchFilter;
  });

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  const handlePlay = (id) => {
    setPlaying(id);
    setTimeout(() => setPlaying(null), 2000);
  };

  const handleDelete = (id) => {
    setDeleted([...deleted, id]);
  };

  const handleStar = (id) => {
    setStarred(s => ({ ...s, [id]: !s[id] }));
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
              Translation History
            </h1>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              All your past translations in one place
            </p>
          </div>
          <span style={{
            background: "rgba(37,99,235,0.15)", color: "var(--accent)",
            borderRadius: "20px", padding: "4px 14px",
            fontSize: "13px", fontWeight: "600",
            border: "1px solid rgba(37,99,235,0.3)",
          }}>
            {data.length} translations
          </span>
        </header>

        <main style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Search + filters */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>

            {/* Search */}
            <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
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
                placeholder="Search your translations..."
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

            {/* Filter buttons */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["All", "Today", "Yesterday", "This Week"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "10px 16px",
                    background: filter === f ? "var(--accent)" : "var(--bg-card)",
                    border: `1px solid ${filter === f ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "var(--radius-sm)",
                    color: filter === f ? "white" : "var(--text-secondary)",
                    fontSize: "13px", cursor: "pointer",
                    fontWeight: filter === f ? "600" : "400",
                    transition: "all 0.2s",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { label: "Today", value: historyData.filter(h => h.date === "Today").length, color: "var(--accent)" },
              { label: "Yesterday", value: historyData.filter(h => h.date === "Yesterday").length, color: "#22c55e" },
              { label: "This Week", value: historyData.filter(h => h.date === "This Week").length, color: "#f59e0b" },
              { label: "Starred", value: Object.values(starred).filter(Boolean).length, color: "#facc15" },
            ].map((stat, i) => (
              <div key={i} style={{
                flex: 1, minWidth: "100px",
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)", padding: "14px 16px",
                display: "flex", alignItems: "center", gap: "12px",
              }}>
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: stat.color, flexShrink: 0,
                }} />
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "700", color: "var(--text-primary)" }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Grouped history */}
          {Object.keys(grouped).length > 0 ? (
            Object.keys(grouped).map(date => (
              <div key={date}>

                {/* Date divider */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <span style={{
                    fontSize: "11px", color: "var(--text-muted)",
                    fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px",
                    whiteSpace: "nowrap",
                  }}>
                    {date}
                  </span>
                  <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                    {grouped[date].length} items
                  </span>
                </div>

                {/* Items */}
                <div style={{
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius)", overflow: "hidden",
                }}>
                  {grouped[date].map((item, i) => (
                    <div
                      key={item.id}
                      style={{
                        padding: "16px 20px",
                        borderBottom: i < grouped[date].length - 1 ? "1px solid var(--border)" : "none",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto", alignItems: "center", gap: "16px" }}>

                        {/* Original */}
                        <div>
                          <p style={{ fontSize: "14px", color: "var(--text-primary)", marginBottom: "4px", fontWeight: "500" }}>
                            {item.original}
                          </p>
                          <span style={{
                            fontSize: "11px", color: "var(--text-muted)",
                            background: "var(--bg-secondary)", padding: "2px 8px",
                            borderRadius: "10px",
                          }}>
                            {item.from}
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
                          <p style={{ fontSize: "14px", color: "var(--text-primary)", marginBottom: "4px", fontWeight: "500" }}>
                            {item.translated}
                          </p>
                          <span style={{
                            fontSize: "11px", color: "var(--accent)",
                            background: "rgba(37,99,235,0.1)", padding: "2px 8px",
                            borderRadius: "10px",
                          }}>
                            {item.to}
                          </span>
                        </div>

                        {/* Actions */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontSize: "11px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                            {item.time}
                          </span>

                          {/* Play */}
                          <button
                            onClick={() => handlePlay(item.id)}
                            title="Play translation"
                            style={{
                              background: playing === item.id ? "var(--accent)" : "none",
                              border: "none", cursor: "pointer", padding: "4px",
                              color: playing === item.id ? "white" : "var(--text-muted)",
                              borderRadius: "4px", transition: "all 0.2s",
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="currentColor" strokeWidth="2"/>
                              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </button>

                          {/* Star */}
                          <button
                            onClick={() => handleStar(item.id)}
                            title="Save translation"
                            style={{
                              background: "none", border: "none", cursor: "pointer", padding: "4px",
                              color: starred[item.id] ? "#facc15" : "var(--text-muted)",
                              transition: "color 0.2s",
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill={starred[item.id] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            title="Delete"
                            style={{
                              background: "none", border: "none", cursor: "pointer", padding: "4px",
                              color: "var(--text-muted)", transition: "color 0.2s",
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
              </div>
            ))
          ) : (
            /* Empty state */
            <div style={{
              textAlign: "center", padding: "80px 20px",
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" style={{ marginBottom: "16px" }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p style={{ color: "var(--text-primary)", fontSize: "16px", fontWeight: "600", marginBottom: "6px" }}>
                No translations found
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                Try a different search or filter
              </p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}