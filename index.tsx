import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Could not find root element');

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
