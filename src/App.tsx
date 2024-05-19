import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ShoppingCartPage, ConfirmOrderPage } from './page';

import { ENDPOINT } from './constants';
import './App.css';
import './reset.css';

const router = createBrowserRouter([
  {
    path: ENDPOINT.shoppingCart,
    element: <ShoppingCartPage />,
  },
  {
    path: ENDPOINT.confirmOrder,
    element: <ConfirmOrderPage />,
  },
]);

export default function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>로딩 중입니다...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  );
}
