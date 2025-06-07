import { useCallback, useContext } from "react";
import { CartDispatchContext } from "../contexts/CartContext";
import useErrorHandler from "../../../hooks/useErrorHandler";
import { cartItemSelectionStorage } from "../../../storages/CartItemSelectionStorage";
import { getCartItems } from "../apis/getCartItems";
import { deleteCartItem } from "../apis/deleteCartItem";
import { patchCartItem } from "../apis/patchCartItem";

const useCartOperations = () => {
  const dispatch = useContext(CartDispatchContext);
  const { handleError } = useErrorHandler();

  if (!dispatch) {
    throw new Error("useCartOperations must be used within CartProvider");
  }

  const fetchData = useCallback(async () => {
    try {
      const INITIAL_SELECTED = false;
      const items = await getCartItems();
      const itemsWithSelection = items.map((item) => ({
        ...item,
        selected:
          cartItemSelectionStorage.isItemSelected(item.id) || INITIAL_SELECTED,
      }));

      dispatch({ type: "REPLACE_ITEMS", items: itemsWithSelection });
    } catch (error) {
      handleError(error);
    }
  }, [dispatch, handleError]);

  const deleteItem = useCallback(
    async (cartId: number) => {
      try {
        await deleteCartItem(cartId);
        cartItemSelectionStorage.removeSelection(cartId);
      } catch (error) {
        handleError(error);
      }
      fetchData();
    },
    [fetchData, handleError]
  );

  const updateItemQuantity = useCallback(
    async (cartId: number, newQuantity: number) => {
      try {
        await patchCartItem({
          cartId,
          quantity: newQuantity,
        });
      } catch (error) {
        handleError(error);
      }
      fetchData();
    },
    [fetchData, handleError]
  );

  return {
    dispatch,
    fetchData,
    deleteItem,
    updateItemQuantity,
  };
};

export default useCartOperations;
