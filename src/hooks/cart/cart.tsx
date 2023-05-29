import { ChangeEvent } from 'react';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { addToCart, deleteCartItem, updateCartItem } from '../../apis/cart';
import { cartState, selectedItemsState } from '../../atoms/cart';
import { DELETE_CART_ITEMS } from '../../constants/cart';
import { CartItem } from '../../types/cart';
import { waitFor, waitForMutation } from '../../utils/waitFor';
import {
  useRefreshableRecoilState,
  useRefreshableRecoilValue,
} from '../common/useRefreshableAtom';

export const useCartSelector = () => {
  const cart = useRefreshableRecoilValue(cartState);
  const [selectedItems, setSelectedItems] =
    useRefreshableRecoilState(selectedItemsState);

  const selectItem = (id: CartItem['id']) => {
    setSelectedItems((prevSelectedItems) => new Set(prevSelectedItems).add(id));
  };

  const deselectItem = (id: CartItem['id']) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = new Set(prevSelectedItems);

      return updatedSelectedItems.delete(id)
        ? updatedSelectedItems
        : prevSelectedItems;
    });
  };

  const handleSelectItem = (id: CartItem['id']) =>
    selectedItems.has(id) ? deselectItem(id) : selectItem(id);

  const handleSelectAll = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    checked
      ? setSelectedItems(new Set(cart.map(({ id }) => id)))
      : setSelectedItems(new Set());
  };

  return {
    selectedItems,
    selectItem,
    deselectItem,
    handleSelectItem,
    handleSelectAll,
  };
};

export const useMutateCart = () => {
  const refreshCart = useRecoilRefresher_UNSTABLE(cartState);
  const selectedItems = useRefreshableRecoilValue(selectedItemsState);
  const { deselectItem } = useCartSelector();

  const addItemToCartMutation = waitForMutation(addToCart, {
    onSuccess() {
      refreshCart();
    },
  });

  const updateCartItemMutation = waitForMutation(updateCartItem, {
    onSuccess() {
      refreshCart();
    },
  });

  const deleteCartItemMutation = waitForMutation(deleteCartItem, {
    onSuccess([id]) {
      waitFor(new Promise(refreshCart), {
        onSuccess() {
          deselectItem(id);
        },
      });
    },
  });

  const deleteSelectedCartItems = () => {
    confirm(DELETE_CART_ITEMS) && deleteCartItemMutation([...selectedItems]);
  };

  return {
    addItemToCartMutation,
    updateCartItemMutation,
    deleteCartItemMutation,
    deleteSelectedCartItems,
  };
};
