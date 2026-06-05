export default function WaveForm({ active = false, bars = 28 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "3px",
        height: "40px",
        padding: "0 4px",
      }}
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          style={{
            display: "block",
            width: "3px",
            height: active ? `${20 + Math.sin(i * 0.7) * 14}px` : "6px",
            borderRadius: "2px",
            backgroundColor: active ? "var(--accent)" : "var(--border-light)",
            transformOrigin: "center",
            animation: active
              ? `wave-bar ${0.6 + (i % 5) * 0.12}s ease-in-out ${
                  (i * 0.04) % 0.6
                }s infinite`
              : "none",
            transition: "height 0.3s ease, background-color 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}