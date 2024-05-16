import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cart from './pages/Cart.tsx';
import Completed from './pages/Completed.tsx';
import './reset.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Cart />,
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
