import CartItem from '../cartItem/CartItem';
import CartTitle from '../cartTitle/CartTitle';
import * as S from './CartContents.styles';

function CartContents() {
  return (
    <S.Container>
      <CartTitle />
      <CartItem />
    </S.Container>
  );
}

export default CartContents;
