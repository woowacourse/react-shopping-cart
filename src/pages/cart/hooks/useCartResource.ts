import { useMemo, useState } from "react";
import { CartItem } from "../../../shared/types/cartItem";
import { useErrorMessage } from "../../../shared/contexts/ErrorContext";
import cartApi from "../apis/cartApi";

const useCartResource = () => {
  const { setErrorMessage } = useErrorMessage();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartItemIds = useMemo(() => cartItems.map((item) => item.id), [cartItems]);

  const getCartItems = async () => {
    try {
      const { content } = await cartApi.get({ page: 0, size: 20 });
      setCartItems(content);
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  };

  const patchCartItem = async ({ id, quantity }: { id: number; quantity: number }) => {
    try {
      await cartApi.patch({ id, quantity });
      getCartItems();
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  };

  const deleteCartItem = async ({ id }: { id: number }) => {
    try {
      await cartApi.delete({ id });
      getCartItems();
      return id;
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  };

  return {
    cartItems,
    cartItemIds,
    fetchCartItems: getCartItems,
    patchCartItem,
    deleteCartItem,
  };
};

export default useCartResource;
