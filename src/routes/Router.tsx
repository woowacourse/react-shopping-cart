import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import NotFound from '../page/NotFound';
import Home from '../page/Home';

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
