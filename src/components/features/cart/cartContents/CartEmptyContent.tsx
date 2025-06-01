import CartTitle from '../cartTitle/CartTitle';
import * as S from './CartContents.styles';

function CartEmptyContent() {
  return (
    <S.Container>
      <CartTitle />
      <S.EmptyCart>장바구니에 담은 상품이 없습니다.</S.EmptyCart>
    </S.Container>
  );
}

export default CartEmptyContent;
