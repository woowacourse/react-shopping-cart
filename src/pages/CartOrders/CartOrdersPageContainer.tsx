import CartOrdersPageLoader from './CartOrdersPageLoader';
import CartOrdersPage from './CartOrdersPage';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import { ErrorBoundary } from 'react-error-boundary';

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
