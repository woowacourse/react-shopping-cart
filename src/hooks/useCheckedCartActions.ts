import { useCallback } from 'react';
import { CartItem } from '../types';
import getIdsFromCartItems from '../utils/getIdsFromCartItems';
import { useCheckedCartItemsContext } from '../contexts/CheckedCartItemContext';
import useCartActions from './useCartItemsActions';
import { useCartItemsContext } from '../contexts/CartItemsContext';

const useCheckedCartActions = () => {
  const { cartItems } = useCartItemsContext();
  const { deleteCartItem } = useCartActions();
  const { checkedCartIds, setCheckedCartIds } = useCheckedCartItemsContext();

  const addCheckedCartItem = useCallback(
    (id: number) => {
      if (!checkedCartIds.includes(id)) {
        setCheckedCartIds((prev) => [...prev, id]);
      }
    },
    [checkedCartIds, setCheckedCartIds]
  );

  const removeCheckedCartItem = useCallback(
    (id: number) => {
      setCheckedCartIds((prev) => prev.filter((itemId) => itemId !== id));
    },
    [setCheckedCartIds]
  );

  const init = useCallback(
    (cartItems: CartItem[]) => {
      setCheckedCartIds(getIdsFromCartItems(cartItems));
    },
    [setCheckedCartIds]
  );

  const isAllChecked =
    cartItems.length > 0 && checkedCartIds.length === cartItems.length;

  const toggleAllChecked = useCallback(() => {
    if (isAllChecked) init([]);
    else init(cartItems);
  }, [isAllChecked, init, cartItems]);

  const deleteCheckedCartItem = useCallback(
    (id: number) => {
      deleteCartItem(id);
      removeCheckedCartItem(id);
    },
    [deleteCartItem, removeCheckedCartItem]
  );

  return {
    init,
    addCheckedCartItem,
    removeCheckedCartItem,
    toggleAllChecked,
    deleteCheckedCartItem,
  };
};

export default useCheckedCartActions;
