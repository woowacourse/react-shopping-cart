import AsyncBoundary from '../../components/AsyncBoundary/AsyncBoundary';
import CartSection from '../../components/CartPage/CartSection/CartSection';
import OrderSection from '../../components/CartPage/OrderSection/OrderSection';
import * as S from './CartPage.styles';

const CartPage = () => {
  return (
    <S.Root>
      <AsyncBoundary>
        <CartSection />
      </AsyncBoundary>
      <AsyncBoundary>
        <OrderSection />
      </AsyncBoundary>
    </S.Root>
  );
};

export default CartPage;
