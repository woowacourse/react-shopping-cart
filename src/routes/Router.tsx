import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import NotFound from '../Page/NotFound';
import Home from '../Page/Home';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <NotFound />,
      children: [{ index: true, element: <Home /> }],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
