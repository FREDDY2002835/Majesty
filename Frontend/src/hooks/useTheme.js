// src/hooks/useTheme.js
import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    const root = document.documentElement;
    const apply = (t) => {
      const resolved =
        t === 'system'
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : t;
      root.classList.remove('light', 'dark');
      root.classList.add(resolved);
      root.dataset.theme = resolved;
    };

    apply(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => apply('system');
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, [theme]);

  return { theme, setTheme };
}
