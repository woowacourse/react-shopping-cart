import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MobileLayout from './components/common/MobileLayout/MobileLayout';
import CartPage from './pages/CartPage';
import ConfirmPurchasePage from './pages/ConfirmPurchasePage';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';
import { Suspense } from 'react';

function App() {
  return (
    <BrowserRouter>
      <MobileLayout>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<div>suspense</div>}>
                  <CartPage />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="/confirm-purchase"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<div>suspense</div>}>
                  <ConfirmPurchasePage />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Routes>
      </MobileLayout>
    </BrowserRouter>
  );
}

export default App;
