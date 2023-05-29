import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { worker } from './mocks/worker';

worker.start({
  onUnhandledRequest: 'bypass',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
