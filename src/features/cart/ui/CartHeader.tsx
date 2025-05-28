import * as S from './CartHeader.styles';

interface CartHeaderProps {
  cartTypeQuantity: number;
}

export default function CartHeader({ cartTypeQuantity }: CartHeaderProps) {
  return (
    <S.CartHeaderContainer>
      <S.CartHeaderTitle>장바구니</S.CartHeaderTitle>
      {cartTypeQuantity > 0 && (
        <S.CartHeaderContent>{`현재 ${cartTypeQuantity}종류의 상품이 담겨있습니다.`}</S.CartHeaderContent>
      )}
    </S.CartHeaderContainer>
  );
}
