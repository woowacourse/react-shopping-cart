import ShoppingCart from './components/pages/ShoppingCart/ShoppingCart';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';

import { Route, Routes } from 'react-router-dom';
import OrderConfirmation from './components/pages/OrderConfirmation/OrderConfirmation';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path="/" element={<ShoppingCart />} />
        <Route path="/orderConfirmation" element={<OrderConfirmation />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
