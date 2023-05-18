import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

if (process.env.NODE_ENV === 'development') {
  import('./mocks/server').then(async ({ worker }) => {
    await worker.start();
    renderApp();
  });
} else {
  renderApp();
}
