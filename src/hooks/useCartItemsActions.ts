// hooks/useCartActions.ts
import { useCallback } from 'react';
import { useCartItemsContext } from '../contexts/CartItemsContext';
import patchCartItems from '../api/patchCartItems';
import deleteCartItems from '../api/deleteCartItems';

const useCartActions = () => {
  const { cartItems, refetch } = useCartItemsContext();

  const increaseCartItemQuantity = useCallback(
    async (id: number) => {
      const item = cartItems.find((item) => item.id === id);
      if (!item) return;

      await patchCartItems(id, item.quantity + 1);
      await refetch();
    },
    [cartItems, refetch]
  );

  const decreaseCartItemQuantity = useCallback(
    async (id: number) => {
      const item = cartItems.find((item) => item.id === id);
      if (!item) return;

      if (item.quantity === 1) {
        await deleteCartItems(id);
      } else {
        await patchCartItems(id, item.quantity - 1);
      }

      await refetch();
    },
    [cartItems, refetch]
  );

  const deleteCartItem = useCallback(
    async (id: number) => {
      const item = cartItems.find((item) => item.id === id);
      if (!item) return;

      await deleteCartItems(id);
      await refetch();
    },
    [cartItems, refetch]
  );

  return {
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    deleteCartItem,
  };
};

export default useCartActions;
