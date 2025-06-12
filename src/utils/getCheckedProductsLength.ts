import CartItem from "../types/CartItem";
import { CheckedMap } from "../types/CheckMap";

export function getCheckedProductsLength(
  cartItemList: CartItem[],
  checkedMap: CheckedMap
) {
  return cartItemList.filter((item) => checkedMap.get(item.id)).length;
}
