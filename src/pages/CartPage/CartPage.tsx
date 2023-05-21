import AsyncBoundary from '../../components/AsyncBoundary/AsyncBoundary';
import CartSection from '../../components/CartPage/CartSection/CartSection';

const CartPage = () => {
  return (
    <AsyncBoundary>
      <CartSection />
    </AsyncBoundary>
  );
};

export default CartPage;
