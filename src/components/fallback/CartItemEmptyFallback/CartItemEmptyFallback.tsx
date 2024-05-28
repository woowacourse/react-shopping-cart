import * as S from './styled';

const CartItemEmptyFallback = () => {
  return (
    <S.Container>
      <S.Message>장바구니에 담은 상품이 없습니다.</S.Message>
    </S.Container>
  );
};

export default CartItemEmptyFallback;
