import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import ShoppingCart from './components/pages/ShoppingCart/ShoppingCart';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';
import PaymentConfirmation from './components/pages/PaymentConfirmation/PaymentConfirmation';
import OrderConfirmation from './components/pages/OrderConfirmation/OrderConfirmation';

import CONDITION from './constants/Condition';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path={CONDITION.shoppingCartPage} element={<ShoppingCart />} />
        <Route
          path={CONDITION.orderConfirmationPage}
          element={<OrderConfirmation />}
        />
        <Route
          path={CONDITION.paymentConfirmationPage}
          element={<PaymentConfirmation />}
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
