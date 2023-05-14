import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ListPage from '../pages/ListPage/ListPage';

const Router = () => {
  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <ListPage />,
    },
  ]);

  return <RouterProvider router={browserRouter} />;
};

export default Router;
