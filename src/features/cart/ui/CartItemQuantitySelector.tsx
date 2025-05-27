import * as S from './CartItemQuantitySelector.styles';

export default function CartItemQuantitySelector() {
  return (
    <S.CartItemQuantityContainer>
      <S.CartItemQuantitySelectorButton>-</S.CartItemQuantitySelectorButton>
      <S.CartItemQuantityNumber>1</S.CartItemQuantityNumber>
      <S.CartItemQuantitySelectorButton>+</S.CartItemQuantitySelectorButton>
    </S.CartItemQuantityContainer>
  );
}
