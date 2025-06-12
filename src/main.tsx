import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './app/routes/routes.tsx';
import { CartProvider } from './shared/context/CartProvider.tsx';
import { CouponProvider } from './shared/context/CouponProvider.tsx';

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
      <CartProvider>
        <CouponProvider>
          <RouterProvider router={router} />
        </CouponProvider>
      </CartProvider>
    </React.StrictMode>
  );
});
