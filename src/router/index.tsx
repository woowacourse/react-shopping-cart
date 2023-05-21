import { createBrowserRouter } from 'react-router-dom';
import CartPage from '@pages/\bCartPage';
import HomePage from '@pages/HomePage';
import Layout from '@components/common/Layout';
import NotFound from '@components/common/NotFount';

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
    {
    path: '*',
    element: <NotFound />,
  },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
