import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from './components/HomeLayout';
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        { path: '/', element: <>home</> },
        { path: '/cart', element: <>cart</> },
      ],
    },
  ],
  {
    basename: '/react-shopping-cart/',
  }
);

export default router;
