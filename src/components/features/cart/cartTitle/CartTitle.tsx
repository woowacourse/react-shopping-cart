import * as S from './CartTitle.styles';

interface CartTitleProps {
  uniqueProductCount?: number;
}

function CartTitle({ uniqueProductCount = 0 }: CartTitleProps) {
  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      <S.Description>
        {uniqueProductCount !== 0 &&
          `현재 ${uniqueProductCount}종류의 상품이 담겨있습니다.`}
      </S.Description>
    </S.Container>
  );
}

export default CartTitle;
