import * as S from './CartTitle.styles';

interface CartTitleProps {
  quantity?: number;
}

function CartTitle({ quantity = 0 }: CartTitleProps) {
  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      <S.Description>
        {quantity !== 0 && `현재 ${quantity}종류의 상품이 담겨있습니다.`}
      </S.Description>
    </S.Container>
  );
}

export default CartTitle;
