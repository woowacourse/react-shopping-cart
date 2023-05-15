import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
