import { useEffect, useMemo, useState } from "react";
import { CartItem } from "../../../shared/types/cartItem";
import { useErrorMessage } from "../../../shared/contexts/ErrorContext";
import cartApi from "../apis/cartApi";

type HandleCartItemChangeType = ({
  action,
  id,
  quantity,
}: {
  action: "patch" | "delete";
  id: number;
  quantity?: number;
}) => void;

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
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  };

  const handleCartItemChange: HandleCartItemChangeType = ({ action, id, quantity }) => {
    if (action === "patch") patchCartItem({ id, quantity: quantity! });
    if (action === "delete") deleteCartItem({ id });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return { cartItems, cartItemIds, handleCartItemChange };
};

export default useCartResource;
