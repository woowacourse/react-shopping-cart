import { useEffect } from 'react';
import { useCartData, cartActions } from '@entities/cart';

export const useCart = () => {
  const cartData = useCartData();

  const updateItemQuantity = async (id: number, quantity: number) => {
    await cartActions.updateQuantity(cartData, id, quantity);
  };

  const removeItem = async (id: number) => {
    await cartActions.removeItem(cartData, id);
  };

  useEffect(() => {
    cartActions.fetchItems(cartData);
  }, []);

  return {
    cartItems: cartData.items,
    isLoading: cartData.isLoading,
    errorMessage: cartData.errorMessage,
    updateItemQuantity,
    removeItem,
  };
};
