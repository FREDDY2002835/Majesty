import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const profileItems = [
{
    label: "Profile", to: "/dashboard/profile",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    label: "Saved",to: "/dashboard/saved",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  
  {
    label: "Settings", to: "/dashboard/settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside style={{
      width: "220px",
      minHeight: "100vh",
      background: "var(--bg-secondary)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      padding: "24px 0",
      flexShrink: 0,
    }}>
        

      {/* Nav items */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px", padding: "0 12px" }}>
        {navItems.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 12px", borderRadius: "var(--radius-sm)",
                color: active ? "white" : "var(--text-secondary)",
                background: active ? "var(--accent)" : "transparent",
                fontFamily: "var(--font-body)",
                fontSize: "14px", fontWeight: active ? "500" : "400",
                transition: "all 0.2s",
                boxShadow: active ? "var(--shadow-accent)" : "none",
                textDecoration: "none",
              }}
             onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--accent)"; }}}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "0 12px", marginTop: "12px" }}>
        <Link
          to="/login"
          style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "10px 12px", borderRadius: "var(--radius-sm)",
            color: "var(--text-secondary)", fontSize: "14px",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </Link>
      </div>
    </aside>
  );
}