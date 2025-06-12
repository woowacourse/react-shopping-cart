import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from '@app/App.tsx';
import './styles/reset.css';
import MobileLayout from '@/shared/ui/MobileLayout/MobileLayout';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MobileLayout>
        <App />
      </MobileLayout>
    </BrowserRouter>
  </React.StrictMode>,
);
