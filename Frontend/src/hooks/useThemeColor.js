import { useEffect, useState } from "react";

const PRESETS = {
  blue:   { 
    accent: "#2563eb", hover: "#1d4ed8", glow: "rgba(37,99,235,0.3)",
    logoFilter: "invert(27%) sepia(96%) saturate(1234%) hue-rotate(210deg) brightness(95%) contrast(97%)",
  },
  violet: { 
    accent: "#7c3aed", hover: "#6d28d9", glow: "rgba(124,58,237,0.3)",
    logoFilter: "invert(24%) sepia(89%) saturate(1500%) hue-rotate(255deg) brightness(90%) contrast(97%)",
  },
  green:  { 
    accent: "#16a34a", hover: "#15803d", glow: "rgba(22,163,74,0.3)",
    logoFilter: "invert(35%) sepia(98%) saturate(500%) hue-rotate(100deg) brightness(90%) contrast(97%)",
  },
  rose:   { 
    accent: "#e11d48", hover: "#be123c", glow: "rgba(225,29,72,0.3)",
    logoFilter: "invert(16%) sepia(98%) saturate(2000%) hue-rotate(330deg) brightness(95%) contrast(97%)",
  },
  amber:  { 
    accent: "#f59e0b", hover: "#d97706", glow: "rgba(245,158,11,0.3)",
    logoFilter: "invert(65%) sepia(98%) saturate(800%) hue-rotate(5deg) brightness(100%) contrast(97%)",
  },
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
    root.style.setProperty("--logo-filter", p.logoFilter); // 👈 add this
    localStorage.setItem("themeColor", color);
  }, [color]);

  return { color, setColor, presets: PRESETS };
}