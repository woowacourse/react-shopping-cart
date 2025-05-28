import * as S from './CartTitle.styles';

interface CartTitleProps {
  cartItemsQuantity?: number;
}

function CartTitle({ cartItemsQuantity = 0 }: CartTitleProps) {
  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      <S.Description>
        {cartItemsQuantity !== 0 &&
          `현재 ${cartItemsQuantity}종류의 상품이 담겨있습니다.`}
      </S.Description>
    </S.Container>
  );
}

export default CartTitle;
