import { useEffect, useState } from 'react';
import * as S from './CartItemQuantitySelector.styles';
import { CartItem } from '../../../shared/type/cart';
import { updateCartItem } from '../api/updateCartItem';

interface CartItemQuantitySelectorProps {
  cartItem: CartItem;
  quantity: number;
  isSelected: boolean;
  updateSelectedCartItem: (item: CartItem, updatedQuantity: number) => void;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function CartItemQuantitySelector({
  isSelected,
  updateSelectedCartItem,
  cartItem,
  quantity,
  setCartItems,
}: CartItemQuantitySelectorProps) {
  const [cartQuantity, setCartQuantity] = useState<number>(quantity);

  useEffect(() => {
    updateToRecentCartItems({
      setCartItems,
      cartItem,
      cartQuantity,
    });

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
      <S.CartItemQuantityNumber>{cartQuantity}</S.CartItemQuantityNumber>
      <S.CartItemQuantitySelectorButton onClick={handleQuantityPlus}>+</S.CartItemQuantitySelectorButton>
    </S.CartItemQuantityContainer>
  );
}

function updateToRecentCartItems({
  setCartItems,
  cartItem,
  cartQuantity,
}: {
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartItem: CartItem;
  cartQuantity: number;
}) {
  setCartItems((prevItems) => {
    const existingItemIndex = prevItems.findIndex((item) => item.id === cartItem.id);
    if (existingItemIndex > -1) {
      const updatedItems = [...prevItems];
      updatedItems[existingItemIndex].quantity = cartQuantity;
      return updatedItems;
    }
    return [...prevItems, { ...cartItem, quantity: cartQuantity }];
  });
}
