import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { ROUTES } from '../../shared/constants/routeConstants';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Layout from '../layout/Layout';
import ConfirmationPage from '../../pages/ConfirmationPage/ConfirmationPage';
import CartPage from '../../pages/CartPage/CartPage';
import OrderReviewPage from '../../pages/OrderReview/OrderReviewPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.ROOT} element={<Layout />}>
      <Route path={ROUTES.CART} element={<CartPage />} />
      <Route path={ROUTES.REVIEW} element={<OrderReviewPage />} />
      <Route path={ROUTES.CONFIRMATION} element={<ConfirmationPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  ),
  {
    basename: '/react-shopping-cart',
  }
);
