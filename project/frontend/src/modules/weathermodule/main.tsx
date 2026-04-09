import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/variables.css';
import './style/style.css';
import { WeatherApp } from '.';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeatherApp />
  </StrictMode>,
);
