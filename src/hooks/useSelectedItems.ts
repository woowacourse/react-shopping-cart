import { useCartItemContext } from "../contexts/useCartItemContext";

export const useSelectedItems = () => {
  const { cartItems, selectedItem } = useCartItemContext();

  const selectedItems = cartItems.filter((item) => selectedItem.has(item.id));

  const totalQuantity = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const selectedItemCount = selectedItems.length;

  return {
    selectedItems,
    totalQuantity,
    selectedItemCount,
  };
};
