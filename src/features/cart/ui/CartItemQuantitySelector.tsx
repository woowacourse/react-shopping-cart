import { useEffect, useState } from 'react';
import * as S from './CartItemQuantitySelector.styles';
import { CartItem } from '../../../shared/types/cart';
import { updateCartItem } from '../api/updateCartItem';
import { useCartContext } from '../../../shared/context/useCartContext';

interface CartItemQuantitySelectorProps {
  cartItem: CartItem;
  quantity: number;
  isSelected: boolean;
}

export default function CartItemQuantitySelector({ isSelected, cartItem, quantity }: CartItemQuantitySelectorProps) {
  const { updateCartItemQuantity, updateSelectedCartItem } = useCartContext();
  const [cartQuantity, setCartQuantity] = useState<number>(quantity);

  useEffect(() => {
    updateCartItemQuantity(cartItem, cartQuantity);

    if (isSelected) {
      updateSelectedCartItem(cartItem, cartQuantity);
    }

    const handleCartItemQuantityUpdate = async () => {
      try {
        await updateCartItem(cartItem.id, cartQuantity);
      } catch (error) {
        if (error instanceof Error) {
          console.error('장바구니 아이템 수량 업데이트 실패:', error.message);
          alert('장바구니 아이템 수량 업데이트에 실패했습니다. 다시 시도해주세요.');
        }
      }
    };

    handleCartItemQuantityUpdate();
  }, [cartQuantity]);

  const handleQuantityMinus = () => {
    if (cartQuantity > 1) {
      setCartQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityPlus = () => {
    setCartQuantity((prev) => prev + 1);
  };

  return (
    <S.CartItemQuantityContainer>
      <S.CartItemQuantitySelectorButton onClick={handleQuantityMinus}>-</S.CartItemQuantitySelectorButton>
      <S.CartItemQuantityNumber data-testid='card-item-quantity'>{cartQuantity}</S.CartItemQuantityNumber>
      <S.CartItemQuantitySelectorButton onClick={handleQuantityPlus}>+</S.CartItemQuantitySelectorButton>
    </S.CartItemQuantityContainer>
  );
}
