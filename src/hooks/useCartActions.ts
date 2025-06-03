import { useCallback } from 'react';
import { patchCartItem } from '../api/patchCartItem';
import { deleteCartItem } from '../api/deleteCartItem';
import { useMutation } from './useMutation';
import { useCartItems } from './useCartItems';

interface UpdateQuantityVariables {
  cartItemId: number;
  newQuantity: number;
}

interface RemoveItemVariables {
  cartItemId: number;
}

export function useCartActions() {
  const { fetcher: refetchCart } = useCartItems();

  const updateQuantity = useMutation<void, UpdateQuantityVariables>(
    useCallback(
      async ({ cartItemId, newQuantity }) => {
        if (newQuantity < 1) {
          await deleteCartItem(cartItemId);
          await refetchCart();
          return;
        }
        await patchCartItem(cartItemId, newQuantity);
        await refetchCart();
      },
      [refetchCart]
    )
  );

  const removeItem = useMutation<void, RemoveItemVariables>(
    useCallback(
      async ({ cartItemId }) => {
        await deleteCartItem(cartItemId);
        await refetchCart();
      },
      [refetchCart]
    )
  );

  return { updateQuantity, removeItem };
}
