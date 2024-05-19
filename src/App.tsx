import ShoppingCart from './components/pages/ShoppingCart/ShoppingCart';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';

import { Route, Routes } from 'react-router-dom';
import OrderConfirmation from './components/pages/OrderConfirmation/OrderConfirmation';
import { ROUTE } from './constant/route';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path={ROUTE.cart.path} element={<ShoppingCart />} />
        <Route
          path={ROUTE.orderConfirmation.path}
          element={<OrderConfirmation />}
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
