import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import App from './components/App';
import { ResetStyle } from './styles/ResetStyle';
import { worker } from './mock/workers';
import ShoppingPage from './components/pages/ShoppingPage';
import CartListPage from './components/pages/CartListPage';

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

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ResetStyle />
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
);
