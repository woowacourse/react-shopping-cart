import cartApi from "../apis/cartApi";
import { useState } from "react";
import { useError } from "../contexts/ErrorContext";
import { CartItemContent } from "../types/cartItem";

export const useCartApi = () => {
  const { showError } = useError();
  const [cartItems, setCartItems] = useState<CartItemContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCartItems = async () => {
    setIsLoading(true);
    try {
      const data = await cartApi.get({ page: 0, size: 20 });
      setCartItems(data.content);
    } catch (e) {
      if (e instanceof Error) showError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const patchCartItem = async ({ id, quantity }: { id: number; quantity: number }) => {
    try {
      await cartApi.patch({ id, quantity });
      getCartItems();
    } catch (e) {
      if (e instanceof Error) showError(e.message);
    }
  };

  const deleteCartItem = async ({ id }: { id: number }) => {
    try {
      await cartApi.delete({ id });
      getCartItems();
    } catch (e) {
      if (e instanceof Error) showError(e.message);
    }
  };

  return {
    cartItems,
    isLoading,
    getCartItems,
    patchCartItem,
    deleteCartItem,
  };
};
