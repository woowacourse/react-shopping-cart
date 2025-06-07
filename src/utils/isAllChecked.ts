import CartItem from "../types/CartItem";
import { CheckedMap } from "../types/CheckMap";

export function isAllChecked(cartItemList: CartItem[], checkedMap: CheckedMap) {
  return (
    cartItemList.length > 0 &&
    cartItemList.every((item) => checkedMap.get(item.id) ?? true)
  );
}
