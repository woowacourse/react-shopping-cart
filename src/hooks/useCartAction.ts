import { useCallback } from "react";
import { useCartDispatch } from "../stores/CartContext";
import { ResponseCartItem } from "../types/types";

function useCartAction() {
  const dispatch = useCartDispatch();

  const increaseItemQuantity = ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => {
    dispatch({
      type: "INCREASE_ITEM_QUANTITY",
      payload: { id, quantity },
    });
  };

  const decreaseItemQuantity = ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => {
    dispatch({
      type: "DECREASE_ITEM_QUANTITY",
      payload: { id, quantity },
    });
  };

  const removeCartItem = ({ id }: { id: number }) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id },
    });
  };

  const setCartInfo = useCallback(
    ({ items }: { items: ResponseCartItem[] }) => {
      dispatch({
        type: "SET_CART",
        payload: { items },
      });
    },
    [dispatch]
  );

  return {
    increaseItemQuantity,
    decreaseItemQuantity,
    setCartInfo,
    removeCartItem,
  };
}

export default useCartAction;
