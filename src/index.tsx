import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import GlobalStyles from './GlobalStyles';
import App from '@components/App/App';
import ProductsPage from '@pages/ProductsPage/ProductsPage';
import ErrorPage from '@pages/ErrorPage/ErrorPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [{ path: '', element: <ProductsPage /> }],
    },
  ],
  {
    basename: '/react-shopping-cart',
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
