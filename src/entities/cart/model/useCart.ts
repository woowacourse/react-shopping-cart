import { useEffect } from 'react';
import { CartItemType } from '@entities/cart/type/cartItem.type';
import { getCartItems } from '@entities/cart/api/getCartItems';
import { updateCartItemQuantity } from '@entities/cart/api/updateCartItemQuantity';
import { deleteCartItem } from '@entities/cart/api/deleteCartItem';
import { useDataManager } from '@shared/model/useDataManager';

export const useCart = () => {
  const { state, withErrorHandling } = useDataManager<CartItemType[]>([]);

  const fetchItems = async () => {
    await withErrorHandling(async () => {
      return await getCartItems();
    });
  };

  const updateItemQuantity = (id: number, quantity: number) =>
    withErrorHandling(async () => {
      await updateCartItemQuantity({ id, quantity });
      return state.data.map((item) => (item.id === id ? { ...item, quantity } : item));
    });

  const removeItem = (id: number) =>
    withErrorHandling(async () => {
      await deleteCartItem(id);
      return state.data.filter((item) => item.id !== id);
    });

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items: state.data,
    isLoading: state.isLoading,
    error: state.error,
    updateItemQuantity,
    removeItem,
  };
};
