import { HandleCartItemChangeType } from "../../../types/cartItem";
import { useCartApi } from "../../../hooks/useCartApi";
import { useCartItems } from "../contexts/CartItemsContext";

export const useCartActions = () => {
  const { setCartItems } = useCartItems();
  const { patchCartItem, deleteCartItem } = useCartApi();

  const handleCartItemChange: HandleCartItemChangeType = async ({ action, id, quantity }) => {
    if (action === "patch") {
      const newData = await patchCartItem({ id, quantity: quantity! });
      if (newData) setCartItems(newData);
    }
    if (action === "delete") {
      const newData = await deleteCartItem({ id });
      if (newData) setCartItems(newData);
    }
  };

  return { handleCartItemChange };
};
