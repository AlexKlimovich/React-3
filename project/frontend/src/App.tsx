import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { lazy } from 'react';
import { useAuthContext } from './contexts/auth-context';
import { Header } from './components/header/Header';

const Login = lazy(() => import('./pages/login'));
const Home = lazy(() => import('./pages/home'));
const NoticePage = lazy(() => import('./pages/notice'));
const ToDoList = lazy(() => import('./pages/todolist'));

export function App() {
  const { isLogged } = useAuthContext() ?? {};

  return (
    <>
      {isLogged && <Header />}

      <Routes>
        <Route
          path={ROUTES.login}
          element={isLogged ? <Navigate to={ROUTES.home} replace /> : <Login />}
        />

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
