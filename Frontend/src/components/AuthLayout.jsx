export default function AuthLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
        padding: "24px",
      }}
    >
      {/* Background glow blobs */}
      <div style={{
        position: "absolute", top: "-120px", left: "-120px",
        width: "420px", height: "420px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-100px", right: "-80px",
        width: "360px", height: "360px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Card */}
      <div
        className="fade-up"
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "40px 36px",
          boxShadow: "var(--shadow)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center",
            gap: "10px", marginBottom: "6px",
          }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "50%",
              background: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "var(--shadow-accent)",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" fill="white"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="23" x2="16" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px", fontWeight: "700",
              color: "var(--text-primary)", letterSpacing: "-0.3px",
            }}>
              Majesty
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.5px" }}>
            AI Speech Translation Platform
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}