import { useCartItemContext } from "../contexts/CartItemContext";

export const useSelectedItems = () => {
  const { cartItems, selectedItems } = useCartItemContext();

  const selectedItemsArray = cartItems.filter((item) =>
    selectedItems.has(item.id)
  );

  const totalQuantity = selectedItemsArray.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const selectedItemCount = selectedItemsArray.length;

  return {
    selectedItems: selectedItemsArray,
    totalQuantity,
    selectedItemCount,
  };
};
