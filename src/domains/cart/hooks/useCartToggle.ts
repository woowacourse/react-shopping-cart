import { cartItemSelectionStorage } from "../../../storages/CartItemSelectionStorage";
import useCartOperations from "./useCartOperations";
import { useCartState } from "./useCartState";

const useCartToggle = () => {
  const state = useCartState();
  const { dispatch } = useCartOperations();

  const toggleAllSelected = () => {
    const cartIds = state.items.map(({ id }) => id);
    cartItemSelectionStorage.setAllSelections(cartIds, !state.allSelected);
    dispatch({ type: "TOGGLE_ALL_SELECTED" });
  };

  const toggleItemSelected = (cartId: number) => {
    const targetItem = state.items.find((item) => item.id === cartId);
    if (targetItem) {
      cartItemSelectionStorage.setSelection(cartId, !targetItem.selected);
    }
    dispatch({ type: "TOGGLE_ITEM_SELECTED", id: cartId });
  };

  return {
    toggleAllSelected,
    toggleItemSelected,
  };
};

export default useCartToggle;
