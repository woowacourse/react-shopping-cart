import { createContext, useEffect, useState } from 'react';
import { CartItem } from '../types/cart';
import { getCartItems } from '../api/getCartItems';
import { updateCartItem } from '../api/updateCartItem';

interface CartItemsContextType {
  cartItems: CartItem[];
  fetchCartItems: () => void;
  increaseCartItemQuantity: (cartItemId: number) => void;
  decreaseCartItemQuantity: (cartItemId: number) => void;
}

export const CartItemsContext = createContext<CartItemsContextType | undefined>(undefined);

interface CartItemsProviderProps {
  children: React.ReactNode;
}

export const CartItemsProvider = ({ children }: CartItemsProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCartItems = async () => {
    try {
      const response = await getCartItems();
      setCartItems(response.content);
    } catch (error) {
      if (error instanceof Error) {
        console.error('장바구니 아이템 조회 실패:', error.message);
        alert('장바구니 아이템 조회에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const increaseCartItemQuantity = async (cartItemId: number) => {
    try {
      const targetCartItem = cartItems.find((item) => item.id === cartItemId);
      if (!targetCartItem) return;
      await updateCartItem(cartItemId, targetCartItem.quantity + 1);
      await fetchCartItems();
    } catch (error) {
      if (error instanceof Error) {
        console.error('장바구니 아이템 수량 업데이트 실패:', error.message);
        alert('장바구니 아이템 수량 업데이트에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const decreaseCartItemQuantity = async (cartItemId: number) => {
    try {
      const targetCartItem = cartItems.find((item) => item.id === cartItemId);
      if (!targetCartItem) return;
      await updateCartItem(cartItemId, targetCartItem.quantity - 1);
      await fetchCartItems();
    } catch (error) {
      if (error instanceof Error) {
        console.error('장바구니 아이템 수량 업데이트 실패:', error.message);
        alert('장바구니 아이템 수량 업데이트에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <CartItemsContext.Provider
      value={{ cartItems, fetchCartItems, increaseCartItemQuantity, decreaseCartItemQuantity }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};
