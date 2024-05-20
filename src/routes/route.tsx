import RootErrorBoundary from '@components/common/ErrorBoundary/RootErrorBoundary';
import AppLayout from '@components/layout/AppLayout/AppLayout';
import { OrderConfirmPage, OrderPage } from '@pages/index';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: (
          <RootErrorBoundary>
            <OrderPage />
          </RootErrorBoundary>
        ),
      },
      {
        path: '/confirm',
        element: <OrderConfirmPage />,
      },
    ],
  },
]);

export default router;
