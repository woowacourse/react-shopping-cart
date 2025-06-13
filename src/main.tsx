import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

async function enableMocking() {
  if (
    import.meta.env.MODE !== 'development' &&
    import.meta.env.VITE_APP_ENABLE_MSW !== 'true'
  ) {
    return;
  }

  const { worker } = await import('./mocks/browsers');

  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
