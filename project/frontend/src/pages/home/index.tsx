import { useAuthContext } from '@/contexts/auth-context';
import { Link } from 'react-router-dom'; // 👈 Импортируем Link
import { ROUTES } from '@/constants/routes';

export const Home = () => {
  const { user, logout } = useAuthContext() ?? {};

  return (
    <>
      <div>Welcome to our App dear {user?.name}</div>
      <br></br>
      <div>
        <Link to={ROUTES.notice}>
          <button>Notice</button>
        </Link>
      </div>
      <br></br>
      <div>
        <Link to={ROUTES.todolist}>
          <button>ToDoList</button>
        </Link>
      </div>
      <div>
        <button onClick={logout} style={{ marginTop: 20 }}>
          Logout
        </button>
      </div>
    </>
  );
};
