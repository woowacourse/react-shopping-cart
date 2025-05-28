import { useEffect, useRef, useState } from 'react';

import { deleteCartItem, getCartItemList, updateCartItem } from '@/api/cart';
import { useFetchData } from '@/shared/hooks/useFetchData';

import { CartItem } from '../types/Cart.types';

export const useCart = () => {
  const cart = useFetchData<CartItem[]>({ autoFetch: getCartItemList });
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (cart.data && cart.data.length > 0 && !hasInitialized.current) {
      setCheckedItems(new Set(cart.data.map((item) => item.id)));
      hasInitialized.current = true;
    }
  }, [cart.data, checkedItems.size]);

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleAllCheck = () => {
    setCheckedItems((prev) => {
      if (prev.size === cart.data?.length) {
        return new Set<number>();
      }

      const newSet = new Set<number>();
      cart.data?.forEach((item) => newSet.add(item.id));
      return newSet;
    });
  };

  const updateQuantity = async (cartId: number, newQuantity: number) => {
    try {
      await cart.mutate(
        () => updateCartItem({ cartId: cartId, newQuantity: newQuantity }),
        getCartItemList
      );
    } catch (error) {
      const errorResponse = (error as Error)?.message;
      console.error(errorResponse);
    }
  };

  const removeCartItem = async (id: number) => {
    try {
      await cart.mutate(() => deleteCartItem(id), getCartItemList);
      setCheckedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };

  const cartItems = cart.data?.map((item) => ({
    ...item,
    isChecked: checkedItems.has(item.id),
  }));

  return { cartItems: cartItems, toggleCheck, toggleAllCheck, updateQuantity, removeCartItem };
};
