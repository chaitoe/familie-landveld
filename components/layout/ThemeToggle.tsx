'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'sepia';

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem('theme') as Theme) || 'light';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored);
    document.documentElement.setAttribute('data-theme', stored);
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    const next: Record<Theme, Theme> = { light: 'dark', dark: 'sepia', sepia: 'light' };
    const newTheme = next[theme];
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const icons: Record<Theme, string> = { light: '☀️', dark: '🌙', sepia: '📜' };
  const labels: Record<Theme, string> = { light: 'Light', dark: 'Dark', sepia: 'Sepia' };

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  return (
    <button
      onClick={cycleTheme}
      className="px-2 py-1 text-sm rounded border border-stone-300 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      title={`Thema: ${labels[theme]}`}
    >
      {icons[theme]}
    </button>
  );
}
