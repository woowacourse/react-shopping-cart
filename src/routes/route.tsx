import ErrorFallback from '@components/common/ErrorBoundary/ErrorFallback/ErrorFallback';
import RootErrorBoundary from '@components/common/ErrorBoundary/RootErrorBoundary';
import AppLayout from '@components/layout/AppLayout/AppLayout';
import { OrderConfirmPage, PaymentConfirmPage, ShoppingCartPage } from '@pages/index';
import { ROUTE_PATHS } from '@routes/route.constant';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: ROUTE_PATHS.root,
        element: (
          <RootErrorBoundary
            fallback={<ErrorFallback onResetError={() => window.location.reload()} statusCode={500} />}
          >
            <ShoppingCartPage />
          </RootErrorBoundary>
        ),
      },
      {
        path: ROUTE_PATHS.orderConfirm,
        element: (
          <RootErrorBoundary
            fallback={<ErrorFallback onResetError={() => window.location.reload()} statusCode={500} />}
          >
            <OrderConfirmPage />
          </RootErrorBoundary>
        ),
      },
      {
        path: ROUTE_PATHS.paymentConfirm,
        element: <PaymentConfirmPage />,
      },
    ],
  },
]);

export default router;
