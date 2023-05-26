import { createBrowserRouter } from 'react-router-dom';
import CartPage from '@pages/CartPage';
import HomePage from '@pages/HomePage';
import Layout from '@components/common/Layout';

export const PAGE_PATH = {
  HOME: '/',
  CART: '/cart',
};

export const router = createBrowserRouter(
  [
    {
      path: PAGE_PATH.HOME,
      element: (
        <Layout>
          <HomePage />
        </Layout>
      ),
    },
    {
      path: PAGE_PATH.CART,
      element: (
        <Layout>
          <CartPage />
        </Layout>
      ),
    },
  ],
  { basename: `${process.env.PUBLIC_URL}` }
);
