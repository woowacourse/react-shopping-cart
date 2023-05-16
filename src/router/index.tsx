import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '@pages/HomePage';

const PageRouterProvider = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
    { basename: `${process.env.PUBLIC_URL}` }
  );

  return <RouterProvider router={router} />;
};

export default PageRouterProvider;
