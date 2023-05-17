import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@pages/HomePage';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />,
    },
  ],
  { basename: `${process.env.PUBLIC_URL}` }
);
