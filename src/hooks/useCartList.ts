import { useEffect, useState } from 'react';
import { CartItemProps } from '../types/cartItem';
import cart from '../apis/cart';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import { useToastContext } from '../context/ToastContext';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

function useCartList() {
  const [cartList, setCartList] = useState<CartItemProps[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { showToast } = useToastContext();
  useEffect(() => {
    loadCartList();
  }, []);

  const loadCartList = async () => {
    setIsLoading(true);
    try {
      const localCartList = getLocalStorage('cartList');
      if (localCartList.length > 0) {
        setCartList(localCartList);
      } else {
        const response = await cart.getCartList();
        setCartList(response);
        setLocalStorage('cartList', response);
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
      setLocalStorage('cartList', increasedCartList);
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
      setLocalStorage('cartList', decreasedCartList);
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
      setLocalStorage('cartList', deletedCartList);
    } catch (error) {
      setError(ERROR_MESSAGE.DELETE_CART_ITEM);
      showToast(ERROR_MESSAGE.DELETE_CART_ITEM);
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
