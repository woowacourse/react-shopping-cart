import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import CartOrdersPageLoader from './CartOrdersPageLoader';
import CartOrdersPage from './CartOrdersPage';

const CartOrdersPageContainer = () => {
  const onReset = () => {
    window.location.reload();
  };

  return (
    <ErrorBoundary onReset={onReset} FallbackComponent={({ error }) => ErrorComponent({ error, onReset: onReset })}>
      <CartOrdersPageLoader>
        <CartOrdersPage />
      </CartOrdersPageLoader>
    </ErrorBoundary>
  );
};

export default CartOrdersPageContainer;
