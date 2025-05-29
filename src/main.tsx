import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SelectedCartProvider } from './shared/context/SelectedCartProvider.tsx';
import { RouterProvider } from 'react-router';
import { router } from './app/routes/routes.tsx';

async function enableMocking() {
  // if (process.env.NODE_ENV === 'development') {
  //   return;
  // }

  const isLocalhost = location.hostname === 'localhost';

  const { worker } = await import('./mocks/browser');
  return worker.start({
    serviceWorker: {
      url: isLocalhost ? '/mockServiceWorker.js' : '/react-shopping-cart/mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass',
  });
}
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <SelectedCartProvider>
        <RouterProvider router={router} />
      </SelectedCartProvider>
    </React.StrictMode>
  );
});
