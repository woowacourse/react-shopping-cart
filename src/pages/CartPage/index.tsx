import CartList from '../../components/CartPage/CartList';
import OrderDetail from '../../components/CartPage/OrderDetail';
import * as S from './CartPage.styles';

const CartPage = () => {
  return (
    <S.PageWrapper>
      <CartList />
      <OrderDetail />
    </S.PageWrapper>
  );
};

export default CartPage;
