import { ErrorBoundary } from 'react-error-boundary';
import CartOrderFormPageLoader from './CartOrderFormPageLoader';
import CartOrderFormPage from './CartOrderFormPage';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';

const CartOrderFormPageContainer = () => {
  const onReset = () => {
    window.location.reload();
  };

  return (
    <ErrorBoundary FallbackComponent={({ error }) => <ErrorComponent error={error} onReset={onReset} />}>
      <CartOrderFormPageLoader>
        <CartOrderFormPage />
      </CartOrderFormPageLoader>
    </ErrorBoundary>
  );
};

export default CartOrderFormPageContainer;
