import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import CartOrdersPageLoader from './CartOrdersPageLoader';
import CartOrdersPage from './CartOrdersPage';
import { useState } from 'react';

const CartOrdersPageContainer = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorComponent}>
      <CartOrdersPageLoader>
        <CartOrdersPage />
      </CartOrdersPageLoader>
    </ErrorBoundary>
  );
};

export default CartOrdersPageContainer;
