import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import ConfirmPurchasePage from './pages/ConfirmPurchasePage';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';
import { Suspense } from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 768px;
  width: 100%;
`

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
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
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
