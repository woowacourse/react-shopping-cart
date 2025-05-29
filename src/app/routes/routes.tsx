import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { ROUTES } from '../../shared/constants/routeConstants';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import App from '../../pages/CartPage/App';
import Layout from '../layout/Layout';
import ConfirmationPage from '../../pages/ConfirmationPage/ConfirmationPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.ROOT} element={<Layout />}>
      <Route path={ROUTES.CART} element={<App />} />
      <Route path={ROUTES.CONFIRMATION} element={<ConfirmationPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  ),
  {
    basename: import.meta.env.BASE_URL,
  }
);
