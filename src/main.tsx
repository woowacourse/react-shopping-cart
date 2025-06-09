import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CartItemsProvider } from './features/cart/context/CartItemsProvider.tsx';
import { CartWithOrderProvider } from './shared/context/CartWithOrderProvider.tsx';
import { CouponsProvider } from './features/coupon/context/CouponsProvider.tsx';
import { RouterProvider } from 'react-router';
import { router } from './app/routes/routes.tsx';

async function enableMocking() {
  const shouldUseMSW = import.meta.env.VITE_USE_MSW === 'true';

  if (!shouldUseMSW) {
    return Promise.resolve();
  }

  const { worker } = await import('./mocks/browser');
  return worker.start({
    serviceWorker: {
      url:
        import.meta.env.NODE_ENV === 'production'
          ? '/react-shopping-cart/mockServiceWorker.js'
          : '/mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <CartItemsProvider>
        <CouponsProvider>
          <CartWithOrderProvider>
            <RouterProvider router={router} />
          </CartWithOrderProvider>
        </CouponsProvider>
      </CartItemsProvider>
    </React.StrictMode>
  );
});
