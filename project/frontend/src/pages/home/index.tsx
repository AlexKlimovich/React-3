import { useAuthContext } from '@/contexts/auth-context';

export const Home = () => {
  const { user } = useAuthContext() ?? {};

  return <div>Welcome to our App dear {user?.name}</div>;
};
