import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SelectedCartProvider } from './shared/context/SelectedCartProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SelectedCartProvider>
      <App />
    </SelectedCartProvider>
  </React.StrictMode>
);
