import { FREE_SHIPPING_OVER, SHIPPING_FEE } from "../constants/priceSetting";
import { CartItem } from "../type/CartItem";

export function summarizeOrder(items: CartItem[], selected: Set<string>) {
  const selectedItems = items.filter((item) => selected.has(item.id));

  const { price, count } = selectedItems.reduce(
    (acc, { product, quantity }) => ({
      price: acc.price + product.price * quantity,
      count: acc.count + quantity,
    }),
    { price: 0, count: 0 }
  );

  const isAll = items.length > 0 && items.every((i) => selected.has(i.id));
  const shipping = price >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;

  return {
    subtotal: price,
    count,
    length: selectedItems.length,
    isAll,
    shipping,
    final: price + shipping,
  };
}
