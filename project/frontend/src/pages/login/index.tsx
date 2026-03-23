import { ROUTES } from '@/constants/routes';
import { useAuthContext } from '@/contexts/auth-context';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const Login = () => {
  const navigate = useNavigate();

  const { login: fetchLogin } = useAuthContext() ?? {};

  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div>
      <input
        value={login}
        onChange={({ target: { value } }) => setLogin(value)}
        placeholder="Input login"
      />
      <br />
      <input
        value={pass}
        type="password"
        onChange={({ target: { value } }) => setPass(value)}
        placeholder="Input password"
      />
      <br />
      <button
        onClick={() => {
          if (!login || !pass || !fetchLogin) return;
          console.log('here');

          fetchLogin({ login, pass }, () => {
            void navigate(ROUTES.home);
          });
        }}
      >
        Log in
      </button>
    </div>
  );
};
