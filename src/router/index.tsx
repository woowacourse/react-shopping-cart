import { createBrowserRouter } from 'react-router-dom';
import CartPage from '@pages/\bCartPage';
import HomePage from '@pages/HomePage';
import Layout from '@components/common/Layout';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <Layout>
          <HomePage />
        </Layout>
      ),
    },
    {
      path: '/Cart',
      element: (
        <Layout>
          <CartPage />
        </Layout>
      ),
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
