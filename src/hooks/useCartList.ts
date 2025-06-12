import { useEffect, useState } from 'react';
import { CartItemProps } from '../types/cartItem';
import cart from '../apis/cart';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import { useToastContext } from '../context/ToastContext';
import useStorageState from './useStorageState';

function useCartList() {
  const [cartList, setCartList] = useStorageState<CartItemProps[]>(
    'cartList',
    []
  );
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { showToast } = useToastContext();
  useEffect(() => {
    loadCartList();
  }, []);

  const loadCartList = async () => {
    setIsLoading(true);
    try {
      if (cartList.length === 0) {
        const response = await cart.getCartList();
        setCartList(response);
      }
    } catch (error) {
      setError(ERROR_MESSAGE.CART_LIST);
      showToast(ERROR_MESSAGE.CART_LIST);
    } finally {
      setIsLoading(false);
    }
  };

  const increaseCartItem = async (cartItem: CartItemProps) => {
    try {
      await cart.increaseCartItem(cartItem);
      const increasedCartList = cartList.map((item) =>
        item.id === cartItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartList(increasedCartList);
    } catch (error) {
      setError(ERROR_MESSAGE.INCREASE_CART_ITEM);
      showToast(ERROR_MESSAGE.INCREASE_CART_ITEM);
    }
  };

  const decreaseCartItem = async (cartItem: CartItemProps) => {
    try {
      await cart.decreaseCartItem(cartItem);
      const decreasedCartList = cartList.map((item) =>
        item.id === cartItem.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCartList(decreasedCartList);
    } catch (error) {
      setError(ERROR_MESSAGE.DECREASE_CART_ITEM);
      showToast(ERROR_MESSAGE.DECREASE_CART_ITEM);
    }
  };

  const deleteCartItem = async (cartItemId: number) => {
    try {
      await cart.deleteCartItem(cartItemId);
      const deletedCartList = cartList.filter((item) => item.id !== cartItemId);
      setCartList(deletedCartList);
    } catch (error) {
      setError(ERROR_MESSAGE.DELETE_CART_ITEM);
      showToast(ERROR_MESSAGE.DELETE_CART_ITEM);
    }
  };

  return {
    data: cartList,
    setCartList,
    error,
    isLoading,
    increaseCartItem,
    decreaseCartItem,
    deleteCartItem,
  };
}

export default useCartList;
