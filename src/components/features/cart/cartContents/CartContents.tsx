import CartList from '../cartList/CartList';
import CartTitle from '../cartTitle/CartTitle';
import * as S from './CartContents.styles';

function CartContents() {
  return (
    <S.Container>
      <CartTitle />
      <CartList />
    </S.Container>
  );
}

export default CartContents;
