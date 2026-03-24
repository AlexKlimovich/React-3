import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import type { User } from '@/types';
import { LSService } from '@/services/ls/local-storage';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

type Context = {
  user: User | null;
  isLogged: boolean;
  login: (
    data: { login: string; pass: string },
    onSuccess: (user: User) => void,
  ) => void;
  logout: () => void;
};

type APIResponse<T> = { data: T };

const userStorage = new LSService<User>('user');

export const AuthContext = createContext<Context | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(() => userStorage.get());
  const navigate = useNavigate();

  const login = useCallback<Context['login']>((data, onSuccess) => {
    const { login, pass } = data;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetch('http://localhost:8082/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, pass: Number(pass) }),
    })
      .then((res) => res.json())
      .then((response: APIResponse<User>) => {
        setUser(response.data);
        userStorage.set(response.data);
        onSuccess(response.data);
      })
      .catch((err) => console.error('Login error:', err));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    userStorage.remove();
    navigate(ROUTES.login);
  }, [navigate]);

  const data = useMemo<Context>(
    () => ({ user, login, logout, isLogged: !!user }),
    [login, logout, user],
  );

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): Context | null {
  const context = useContext(AuthContext);
  return context;
}
