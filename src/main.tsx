import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CartItemsProvider } from './shared/context/CartItemsProvider.tsx';
import { SelectedCartItemsProvider } from './shared/context/SelectedCartItemsProvider.tsx';
import { RouterProvider } from 'react-router';
import { router } from './app/routes/routes.tsx';

async function enableMocking() {
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
      <CartItemsProvider>
        <SelectedCartItemsProvider>
          <RouterProvider router={router} />
        </SelectedCartItemsProvider>
      </CartItemsProvider>
    </React.StrictMode>
  );
});
