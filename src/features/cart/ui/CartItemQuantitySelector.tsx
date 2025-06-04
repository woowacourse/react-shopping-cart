import * as S from './CartItemQuantitySelector.styles';
import { CartItem } from '../api/types/cart';
import { updateCartItem } from '../api/updateCartItem';
import { useCartContext } from '../../../shared/context/useCartContext';

interface CartItemQuantitySelectorProps {
  cartItem: CartItem;
  isSelected: boolean;
}

export default function CartItemQuantitySelector({ cartItem }: CartItemQuantitySelectorProps) {
  const { updateCartItemQuantity } = useCartContext();

  const handleCartItemQuantityUpdate = async (id: number, quantity: number) => {
    try {
      await updateCartItem(id, quantity);
    } catch (error) {
      if (error instanceof Error) {
        console.error('장바구니 아이템 수량 업데이트 실패:', error.message);
        alert('장바구니 아이템 수량 업데이트에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleQuantityMinus = () => {
    if (cartItem.quantity > 1) {
      const newQuantity = cartItem.quantity - 1;
      updateCartItemQuantity(cartItem, newQuantity);
      handleCartItemQuantityUpdate(cartItem.id, newQuantity);
    }
  };

  const handleQuantityPlus = () => {
    const newQuantity = cartItem.quantity + 1;
    updateCartItemQuantity(cartItem, newQuantity);
    handleCartItemQuantityUpdate(cartItem.id, newQuantity);
  };

  return (
    <S.CartItemQuantityContainer>
      <S.CartItemQuantitySelectorButton onClick={handleQuantityMinus}>-</S.CartItemQuantitySelectorButton>
      <S.CartItemQuantityNumber data-testid='card-item-quantity'>{cartItem.quantity}</S.CartItemQuantityNumber>
      <S.CartItemQuantitySelectorButton onClick={handleQuantityPlus}>+</S.CartItemQuantitySelectorButton>
    </S.CartItemQuantityContainer>
  );
}
