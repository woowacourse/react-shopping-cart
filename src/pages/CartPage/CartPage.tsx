import AsyncBoundary from '../../components/AsyncBoundary/AsyncBoundary';
import CartSection from '../../components/CartPage/CartSection/CartSection';
import OrderSection from '../../components/CartPage/OrderSection/OrderSection';
import Loading from '../../components/common/Loading/Loading';
import * as S from './CartPage.styles';

const CartPage = () => {
  return (
    <AsyncBoundary loadingFallback={<Loading />}>
      <S.Root>
        <CartSection />
        <OrderSection />
      </S.Root>
    </AsyncBoundary>
  );
};

export default CartPage;
