import { selector } from "recoil";
import { itemEachCheckState, itemIdsState, itemQuantityState } from "../atom/atoms";
import { fetchProducts } from "../api";
import { SHIPPING_CONSTANT } from "../../constants";

export const cartState = selector({
  key: "cartState",
  get: async () => {
    const products = await fetchProducts("GET");
    return products.content;
  },
});

export const checkAllItemState = selector({
  key: "checkAllItemState",
  get: ({ get }) => {
    const itemIds = get(itemIdsState);
    return itemIds.every((itemId) => get(itemEachCheckState(itemId)));
  },
  set: ({ set, get }, newValue) => {
    const itemIds = get(itemIdsState);
    itemIds.forEach((itemId) => set(itemEachCheckState(itemId), newValue));
  },
});

export const orderAmountState = selector({
  key: "orderAmount",
  get: ({ get }) => {
    const cartIds = get(itemIdsState);
    const cartItems = get(cartState);
    return cartItems.reduce((acc: number, cur: CartItemInfo) => {
      if (cartIds.includes(cur.id)) {
        const price = cur.product.price;
        const quantity = get(itemQuantityState);
        return acc + price * quantity[cur.id];
      }
      return acc;
    }, 0);
  },
});

export const totalAmountState = selector({
  key: "totalAmount",
  get: ({ get }) => {
    const tempAmount = get(orderAmountState);
    return tempAmount >= SHIPPING_CONSTANT.FREE_CRITERIA ? tempAmount : tempAmount + SHIPPING_CONSTANT.FEE;
  },
});
