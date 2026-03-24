// src/main.tsx (главный)
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context';
import { ThemeProvider } from './pages/todolist/context/ThemeContext';
import { ThemeContextComponent } from './pages/notice/contexts/ThemeContext'; // 👈 Если нужен

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <ThemeContextComponent>
          <App />
        </ThemeContextComponent>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>,
);
