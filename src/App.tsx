import { Suspense } from 'react';

import styled from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CartPage from './pages/CartPage';
import ConfirmPurchasePage from './pages/ConfirmPurchasePage';
import CompletePurchasePage from './pages/CompletePurchasePage';
import ErrorFallback from './components/ErrorFallback/ErrorFallback';
import LoadingFallback from './components/LoadingFallback/LoadingFallback';

const AppContainer = styled.div`
  max-width: 768px;
  width: 100%;
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<CartPage />} />
              <Route
                path="/confirm-purchase"
                element={<ConfirmPurchasePage />}
              />
              <Route
                path="/complete-purchase"
                element={<CompletePurchasePage />}
              />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
