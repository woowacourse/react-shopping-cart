import { Global } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import MobileLayout from './components/common/mobileLayout/MobileLayout.tsx';
import reset from './global/reset.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global styles={reset} />
    <MobileLayout>
      <App />
    </MobileLayout>
  </React.StrictMode>
);
