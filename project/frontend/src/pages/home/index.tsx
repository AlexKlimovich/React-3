import { useAuthContext } from '@/contexts/auth-context';
import './Home.css';
// import { Link } from 'react-router-dom'; // 👈 Импортируем Link
// import { ROUTES } from '@/constants/routes';
// import ThemeToggle from '@/components/ThemeToggle';

export const Home = () => {
  const { user, logout } = useAuthContext() ?? {};

  return (
    <>
      <div>
        <h1 className="btn-center">Welcome to our App dear {user?.name}</h1>
      </div>
      {/* <ThemeToggle />
      <br></br>
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
      <div>*/}
      <div className="btn-center">
        <button
          onClick={logout}
          className="logout-btn"
          style={{ marginTop: 20 }}
        >
          Logout
        </button>
      </div>
    </>
  );
};
