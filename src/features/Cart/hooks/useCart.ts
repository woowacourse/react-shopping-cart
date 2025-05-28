import { useState } from 'react';
import { CartItem } from '../types/Cart.types';
import { deleteCartItem, getCartItemList, updateCartItem } from '@/api/cart';
import { useFetchData } from '@/shared/hooks/useFetchData';

export const useCart = () => {
  const cart = useFetchData<CartItem[]>({
    autoFetch: getCartItemList,
  });
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const cartItems = cart.data?.map((item) => ({
    ...item,
    isChecked: checkedItems.has(item.id),
  }));

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
      const newSet = new Set<number>();
      if (prev.size === cart.data?.length) {
        return newSet;
      }

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

  return { cartItems, toggleCheck, toggleAllCheck, updateQuantity, removeCartItem };
};
