import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import App from './components/App/App';
import GlobalStyles from './GlobalStyles';
import ProductsPage from './components/pages/ProductsPage/ProductsPage';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';

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
  },
);
console.log(process.env.PUBLIC_URL);
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
