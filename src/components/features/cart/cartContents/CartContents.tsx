import CartList from '../cartList/CartList';
import CartPrice from '../cartPrice/CartPrice';
import CartTitle from '../cartTitle/CartTitle';
import * as S from './CartContents.styles';

function CartContents() {
  return (
    <S.Container>
      <CartTitle />
      <CartList />
      <CartPrice />
    </S.Container>
  );
}

export default CartContents;
