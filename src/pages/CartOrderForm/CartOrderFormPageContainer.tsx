import { ErrorBoundary } from 'react-error-boundary';
import CartOrderFormPageLoader from './CartOrderFormPageLoader';
import CartOrderFormPage from './CartOrderFormPage';
import { useState } from 'react';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';

const CartOrderFormPageContainer = () => {
  const [retryKey, setRetryKey] = useState(0);

  const handleRetry = () => {
    setRetryKey((prevKey) => prevKey + 1);
  };

  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => <ErrorComponent error={error} onRetry={handleRetry} />}
      resetKeys={[retryKey]}
    >
      <CartOrderFormPageLoader key={retryKey}>
        <CartOrderFormPage />
      </CartOrderFormPageLoader>
    </ErrorBoundary>
  );
};

export default CartOrderFormPageContainer;
