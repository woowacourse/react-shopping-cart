import ShoppingCart from './components/pages/ShoppingCartPage/ShoppingCart';
import { ErrorBoundary } from 'react-error-boundary';

import { Route, Routes } from 'react-router-dom';
import OrderConfirmation from './components/pages/OrderConfirmationPage/OrderConfirmation';
import { ROUTE } from './constant/route';
import BuyItems from './components/pages/BuyItemsPage/BuyItems';
import ErrorFallback from './components/pages/ErrorFallbackPage/ErrorFallback';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path={ROUTE.cart.path} element={<ShoppingCart />} />
        <Route
          path={ROUTE.orderConfirmation.path}
          element={<OrderConfirmation />}
        />
        <Route path={ROUTE.buyItem.path} element={<BuyItems />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
