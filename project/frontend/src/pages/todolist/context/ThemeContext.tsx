import { createContext, useContext, useState, useEffect } from 'react'; // 👈 Добавили useEffect
import type {
  Theme,
  ThemeContextType,
  ThemeProviderProps,
} from '../types/types'; // 👈 Убрали .ts

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    const root = document.body;

    root.classList.remove('light', 'dark');

    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-wrapper ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider'); // 👈 Понятная ошибка
  return context;
}
