import CartOrderFormPageLoader from './CartOrderFormPageLoader';
import CartOrderFormPage from './CartOrderFormPage';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import ErrorBoundaryForRerenderChildren from '../ErrorBoundaryForRerenderChildren';

const CartOrderFormPageContainer = () => {
  return (
    <ErrorBoundaryForRerenderChildren FallbackComponent={ErrorComponent}>
      <CartOrderFormPageLoader>
        <CartOrderFormPage />
      </CartOrderFormPageLoader>
    </ErrorBoundaryForRerenderChildren>
  );
};

export default CartOrderFormPageContainer;
