import cartApi from "../apis/cartApi";
import { useState } from "react";
import { useError } from "../contexts/ErrorContext";

export const useCartApi = () => {
  const { showError } = useError();
  const [isLoading, setIsLoading] = useState(false);

  const getCartItems = async () => {
    setIsLoading(true);
    try {
      const data = await cartApi.get({ page: 0, size: 20 });
      return data.content;
    } catch (e) {
      if (e instanceof Error) showError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const patchCartItem = async ({ id, quantity }: { id: number; quantity: number }) => {
    try {
      await cartApi.patch({ id, quantity });
      return getCartItems();
    } catch (e) {
      if (e instanceof Error) showError(e.message);
    }
  };

  const deleteCartItem = async ({ id }: { id: number }) => {
    try {
      await cartApi.delete({ id });
      return getCartItems();
    } catch (e) {
      if (e instanceof Error) showError(e.message);
    }
  };

  return {
    isLoading,
    getCartItems,
    patchCartItem,
    deleteCartItem,
  };
};
