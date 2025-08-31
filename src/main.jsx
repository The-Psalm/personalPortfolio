import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Add loading class to body
document.body.classList.add('loading');

// Remove loading class when React has loaded
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Mark React as loaded
document.body.classList.add('react-loaded');

// Remove loading class after a brief delay
setTimeout(() => {
  document.body.classList.remove('loading');
}, 100);
