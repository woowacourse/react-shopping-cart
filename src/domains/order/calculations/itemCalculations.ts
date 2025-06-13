import { CartItemWithSelection } from "../../cart/types/response";

export const filterSelectedItems = (
  items: CartItemWithSelection[]
): CartItemWithSelection[] => {
  return items.filter((item) => item.selected);
};

export const calculateOrderQuantity = (
  items: CartItemWithSelection[]
): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};
