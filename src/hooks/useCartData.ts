import { useCallback, useEffect, useState } from "react";
import { deleteCartItem } from "../apis/cartItems/deleteCartItem";
import { getCartItems } from "../apis/cartItems/getCartItems";
import { patchCartItem } from "../apis/cartItems/patchCartItem";
import { CartItemContent } from "../types/response";
import useErrorHandler from "./useErrorHandler";

const useCartData = () => {
  const [cartItemsData, setCartItemsData] = useState<CartItemContent[]>([]);
  const { handleError } = useErrorHandler();

  const fetchData = useCallback(async () => {
    try {
      setCartItemsData(await getCartItems());
    } catch (error) {
      handleError(error);
    }
  }, [handleError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteItem = useCallback(
    async (cartId: number) => {
      try {
        await deleteCartItem(cartId);
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
    cartItemsData,
    setCartItemsData,
    deleteItem,
    updateItemQuantity,
  };
};

export default useCartData;
