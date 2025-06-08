import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { ROUTES } from '../../shared/constants/routeConstants';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import CartPage from '../../pages/CartPage/CartPage';
import Layout from '../layout/Layout';
import OrderSuccessPage from '../../pages/OrderSuccessPage/OrderSuccessPage';
import OrderConfirmationPage from '../../pages/OrderConfirmationPage/OrderConfirmationPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.ROOT} element={<Layout />}>
      <Route index element={<CartPage />} />
      <Route path={ROUTES.ORDER_CONFIRMATION} element={<OrderConfirmationPage />} />
      <Route path={ROUTES.ORDER_SUCCESS} element={<OrderSuccessPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  ),
  {
    basename: import.meta.env.BASE_URL,
  }
);
