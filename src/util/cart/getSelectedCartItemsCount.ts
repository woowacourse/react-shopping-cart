import { CartItem } from "../../type/CartItem";

export function getSelectedCartItemsCount(selectedCartItems: CartItem[]) {
  return selectedCartItems.reduce(
    (totalCount, item) => totalCount + item.quantity,
    0
  );
}
