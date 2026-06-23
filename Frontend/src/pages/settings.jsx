import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getMe, updateMe, clearHistory, deleteHistoryItem } from "../api";
import { useThemeColor } from "../hooks/useThemeColor";
import { Palette as PaletteIcon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, Monitor } from "lucide-react";


// Add clearHistory and deleteMe to api.js if not already there
const deleteMe = () =>
  fetch("http://localhost:5000/api/auth/me", {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(r => r.json());

const clearAllHistory = () =>
  fetch("http://localhost:5000/api/translate/history", {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(r => r.json());

export default function SettingsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ name: "", email: "", password: "" });
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { color, setColor, presets } = useThemeColor();
  const { theme, setTheme } = useTheme();
  const THEMES = [
  { key: 'light',  label: 'Light',  icon: Sun },
  { key: 'dark',   label: 'Dark',   icon: Moon },
  { key: 'system', label: 'System', icon: Monitor },
];
  const savedSettings =
  JSON.parse(localStorage.getItem("settings")) || {};

  const [languages, setLanguages] = useState(() => {
  const saved = localStorage.getItem("languageSettings");

  return saved
    ? JSON.parse(saved)
    : {
        source: "English",
        target: "French",
      };
});
  const [audio, setAudio] = useState({ speed: "Normal", volume: 80, autoPlay: true, bluetooth: false });
  const [notifications, setNotifications] = useState({ email: true, push: false, history: true });

  useEffect(() => {
    getMe().then(data => {
      if (data.user) {
        setProfile({ name: data.user.name, email: data.user.email, password: "" });
      }
      setLoading(false);
    });
  }, []);

 const handleSave = async () => {
  try {
    const payload = {
      name: profile.name,
    };

    if (profile.password.trim()) {
      payload.password = profile.password;
    }

    const result = await updateMe(payload);

    if (!result.user) {
      throw new Error(result.message || "Failed to update profile");
    }

    localStorage.setItem("user", JSON.stringify(result.user));

    localStorage.setItem(
      "settings",
      JSON.stringify({
        profile,
        languages,
        audio,
        notifications,
      })
    );

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  } catch (err) {
    console.error(err);
    alert("Failed to save settings");
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleClearHistory = async () => {
    const confirmed = window.confirm("Are you sure you want to clear all translation history? This cannot be undone.");
    if (!confirmed) return;
    await clearAllHistory();
    alert("Translation history cleared.");
  };

  const handleDeleteAccount = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await deleteMe();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const sourceLanguages = ["English", "French", "Spanish", "German", "Chinese", "Arabic", "Swahili", "Portuguese"];
  const targetLanguages = ["French", "English", "Spanish", "German", "Chinese", "Arabic", "Swahili", "Portuguese"];
  const speedOptions = ["Slow", "Normal", "Fast"];

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
            Settings
          </h1>
          <button
            onClick={handleSave}
            style={{
              padding: "10px 24px", background: "var(--accent)",
              border: "none", borderRadius: "var(--radius-sm)",
              color: "white", fontSize: "14px", fontWeight: "600",
              cursor: "pointer", boxShadow: "var(--shadow-accent)",
              transition: "all 0.2s",
            }}
          >
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </header>

        <main style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "24px", maxWidth: "700px" }}>

          {/* Profile Settings */}
          <Section title="Profile" icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          }>
            {loading ? (
              <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>Loading...</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <Field label="Full Name">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                    style={inputStyle}
                  />
                </Field>
                <Field label="Email Address">
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    style={{ ...inputStyle, opacity: 0.6, cursor: "not-allowed" }}
                  />
                </Field>
                <Field label="New Password">
                  <input
                    type="password"
                    placeholder="Leave blank to keep current"
                    value={profile.password}
                    onChange={e => setProfile({ ...profile, password: e.target.value })}
                    style={inputStyle}
                  />
                </Field>
              </div>
            )}
          </Section>

          

          {/* Language Settings */}
          <Section title="Language Preferences" icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          }>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Field label="Default Source Language" style={{ flex: 1, minWidth: "180px" }}>
                <select
                  value={languages.source}
                  onChange={e => setLanguages({ ...languages, source: e.target.value })}
                  style={selectStyle}
                >
                  {sourceLanguages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </Field>
              <Field label="Default Target Language" style={{ flex: 1, minWidth: "180px" }}>
                <select
                  value={languages.target}
                  onChange={e => setLanguages({ ...languages, target: e.target.value })}
                  style={selectStyle}
                >
                  {targetLanguages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </Field>
            </div>
          </Section>

          {/* Audio Settings */}
          <Section title="Audio Settings" icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          }>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <Field label="Translation Voice Speed">
                <div style={{ display: "flex", gap: "8px" }}>
                  {speedOptions.map(s => (
                    <button
                      key={s}
                      onClick={() => setAudio({ ...audio, speed: s })}
                      style={{
                        padding: "8px 20px", borderRadius: "var(--radius-sm)",
                        background: audio.speed === s ? "var(--accent)" : "var(--bg-secondary)",
                        border: `1px solid ${audio.speed === s ? "var(--accent)" : "var(--border)"}`,
                        color: audio.speed === s ? "white" : "var(--text-secondary)",
                        fontSize: "13px", cursor: "pointer", transition: "all 0.2s",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label={`Volume — ${audio.volume}%`}>
                <input
                  type="range" min="0" max="100"
                  value={audio.volume}
                  onChange={e => setAudio({ ...audio, volume: Number(e.target.value) })}
                  style={{ width: "100%", accentColor: "var(--accent)", cursor: "pointer" }}
                />
              </Field>
              <Toggle
                label="Auto-play Translation"
                description="Automatically play translation audio after recognition"
                checked={audio.autoPlay}
                onChange={() => setAudio({ ...audio, autoPlay: !audio.autoPlay })}
              />
              <Toggle
                label="Bluetooth Earphone Support"
                description="Send translation audio directly to Bluetooth earphones"
                checked={audio.bluetooth}
                onChange={() => setAudio({ ...audio, bluetooth: !audio.bluetooth })}
              />
            </div>
          </Section>

          {/* Notification Settings */}
          <Section title="Notifications" icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          }>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <Toggle
                label="Email Notifications"
                description="Receive updates and tips via email"
                checked={notifications.email}
                onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
              />
              <Toggle
                label="Push Notifications"
                description="Receive push notifications on your device"
                checked={notifications.push}
                onChange={() => setNotifications({ ...notifications, push: !notifications.push })}
              />
              <Toggle
                label="History Reminders"
                description="Get reminders to review your translation history"
                checked={notifications.history}
                onChange={() => setNotifications({ ...notifications, history: !notifications.history })}
              />
            </div>
          </Section>

          {/* Account Section */}
          <Section title="Account" icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          }>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Logout */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "14px", color: "var(--text-primary)", marginBottom: "2px" }}>Log Out</p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Sign out of your Majesty account</p>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: "10px 20px", background: "transparent",
                    border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                    color: "var(--text-secondary)", fontSize: "14px", cursor: "pointer",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  Log Out
                </button>
              </div>

              <div style={{ height: "1px", background: "var(--border)" }} />

              <p style={{ fontSize: "13px", color: "#ef4444", fontWeight: "600" }}>
                Danger Zone
              </p>

              {/* Clear history */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "14px", color: "var(--text-primary)", marginBottom: "2px" }}>Clear All History</p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Permanently delete all your translation history</p>
                </div>
                <button
                  onClick={handleClearHistory}
                  style={{
                    padding: "10px 20px", background: "transparent",
                    border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                    color: "var(--text-secondary)", fontSize: "14px", cursor: "pointer",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#ef4444"; e.currentTarget.style.color = "#ef4444"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  Clear History
                </button>
              </div>

              {/* Delete account */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "14px", color: "var(--text-primary)", marginBottom: "2px" }}>Delete Account</p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Permanently delete your account and all data</p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  style={{
                    padding: "10px 20px",
                    background: confirmDelete ? "#ef4444" : "rgba(239,68,68,0.1)",
                    border: "1px solid #ef4444", borderRadius: "var(--radius-sm)",
                    color: confirmDelete ? "white" : "#ef4444",
                    fontSize: "14px", cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  {confirmDelete ? "Click again to confirm" : "Delete Account"}
                </button>
              </div>

            </div>
          </Section>

          <Section title="Appearance" icon={<PaletteIcon />}>
  <Field label="Accent Color">
    <div style={{ display: "flex", gap: "12px" }}>
      {Object.entries(presets).map(([key, p]) => (
        <button
          key={key}
          onClick={() => setColor(key)}
          aria-label={key}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: p.accent, cursor: "pointer",
            border: color === key ? "3px solid var(--text-primary)" : "2px solid var(--border)",
            transition: "all 0.2s",
          }}
        />
      ))}
    </div>
  </Field>
</Section>

<Section title="Theme" icon={<Moon size={18} />}>
  <div style={{ display: 'flex', gap: 12 }}>
    {THEMES.map(({ key, label, icon: Icon }) => (
      <button
        key={key}
        onClick={() => setTheme(key)}
        style={{
          flex: 1,
          padding: 16,
          borderRadius: 12,
          border: `2px solid ${theme === key ? 'var(--accent)' : 'var(--border)'}`,
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
        }}
      >
        <Icon size={20} />
        <div>{label}</div>
      </button>
    ))}
  </div>
</Section>

        </main>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={{
      background: "var(--bg-card)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", overflow: "hidden",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "16px 20px", borderBottom: "1px solid var(--border)",
        background: "var(--bg-secondary)",
      }}>
        <span style={{ color: "var(--accent)" }}>{icon}</span>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: "600", color: "var(--text-primary)" }}>
          {title}
        </h2>
      </div>
      <div style={{ padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children, style }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }}>
      <label style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "500" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
      <div>
        <p style={{ fontSize: "14px", color: "var(--text-primary)", marginBottom: "2px" }}>{label}</p>
        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{description}</p>
      </div>
      <button
        onClick={onChange}
        style={{
          width: "44px", height: "24px", borderRadius: "12px",
          background: checked ? "var(--accent)" : "var(--border)",
          border: "none", cursor: "pointer", position: "relative",
          transition: "background 0.2s", flexShrink: 0,
        }}
      >
        <span style={{
          position: "absolute", top: "3px",
          left: checked ? "23px" : "3px",
          width: "18px", height: "18px", borderRadius: "50%",
          background: "white", transition: "left 0.2s",
        }} />
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "11px 14px",
  background: "var(--bg-secondary)", border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)", color: "var(--text-primary)",
  fontSize: "14px", outline: "none",
};

const selectStyle = {
  width: "100%", padding: "11px 14px",
  background: "var(--bg-secondary)", border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)", color: "var(--text-primary)",
  fontSize: "14px", outline: "none", cursor: "pointer",
};