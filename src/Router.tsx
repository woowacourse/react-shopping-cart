import Layout from 'components/Layout/Layout';
import { CartPage } from 'pages/CartPage';
import ErrorPage from 'pages/ErrorPage';
import ProductListPage from 'pages/ProductListPage';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const ROUTE_PATH = {
  root: '/react-shopping-cart',
  cart: 'cart',
  notFound: '*',
};

export const router = createBrowserRouter([
  {
    path: ROUTE_PATH.root,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTE_PATH.root,
        element: <ProductListPage />,
      },
      {
        path: ROUTE_PATH.cart,
        element: <CartPage />,
      },
    ],
  },
]);

export default ROUTE_PATH;
