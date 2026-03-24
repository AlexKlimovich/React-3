import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

export type Theme = 'dark' | 'light';

export const ThemeContext = createContext<Theme>('light');

export const ThemeContextComponent = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setInterval(() => {
      setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    }, 4000);
  }, []);

  return <ThemeContext value={theme}>{children}</ThemeContext>;
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
