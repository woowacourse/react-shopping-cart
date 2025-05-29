import { useCartDispatch } from "../stores/CartContext";
import { useSelectContext, useSelectDispatch } from "../stores/SelectContext";
import updateCartItemApi from "../api/updateCartItemApi";
import { ResponseCartItem } from "../types/types";

interface UseCartItemManagerProps {
  cart: ResponseCartItem;
}

interface UseCartItemManagerReturn {
  isSelected: boolean;
  handleSelect: () => void;
  handleIncrease: () => Promise<void>;
  handleDecrease: () => Promise<void>;
  handleDelete: () => Promise<void>;
}

function useCartItemManager({
  cart,
}: UseCartItemManagerProps): UseCartItemManagerReturn {
  const dispatch = useCartDispatch();
  const selectState = useSelectContext();
  const selectDispatch = useSelectDispatch();

  const isSelected =
    selectState.find((item) => item.id === cart.id)?.selected || false;

  const handleSelect = (): void => {
    if (isSelected) {
      selectDispatch({
        type: "REMOVE_SELECT",
        payload: { id: cart.id },
      });
    } else {
      selectDispatch({
        type: "ADD_SELECT",
        payload: { id: cart.id },
      });
    }
  };

  const handleIncrease = async (): Promise<void> => {
    const newQuantity = cart.quantity + 1;

    try {
      dispatch({
        type: "ADD_ITEM_QUANTITY",
        payload: { id: cart.id, quantity: newQuantity },
      });
      await updateCartItemApi(cart.id, newQuantity);
    } catch (error) {
      dispatch({
        type: "SET_CART",
        payload: { items: [cart] },
      });
      console.error("Failed to update cart item:", error);
    }
  };

  const handleDecrease = async (): Promise<void> => {
    const newQuantity = cart.quantity - 1;

    try {
      if (cart.quantity === 1) {
        dispatch({
          type: "REMOVE_ITEM",
          payload: { id: cart.id },
        });
      } else {
        dispatch({
          type: "SUB_ITEM_QUANTITY",
          payload: { id: cart.id, quantity: newQuantity },
        });
      }
      await updateCartItemApi(cart.id, newQuantity);
    } catch (error) {
      dispatch({
        type: "SET_CART",
        payload: { items: [cart] },
      });
      console.error("Failed to update cart item:", error);
    }
  };

  const handleDelete = async (): Promise<void> => {
    try {
      dispatch({
        type: "REMOVE_ITEM",
        payload: { id: cart.id },
      });

      selectDispatch({
        type: "REMOVE_SELECT",
        payload: { id: cart.id },
      });

      await updateCartItemApi(cart.id, 0);
    } catch (error) {
      console.error("Failed to delete cart item:", error);
      dispatch({
        type: "SET_CART",
        payload: { items: [cart] },
      });
    }
  };

  return {
    isSelected,
    handleSelect,
    handleIncrease,
    handleDecrease,
    handleDelete,
  };
}

export default useCartItemManager;
