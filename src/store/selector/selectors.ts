import { selector } from "recoil";
import { itemEachCheckState, itemIdsState, itemQuantityState } from "../atom/atoms";
import { fetchProducts } from "../api";
import { SHIPPING_CONSTANT } from "../../constants";
import { cartState } from "../atom/atoms";
import { LOCAL_STORAGE_KEY } from "../../constants";

export const fetchCartState = selector({
  key: "fetchCartState",
  get: async () => {
    const { content }: { content: CartItemInfo[] } = await fetchProducts("GET");
    const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}");
    content.forEach((cartItem) => {
      if (localData[cartItem.id] === undefined) localData[cartItem.id] = true;
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));
    return content;
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
    const cartItems = get(cartState);

    if (!cartItems) return 0;
    return cartItems.reduce((acc: number, cur: CartItemInfo) => {
      const isChecked = get(itemEachCheckState(cur.id));
      if (isChecked) {
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
