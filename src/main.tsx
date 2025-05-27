import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/reset.css';
import MobileLayout from '@shared/components/MobileLayout/MobileLayout.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MobileLayout>
      <App />
    </MobileLayout>
  </React.StrictMode>,
);
