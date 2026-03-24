import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import { Login } from './pages/login';
import { ROUTES } from './constants/routes';
import { Home } from './pages/home';
import { NoticePage } from './pages/notice';
import { ToDoList } from './pages/todolist';
import { useAuthContext } from './contexts/auth-context';

export function App() {
  const { isLogged } = useAuthContext() ?? {};

  return (
    <Routes>
      {isLogged ? (
        <>
          <Route path={ROUTES.home} element={<Home />} />

          <Route path={ROUTES.notice} element={<NoticePage />} />

          <Route path={ROUTES.todolist} element={<ToDoList />} />

          <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
        </>
      ) : (
        <>
          <Route path={ROUTES.login} element={<Login />} />
          <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
        </>
      )}
    </Routes>
  );
}

// 1) разлогин
// 2) notions - посадить на отдельный роут авторизованный
// 3) в ней делать прошлую домашку с todo лист
