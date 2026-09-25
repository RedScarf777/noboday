import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './WildernessApp.tsx';
import './wilderness.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
