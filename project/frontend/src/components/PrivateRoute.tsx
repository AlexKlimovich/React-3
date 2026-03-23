import { ROUTES } from '@/constants/routes';
import { useAuthContext } from '@/contexts/auth-context';
import { Navigate, Route, type RouteProps } from 'react-router';

export const PrivateRoute = (props: RouteProps) => {
  const { isLogged } = useAuthContext() ?? {};
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Navigate to={ROUTES.login} replace />
  );
};
