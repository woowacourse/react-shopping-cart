import { ChangeEvent, useCallback } from 'react';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { addToCart, deleteCartItem, updateCartItem } from '../../apis/cart';
import { cartState, selectedItemsState } from '../../atoms/cart';
import { CartItem } from '../../types/cart';
import { waitForMutation } from '../../utils/waitFor';
import { useRefreshableRecoilState } from '../common/useRefreshableAtom';

export const useCartSelector = () => {
  const [cart] = useRefreshableRecoilState(cartState);
  const [selectedItems, setSelectedItems] =
    useRefreshableRecoilState(selectedItemsState);

  const selectItem = useCallback((id: CartItem['id']) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = new Set(prevSelectedItems);

      prevSelectedItems.has(id)
        ? updatedSelectedItems.delete(id)
        : updatedSelectedItems.add(id);

      return updatedSelectedItems;
    });
  }, []);

  const handleSelectDeselectAll = useCallback(
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      checked
        ? setSelectedItems(new Set(cart.map(({ id }) => id)))
        : setSelectedItems(new Set());
    },
    []
  );

  return { selectedItems, selectItem, handleSelectDeselectAll };
};

export const useMutateCart = () => {
  const refresh = useRecoilRefresher_UNSTABLE(cartState);

  const addItemToCartMutation = waitForMutation(addToCart, {
    onSuccess() {
      refresh();
    },
  });

  const updateCartItemMutation = waitForMutation(updateCartItem, {
    onSuccess() {
      refresh();
    },
  });

  const deleteCartItemMutation = waitForMutation(deleteCartItem, {
    onSuccess() {
      refresh();
    },
  });

  return {
    addItemToCartMutation,
    updateCartItemMutation,
    deleteCartItemMutation,
  };
};
