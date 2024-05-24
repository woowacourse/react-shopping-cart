<<<<<<< HEAD
<<<<<<< HEAD
=======
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShoppingCartPage from './page/ShoppingCartPage';
import ConfirmOrderPage from './page/ConfirmOrderPage';

>>>>>>> f73e360 (feat: 주문 확인 페이지 및 페이지간 이동 구현)
=======
>>>>>>> ad132e3 (refactor:페이지별로 맡는 역할 재분배)
import './App.css';
import './reset.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ENDPOINTS from './constants/endpoints';
import OrderConfirmationPage from './page/OrderConfirmationPage/OrderConfrimationPage';
import OrderLastPage from './page/OrderLastPage/OrderLastPage';
import ShoppingCartPage from './page/ShoppingCartPage/ShoppingCartPage';
import { Suspense } from 'react';

<<<<<<< HEAD
import CartItemContainer from './components/CartItemContainer/CartItemContainer';
import FooterButton from './components/FooterButton/FooterButton';
import Header from './components/Header/Header';
import OrderAmount from './components/OrderAmount/OrderAmount';
import { Suspense } from 'react';
import TitleContainer from './components/TitleContainer/TitleContainer';
import { hasCheckedItemsState } from './recoil/selectors';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

function App() {
  const hasCheckedItems = useRecoilValue(hasCheckedItemsState);
=======
const router = createBrowserRouter([
  {
    path: ENDPOINTS.shoppingCart,
    element: <ShoppingCartPage />,
  },
  {
    path: ENDPOINTS.orderConfirmation,
    element: (
      <Suspense>
        <OrderConfirmationPage />
      </Suspense>
    ),
  },
  {
    path: ENDPOINTS.lastPage,
    element: (
      <Suspense>
        <OrderLastPage />
      </Suspense>
    ),
  },
]);
>>>>>>> f73e360 (feat: 주문 확인 페이지 및 페이지간 이동 구현)

export default function App() {
  return <RouterProvider router={router} />;
}
