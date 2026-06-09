import { useState } from "react";
import Sidebar from "../components/Sidebar";


export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Frederick Muhimuzi",
    email: "frederick@example.com",
    joined: "June 2026",
    language: "French",
    translations: 128,
    saved: 34,
  });
  const [form, setForm] = useState({ ...profile });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setProfile({ ...form });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCancel = () => {
    setForm({ ...profile });
    setEditing(false);
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
            My Profile
          </h1>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              style={{
                padding: "10px 24px", background: "var(--accent)",
                border: "none", borderRadius: "var(--radius-sm)",
                color: "white", fontSize: "14px", fontWeight: "600",
                cursor: "pointer", boxShadow: "var(--shadow-accent)",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit Profile
            </button>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleCancel}
                style={{
                  padding: "10px 20px", background: "transparent",
                  border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                  color: "var(--text-secondary)", fontSize: "14px", cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{
                  padding: "10px 24px", background: "var(--accent)",
                  border: "none", borderRadius: "var(--radius-sm)",
                  color: "white", fontSize: "14px", fontWeight: "600",
                  cursor: "pointer", boxShadow: "var(--shadow-accent)",
                }}
              >
                {saved ? "✓ Saved!" : "Save Changes"}
              </button>
            </div>
          )}
        </header>

        <main style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "24px", maxWidth: "700px" }}>

          {/* Avatar + name card */}
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", padding: "28px",
            display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap",
          }}>
            {/* Avatar */}
            <div style={{ position: "relative" }}>
              <div style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: "var(--accent)", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: "32px", fontWeight: "700", color: "white",
                fontFamily: "var(--font-display)",
                boxShadow: "var(--shadow-accent)",
              }}>
                {profile.name.charAt(0)}
              </div>
              {editing && (
                <button style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: "26px", height: "26px", borderRadius: "50%",
                  background: "var(--accent)", border: "2px solid var(--bg-card)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "white",
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Name + info */}
            <div style={{ flex: 1 }}>
              <h2 style={{
                fontFamily: "var(--font-display)", fontSize: "22px",
                fontWeight: "700", color: "var(--text-primary)", marginBottom: "4px",
              }}>
                {profile.name}
              </h2>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
                {profile.email}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Joined {profile.joined}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "20px" }}>
              <StatBox value={profile.translations} label="Translations" />
              <StatBox value={profile.saved} label="Saved" />
            </div>
          </div>

          {/* Personal Information */}
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", overflow: "hidden",
          }}>
            <div style={{
              padding: "16px 20px", borderBottom: "1px solid var(--border)",
              background: "var(--bg-secondary)",
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: "600", color: "var(--text-primary)" }}>
                Personal Information
              </h3>
            </div>

            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>

              <ProfileField
                label="Full Name"
                value={form.name}
                editing={editing}
                onChange={v => setForm({ ...form, name: v })}
              />

              <div style={{ height: "1px", background: "var(--border)" }} />

              <ProfileField
                label="Email Address"
                value={form.email}
                editing={editing}
                type="email"
                onChange={v => setForm({ ...form, email: v })}
              />

              <div style={{ height: "1px", background: "var(--border)" }} />

              <ProfileField
                label="Preferred Language"
                value={form.language}
                editing={editing}
                isSelect
                options={["French", "English", "Spanish", "German", "Chinese", "Arabic", "Swahili"]}
                onChange={v => setForm({ ...form, language: v })}
              />

              <div style={{ height: "1px", background: "var(--border)" }} />

              {/* Password field - only show when editing */}
              {editing && (
                <ProfileField
                  label="New Password"
                  value={form.password || ""}
                  editing={editing}
                  type="password"
                  placeholder="Leave blank to keep current"
                  onChange={v => setForm({ ...form, password: v })}
                />
              )}

            </div>
          </div>

          {/* Account Activity */}
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", overflow: "hidden",
          }}>
            <div style={{
              padding: "16px 20px", borderBottom: "1px solid var(--border)",
              background: "var(--bg-secondary)",
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: "600", color: "var(--text-primary)" }}>
                Account Activity
              </h3>
            </div>
            <div style={{ padding: "20px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <ActivityCard
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                label="Total Translations"
                value={profile.translations}
                color="var(--accent)"
              />
              <ActivityCard
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>}
                label="Saved Translations"
                value={profile.saved}
                color="#22c55e"
              />
              <ActivityCard
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
                label="Languages Used"
                value={6}
                color="#f59e0b"
              />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

function StatBox({ value, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "700", color: "var(--text-primary)" }}>
        {value}
      </p>
      <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{label}</p>
    </div>
  );
}

function ProfileField({ label, value, editing, onChange, type = "text", isSelect, options, placeholder }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
      <span style={{ fontSize: "13px", color: "var(--text-muted)", minWidth: "140px" }}>{label}</span>
      {editing ? (
        isSelect ? (
          <select
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{
              flex: 1, padding: "9px 12px",
              background: "var(--bg-secondary)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)", color: "var(--text-primary)",
              fontSize: "14px", outline: "none", cursor: "pointer",
            }}
          >
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
            style={{
              flex: 1, padding: "9px 12px",
              background: "var(--bg-secondary)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)", color: "var(--text-primary)",
              fontSize: "14px", outline: "none",
            }}
          />
        )
      ) : (
        <span style={{ fontSize: "14px", color: "var(--text-primary)", flex: 1, textAlign: "right" }}>
          {type === "password" ? "••••••••" : value}
        </span>
      )}
    </div>
  );
}

function ActivityCard({ icon, label, value, color }) {
  return (
    <div style={{
      flex: 1, minWidth: "140px",
      background: "var(--bg-secondary)", border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)", padding: "16px",
      display: "flex", flexDirection: "column", gap: "10px",
    }}>
      <span style={{ color }}>{icon}</span>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "700", color: "var(--text-primary)" }}>
        {value}
      </p>
      <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{label}</p>
    </div>
  );
}