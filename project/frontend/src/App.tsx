// src/App.tsx
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'; // 👈 Проверьте: react-router-dom
import { Login } from './pages/login';
import { ROUTES } from './constants/routes';
import { Home } from './pages/home';
import { NoticePage } from './pages/notice';
import { ToDoList } from './pages/todolist';
import { useAuthContext } from './contexts/auth-context';
import { Header } from './components/header/Header';

export function App() {
  const { isLogged } = useAuthContext() ?? {};

  return (
    <>
      {/* 👇 Header виден только авторизованным */}
      {isLogged && <Header />}

      <Routes>
        {/* 👇 Публичный маршрут: логин */}
        <Route
          path={ROUTES.login}
          element={isLogged ? <Navigate to={ROUTES.home} replace /> : <Login />}
        />

        {/* 👇 Защищённые маршруты: редирект если не авторизован */}
        <Route
          path={ROUTES.home}
          element={isLogged ? <Home /> : <Navigate to={ROUTES.login} replace />}
        />

        <Route
          path={ROUTES.notice}
          element={
            isLogged ? <NoticePage /> : <Navigate to={ROUTES.login} replace />
          }
        />

        <Route
          path={ROUTES.todolist}
          element={
            isLogged ? <ToDoList /> : <Navigate to={ROUTES.login} replace />
          }
        />

        {/* 👇 Catch-all: редирект в зависимости от авторизации */}
        <Route
          path="*"
          element={
            <Navigate to={isLogged ? ROUTES.home : ROUTES.login} replace />
          }
        />
      </Routes>
    </>
  );
}
