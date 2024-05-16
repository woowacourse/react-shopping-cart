import { Suspense } from 'react';

import ShoppingCart from './components/pages/ShoppingCart/ShoppingCart';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';

import * as Styled from './components/LoadingFallback/style';
import { Route, Routes } from 'react-router-dom';
import OrderConfirmation from './components/pages/OrderConfirmation/OrderConfirmation';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense
        fallback={<Styled.LoadingMessage>Loading...</Styled.LoadingMessage>}
      >
        <Routes>
          <Route path="/" element={<ShoppingCart />} />
          <Route path="/orderConfirmation" element={<OrderConfirmation />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
