import { CartItem } from "../types";

export const syncSelectedCartItems = (
  cartItems: CartItem[],
  checkedItems: Record<number, boolean>,
  setSelectedCartItems: (items: CartItem[]) => void
): void => {
  const selectedItems = cartItems.filter((item) => checkedItems[item.id]);
  setSelectedCartItems(selectedItems);
};
