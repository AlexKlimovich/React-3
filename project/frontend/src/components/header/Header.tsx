import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/contexts/ThemeContext';
import './Header.css';

export const Header = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) =>
    location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <header className="header">
      <div className="header-left">
        <Link to={ROUTES.home} className="logo">
          🏠 MyApp
        </Link>

        <nav className="nav">
          <Link to={ROUTES.home} className={isActive(ROUTES.home)}>
            Home
          </Link>
          <Link to={ROUTES.notice} className={isActive(ROUTES.notice)}>
            Notice
          </Link>
          <Link to={ROUTES.todolist} className={isActive(ROUTES.todolist)}>
            Tasks
          </Link>
          <Link to={ROUTES.weather} className={isActive(ROUTES.weather)}>
            Weather
          </Link>
        </nav>
      </div>

      <div className="header-right">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙 Включить темную' : '☀️ Включить светлую'}
        </button>
      </div>
    </header>
  );
};
