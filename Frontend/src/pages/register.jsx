import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "",
  });
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "22px", fontWeight: "700",
          color: "var(--text-primary)", marginBottom: "6px",
        }}>
          Create your account
        </h1>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
          Join Majesty and break language barriers
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

        <div style={{ position: "relative" }}>
          <span style={iconStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div style={{ position: "relative" }}>
          <span style={iconStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </span>
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div style={{ position: "relative" }}>
          <span style={iconStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={inputStyle}
          />
          <button onClick={() => setShowPassword(!showPassword)} style={eyeBtnStyle}>
            <EyeIcon show={showPassword} />
          </button>
        </div>

        <div style={{ position: "relative" }}>
          <span style={iconStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </span>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            value={form.confirm}
            onChange={e => setForm({ ...form, confirm: e.target.value })}
            style={inputStyle}
          />
          <button onClick={() => setShowConfirm(!showConfirm)} style={eyeBtnStyle}>
            <EyeIcon show={showConfirm} />
          </button>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            width: "100%", padding: "13px",
            background: "var(--accent)", border: "none",
            borderRadius: "var(--radius-sm)", color: "white",
            fontFamily: "var(--font-display)", fontSize: "15px",
            fontWeight: "600", letterSpacing: "0.2px",
            boxShadow: "var(--shadow-accent)",
            transition: "background 0.2s, transform 0.1s",
            marginTop: "4px", cursor: "pointer",
          }}
        >
          Register
        </button>

        <p style={{ textAlign: "center", fontSize: "13px", color: "var(--text-secondary)", marginTop: "6px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--accent)", fontWeight: "500" }}>
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

function EyeIcon({ show }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {show ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </>
      )}
    </svg>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px 12px 40px",
  background: "var(--bg-input)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  color: "var(--text-primary)",
  fontSize: "14px",
  outline: "none",
};

const iconStyle = {
  position: "absolute", left: "14px", top: "50%",
  transform: "translateY(-50%)", color: "var(--text-muted)",
  pointerEvents: "none",
};

const eyeBtnStyle = {
  position: "absolute", right: "14px", top: "50%",
  transform: "translateY(-50%)", background: "none",
  border: "none", color: "var(--text-muted)", padding: 0, cursor: "pointer",
};