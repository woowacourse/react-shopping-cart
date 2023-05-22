import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import App from './components/App';
import { ResetStyle } from './styles/ResetStyle';
import { worker } from './mock/workers';
import ShoppingPage from './components/pages/ShoppingPage';
import CartListPage from './components/pages/CartListPage';
import ErrorBoundary from './components/common/ErrorBoundary';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <ShoppingPage />,
      },
      {
        path: 'cartlist',
        element: <CartListPage />,
      },
    ],
  },
]);

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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <RecoilRoot>
        <ResetStyle />
        <RouterProvider router={router} />
      </RecoilRoot>
    </ErrorBoundary>
  </React.StrictMode>,
);

main();
