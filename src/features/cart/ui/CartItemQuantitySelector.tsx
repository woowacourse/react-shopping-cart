import * as S from './CartItemQuantitySelector.styles';

export default function CartItemQuantitySelector({ quantity }: { quantity: number }) {
  return (
    <S.CartItemQuantityContainer>
      <S.CartItemQuantitySelectorButton>-</S.CartItemQuantitySelectorButton>
      <S.CartItemQuantityNumber>{quantity}</S.CartItemQuantityNumber>
      <S.CartItemQuantitySelectorButton>+</S.CartItemQuantitySelectorButton>
    </S.CartItemQuantityContainer>
  );
}
