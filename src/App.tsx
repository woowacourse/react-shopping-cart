import ShoppingCart from './components/pages/ShoppingCart/ShoppingCart';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';

import { Route, Routes } from 'react-router-dom';
import PaymentConfirmation from './components/pages/PaymentConfirmation/PaymentConfirmation';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path="/" element={<ShoppingCart />} />
        <Route path="/paymentConfirmation" element={<PaymentConfirmation />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
