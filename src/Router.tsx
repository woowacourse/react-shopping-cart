import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import { Layout } from './components/common/Layout';
import ProductPageError from './pages/ProductPage/ProductPageError';
import { PAGE_ROUTES } from './constants/routes';
import NotFound from './pages/ErrorPage';
import CartPage from './pages/CartPage';

const router = createBrowserRouter(
  [
    {
      path: PAGE_ROUTES.HOME,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ProductPage />,
          errorElement: <ProductPageError />,
        },
        { path: PAGE_ROUTES.CART, element: <CartPage /> },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
