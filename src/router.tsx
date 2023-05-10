import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from './components/HomeLayout';
import Home from './pages/Home';
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/cart', element: <>cart</> },
      ],
    },
  ],
  {
    basename: '/react-shopping-cart/',
  }
);

export default router;
