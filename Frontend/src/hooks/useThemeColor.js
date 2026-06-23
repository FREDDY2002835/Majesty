import { useEffect, useState } from "react";

const PRESETS = {
  blue:   { accent: "#2563eb", hover: "#1d4ed8", glow: "rgba(37,99,235,0.3)" },
  violet: { accent: "#7c3aed", hover: "#6d28d9", glow: "rgba(124,58,237,0.3)" },
  green:  { accent: "#16a34a", hover: "#15803d", glow: "rgba(22,163,74,0.3)" },
  rose:   { accent: "#e11d48", hover: "#be123c", glow: "rgba(225,29,72,0.3)" },
  amber:  { accent: "#f59e0b", hover: "#d97706", glow: "rgba(245,158,11,0.3)" },
};

export function useThemeColor() {
  const [color, setColor] = useState(
    () => localStorage.getItem("themeColor") || "blue"
  );

  useEffect(() => {
    const p = PRESETS[color] ?? PRESETS.blue;
    const root = document.documentElement;
    root.style.setProperty("--accent", p.accent);
    root.style.setProperty("--accent-hover", p.hover);
    root.style.setProperty("--accent-glow", p.glow);
    root.style.setProperty("--shadow-accent", `0 4px 24px ${p.glow}`);
    localStorage.setItem("themeColor", color);
  }, [color]);

  return { color, setColor, presets: PRESETS };
}
