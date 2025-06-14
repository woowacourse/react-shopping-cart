import { HandleCartItemChangeType } from "../../../types/cartItem";
import { useCartApi } from "../../../hooks/useCartApi";
import { useCartItems } from "../contexts/CartItemsContext";
import { STORAGE_KEYS } from "../../../constants";
import { storageHandler } from "../../../utils/storageHandler";

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

      if (newData) {
        const currentCheckedIds = storageHandler.getItem(STORAGE_KEYS.CART_CHECKED_IDS) as number[];
        const updatedCheckedIds = currentCheckedIds.filter((checkedId) => checkedId !== id);
        const updatedData = newData.filter((item) => item.id !== id);
        storageHandler.setItem(STORAGE_KEYS.CART_CHECKED_IDS, updatedCheckedIds);
        setCartItems(updatedData);
      }
    }
  };

  return { handleCartItemChange };
};
