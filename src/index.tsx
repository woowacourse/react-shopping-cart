import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import GlobalStyles from './GlobalStyles';

import { worker } from '@mocks/browser';

import App from '@components/App/App';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import ProductsPage from '@pages/ProductsPage/ProductsPage';
import CartPage from '@pages/CartPage/CartPage';

const main = async () => {
  if (window.location.pathname === '/react-shopping-cart') {
    window.location.pathname = '/react-shopping-cart/';
    return;
  }

  await worker.start({
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  });

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
          { path: '', element: <ProductsPage /> },
          { path: '/cart', element: <CartPage /> },
        ],
      },
    ],
    {
      basename: process.env.PUBLIC_URL,
    }
  );

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <GlobalStyles />
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </React.StrictMode>
  );
};

main();
