import { memo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = memo(function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
      {theme === 'light' ? '🌙 Включить темную' : '☀️ Включить светлую'}
    </button>
  );
});

export default ThemeToggle;
