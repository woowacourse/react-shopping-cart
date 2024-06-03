import CartOrderFormPageLoader from './CartOrderFormPageLoader';
import CartOrderFormPage from './CartOrderFormPage';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import { ErrorBoundary } from 'react-error-boundary';

const CartOrderFormPageContainer = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorComponent}>
      <CartOrderFormPageLoader>
        <CartOrderFormPage />
      </CartOrderFormPageLoader>
    </ErrorBoundary>
  );
};

export default CartOrderFormPageContainer;
