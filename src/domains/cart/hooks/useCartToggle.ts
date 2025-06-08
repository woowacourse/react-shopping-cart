import { cartItemSelectionStorage } from "../../../storages/CartItemSelectionStorage";
import { CART_ACTION_TYPES } from "./../types/cartAction";
import useCartOperations from "./useCartOperations";
import { useCartState } from "./useCartState";

const useCartToggle = () => {
  const state = useCartState();
  const { dispatch } = useCartOperations();

  const toggleAllSelected = () => {
    const cartIds = state.items.map(({ id }) => id);
    cartItemSelectionStorage.setAllSelections(cartIds, !state.allSelected);
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_ALL_SELECTED });
  };

  const toggleItemSelected = (cartId: number) => {
    const targetItem = state.items.find((item) => item.id === cartId);
    if (targetItem) {
      cartItemSelectionStorage.setSelection(cartId, !targetItem.selected);
    }
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_ITEM_SELECTED, id: cartId });
  };

  return {
    toggleAllSelected,
    toggleItemSelected,
  };
};

export default useCartToggle;
