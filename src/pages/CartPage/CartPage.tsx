import AsyncBoundary from '../../components/AsyncBoundary/AsyncBoundary';
import CartSection from '../../components/CartPage/CartSection/CartSection';
import OrderAside from '../../components/CartPage/OrderAside/OrderAside';
import Loading from '../../components/common/Loading/Loading';
import * as S from './CartPage.styles';

const CartPage = () => {
  return (
    <AsyncBoundary loadingFallback={<Loading />}>
      <S.Root>
        <CartSection />
        <OrderAside />
      </S.Root>
    </AsyncBoundary>
  );
};

export default CartPage;
