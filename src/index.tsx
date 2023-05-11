import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './components/App/App';
import GlobalStyles from './GlobalStyles';
import ProductsPage from './components/pages/ProductsPage/ProductsPage';
import { RecoilRoot } from 'recoil';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <ProductsPage /> },
      { path: '/test', element: <h1>Test</h1> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
