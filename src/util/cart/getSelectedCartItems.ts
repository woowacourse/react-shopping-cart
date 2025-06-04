import { CartItem } from "../../type/CartItem";

export function getSelectedCartItems({
  cartItemsData,
  selectedCartIds,
}: {
  cartItemsData: CartItem[];
  selectedCartIds: number[];
}) {
  return cartItemsData.filter((cartItem) =>
    selectedCartIds.includes(cartItem.id)
  );
}
