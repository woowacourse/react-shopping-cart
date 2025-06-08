import { HandleCartItemChangeType } from "../../../types/cartItem";
import { useCartApi } from "../../../hooks/useCartApi";

export const useCartActions = () => {
  const { patchCartItem, deleteCartItem } = useCartApi();

  const handleCartItemChange: HandleCartItemChangeType = ({ action, id, quantity }) => {
    if (action === "patch") patchCartItem({ id, quantity: quantity! });
    if (action === "delete") deleteCartItem({ id });
  };

  return { handleCartItemChange };
};
