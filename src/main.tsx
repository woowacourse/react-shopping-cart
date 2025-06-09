import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CartItemsProvider } from './features/cart/context/CartItemsProvider.tsx';
import { SelectedCartItemsProvider } from './features/cart/context/SelectedCartItemsProvider.tsx';
import { CouponsProvider } from './features/coupon/context/CouponsProvider.tsx';
import { RouterProvider } from 'react-router';
import { router } from './app/routes/routes.tsx';

async function enableMocking() {
  const shouldUseMSW = import.meta.env.VITE_USE_MSW === 'true';

  if (!shouldUseMSW) {
    return Promise.resolve();
  }

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
        <CouponsProvider>
          <SelectedCartItemsProvider>
            <RouterProvider router={router} />
          </SelectedCartItemsProvider>
        </CouponsProvider>
      </CartItemsProvider>
    </React.StrictMode>
  );
});
