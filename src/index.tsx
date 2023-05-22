import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import App from './App';
import GlobalStyle from './GlobalStyle';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPages';
import { worker } from './mocks/browser';

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
};

if (process.env.NODE_ENV === 'development') {
  worker.start();
} else {
  main();
}

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <ProductListPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RecoilRoot>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>,
);
