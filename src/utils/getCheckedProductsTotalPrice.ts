import CartItem from "../types/CartItem";
import { CheckedMap } from "../types/CheckMap";

export function getCheckedProductsTotalPrice(
  cartItemList: CartItem[],
  checkedMap: CheckedMap
) {
  return cartItemList.reduce(
    (acc, item) =>
      checkedMap.get(item.id) ? acc + item.product.price * item.quantity : acc,
    0
  );
}
