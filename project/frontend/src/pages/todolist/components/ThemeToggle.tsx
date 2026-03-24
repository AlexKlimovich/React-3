import { memo } from 'react';
import { useTheme } from '@/pages/todolist/context/ThemeContext.tsx';
import type { ThemeContextType } from '../types/types';

const ThemeToggle = memo(function ThemeToggle() {
  const { theme, toggleTheme }: ThemeContextType = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
      {theme === 'light' ? '🌙 Включить темную' : '☀️ Включить светлую'}
    </button>
  );
});

export default ThemeToggle;
