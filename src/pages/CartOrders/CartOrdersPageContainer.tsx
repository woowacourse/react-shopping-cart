import CartOrdersPageLoader from './CartOrdersPageLoader';
import CartOrdersPage from './CartOrdersPage';
import ErrorBoundaryForRerenderChildren from '../ErrorBoundaryForRerenderChildren';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';

const CartOrdersPageContainer = () => {
  return (
    <ErrorBoundaryForRerenderChildren FallbackComponent={ErrorComponent}>
      <CartOrdersPageLoader>
        <CartOrdersPage />
      </CartOrdersPageLoader>
    </ErrorBoundaryForRerenderChildren>
  );
};

export default CartOrdersPageContainer;
