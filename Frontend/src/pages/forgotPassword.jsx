import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) return;
    setLoading(true);
    // Simulate a delay
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <AuthLayout>
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "22px", fontWeight: "700",
          color: "var(--text-primary)", marginBottom: "6px",
        }}>
          Forgot Password?
        </h1>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
          {submitted
            ? "Check your email for reset instructions."
            : "Enter your email and we'll send you a reset link."}
        </p>
      </div>

      {!submitted ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Email input */}
          <div style={{ position: "relative" }}>
            <span style={{
              position: "absolute", left: "14px", top: "50%",
              transform: "translateY(-50%)", color: "var(--text-muted)",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </span>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: "100%", padding: "13px 14px 13px 42px",
                background: "var(--bg-secondary)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)", color: "var(--text-primary)",
                fontSize: "14px", outline: "none",
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "13px",
              background: "var(--accent)", border: "none",
              borderRadius: "var(--radius-sm)", color: "white",
              fontFamily: "var(--font-display)", fontSize: "15px",
              fontWeight: "600", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1, transition: "all 0.2s",
              boxShadow: "var(--shadow-accent)",
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p style={{ textAlign: "center", fontSize: "13px", color: "var(--text-secondary)" }}>
            Remember your password?{" "}
            <Link to="/login" style={{ color: "var(--accent)", fontWeight: "500" }}>
              Back to Login
            </Link>
          </p>
        </div>
      ) : (
        /* Success state */
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            background: "rgba(34,197,94,0.1)", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
              We sent a reset link to <strong style={{ color: "var(--text-primary)" }}>{email}</strong>.
              Check your inbox and follow the instructions.
            </p>
          </div>

          <Link
            to="/login"
            style={{
              display: "block", width: "100%", padding: "13px",
              background: "var(--accent)", border: "none",
              borderRadius: "var(--radius-sm)", color: "white",
              fontFamily: "var(--font-display)", fontSize: "15px",
              fontWeight: "600", cursor: "pointer",
              boxShadow: "var(--shadow-accent)", textAlign: "center",
              textDecoration: "none",
            }}
          >
            Back to Login
          </Link>
        </div>
      )}
    </AuthLayout>
  );
}