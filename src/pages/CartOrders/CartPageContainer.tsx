import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import CartPageLoader from './CartPageLoader';
import CartPage from './CartPage';
import { useState } from 'react';

const CartPageContainer = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorComponent}>
      <CartPageLoader>
        <CartPage />
      </CartPageLoader>
    </ErrorBoundary>
  );
};

export default CartPageContainer;
