import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cart from './pages/Cart/Cart.tsx';
import Completed from './pages/Completed/Completed.tsx';
import App from './App.tsx';
import './reset.css';
import './index.css';
import Order from './pages/Order/Order.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/order',
    element: <Order />,
  },
  {
    path: '/completed',
    element: <Completed />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
);
