import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartPage from '@pages/\bCartPage';
import HomePage from '@pages/HomePage';

const PageRouterProvider = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/Cart',
        element: <CartPage />,
      },
    ],
    { basename: process.env.PUBLIC_URL }
  );

  return <RouterProvider router={router} />;
};

export default PageRouterProvider;
