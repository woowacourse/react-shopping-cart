import { useEffect, useState } from 'react';
import { CartItemProps } from '../types/cartItem';
import cart from '../apis/cart';
import { ERROR_MESSAGE } from '../constants/errorMessage';

function useCartList() {
  const [cartList, setCartList] = useState<CartItemProps[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCartList();
  }, []);

  const loadCartList = async () => {
    setIsLoading(true);
    try {
      const response = await cart.getCartList();
      setCartList(response);
    } catch (error) {
      setError(ERROR_MESSAGE.CART_LIST);
    } finally {
      setIsLoading(false);
    }
  };

  const increaseCartItem = async (cartItem: CartItemProps) => {
    try {
      await cart.increaseCartItem(cartItem);
      setCartList(
        cartList.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      setError(ERROR_MESSAGE.INCREASE_CART_ITEM);
    }
  };

  const decreaseCartItem = async (cartItem: CartItemProps) => {
    try {
      await cart.decreaseCartItem(cartItem);
      setCartList(
        cartList.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (error) {
      setError(ERROR_MESSAGE.DECREASE_CART_ITEM);
    }
  };

  const deleteCartItem = async (cartItemId: number) => {
    try {
      await cart.deleteCartItem(cartItemId);
      setCartList(cartList.filter((item) => item.id !== cartItemId));
    } catch (error) {
      setError(ERROR_MESSAGE.DELETE_CART_ITEM);
    }
  };

  return {
    data: cartList,
    error,
    isLoading,
    increaseCartItem,
    decreaseCartItem,
    deleteCartItem,
  };
}

export default useCartList;
