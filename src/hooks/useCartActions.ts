import { useCallback } from 'react';
import { useToast } from './useToast';
import { patchCartItem } from '../api/patchCartItem';
import { useMutation } from './useMutation';
import { deleteCartItem } from '../api/deleteCartItem';
import { useCartItems } from './useCartItems';

interface UpdateQuantityVars {
  cartItemId: number;
  newQuantity: number;
}

interface RemoveItemVars {
  cartItemId: number;
}

export function useCartActions() {
  const { addToast } = useToast();
  const { fetcher: refetchCart } = useCartItems();

  const updateQuantity = useMutation<void, UpdateQuantityVars>(
    useCallback(
      async ({ cartItemId, newQuantity }) => {
        if (newQuantity < 1) await deleteCartItem(cartItemId);
        else await patchCartItem(cartItemId, newQuantity);
        await refetchCart();
      },
      [refetchCart]
    )
  );

  const removeItem = useMutation<void, RemoveItemVars>(
    useCallback(
      async ({ cartItemId }) => {
        await deleteCartItem(cartItemId);
        await refetchCart();
      },
      [refetchCart]
    )
  );

  const changeQuantity = useCallback(
    async ({ cartItemId, newQuantity }: UpdateQuantityVars) => {
      try {
        await updateQuantity.mutate({ cartItemId, newQuantity });
        addToast({ message: '수량 변경이 완료되었습니다.', type: 'success' });
      } catch (err) {
        addToast({
          message: err instanceof Error ? err.message : '수량 변경 중 알 수 없는 오류가 발생했습니다.',
          type: 'error'
        });
      }
    },
    [updateQuantity, addToast]
  );

  const deleteCart = useCallback(
    async ({ cartItemId }: RemoveItemVars) => {
      try {
        await removeItem.mutate({ cartItemId });
        addToast({ message: '상품 삭제가 완료되었습니다.', type: 'success' });
      } catch (err) {
        addToast({
          message: err instanceof Error ? err.message : '상품 삭제 중 알 수 없는 오류가 발생했습니다.',
          type: 'error'
        });
      }
    },
    [removeItem, addToast]
  );

  return {
    changeQuantity,
    deleteCart,
    isChanging: updateQuantity.isLoading,
    isDeleting: removeItem.isLoading
  };
}
