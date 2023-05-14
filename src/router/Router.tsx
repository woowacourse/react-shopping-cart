import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ListPage from '../pages/ListPage/ListPage';
import { PAGE_PATH } from '../constants';

const Router = () => {
  const browserRouter = createBrowserRouter([
    {
      path: PAGE_PATH.HOME,
      element: <ListPage />,
    },
  ]);

  return <RouterProvider router={browserRouter} />;
};

export default Router;
