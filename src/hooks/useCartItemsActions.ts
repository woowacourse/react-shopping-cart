// hooks/useCartActions.ts
import { useCallback } from 'react';
import { useCartItemsContext } from '../contexts/CartItemsContext';
import patchCartItems from '../api/patchCartItems';
import deleteCartItems from '../api/deleteCartItems';
import { useErrorToast } from '../contexts/ErrorToastContext';

const useCartActions = () => {
  const { cartItems, refetch } = useCartItemsContext();
  const { showError } = useErrorToast();

  const increaseCartItemQuantity = useCallback(
    async (id: number) => {
      const item = cartItems.find((item) => item.id === id);
      if (!item) return;
      try {
        await patchCartItems(id, item.quantity + 1);
        await refetch();
      } catch (e) {
        showError('장바구니 수량 변경에 실패했습니다.');
      }
    },
    [cartItems, refetch, showError]
  );

  const decreaseCartItemQuantity = useCallback(
    async (id: number) => {
      const item = cartItems.find((item) => item.id === id);
      if (!item) return;
      try {
        if (item.quantity === 1) {
          await deleteCartItems(id);
        } else {
          await patchCartItems(id, item.quantity - 1);
        }
        await refetch();
      } catch (e) {
        showError('장바구니 수량 변경에 실패했습니다.');
      }
    },
    [cartItems, refetch, showError]
  );

  const deleteCartItem = useCallback(
    async (id: number) => {
      const item = cartItems.find((item) => item.id === id);
      if (!item) return;
      try {
        await deleteCartItems(id);
        await refetch();
      } catch (e) {
        showError('장바구니 삭제에 실패했습니다.');
      }
    },
    [cartItems, refetch, showError]
  );

  return {
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    deleteCartItem,
  };
};

export default useCartActions;
