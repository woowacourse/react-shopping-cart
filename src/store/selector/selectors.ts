import { selector } from "recoil";
import { cartItemCheckedState, cartItemIdListState, itemQuantityState } from "../atom/atoms";
import { SHIPPING_CONSTANT } from "../../constants";
import { cartState } from "../atom/atoms";

export const checkAllItemSelector = selector({
  key: "checkAllItemState",
  get: ({ get }) => {
    const itemIds = get(cartItemIdListState);
    return itemIds.every((itemId) => get(cartItemCheckedState(itemId)));
  },
  set: ({ set, get }, newValue) => {
    const itemIds = get(cartItemIdListState);
    itemIds.forEach((itemId) => set(cartItemCheckedState(itemId), newValue));
  },
});

export const orderAmountSelector = selector({
  key: "orderAmount",
  get: ({ get }) => {
    const cartItems = get(cartState);

    if (!cartItems) return 0;
    return cartItems.reduce((acc: number, cur: CartItemInfo) => {
      const isChecked = get(cartItemCheckedState(cur.id));
      if (isChecked) {
        const price = cur.product.price;
        const quantity = get(itemQuantityState);
        return acc + price * quantity[cur.id];
      }
      return acc;
    }, 0);
  },
});

// export const shippingFeeSelector = selector({

// });

export const totalAmountSelector = selector({
  key: "totalAmount",
  get: ({ get }) => {
    const tempAmount = get(orderAmountSelector);
    return tempAmount >= SHIPPING_CONSTANT.FREE_CRITERIA ? tempAmount : tempAmount + SHIPPING_CONSTANT.FEE;
  },
});

export const checkedCartItemsSelector = selector({
  key: "checkedCartItems",
  get: ({ get }) => {
    const cartItems = get(cartState);
    return cartItems.filter((item) => get(cartItemCheckedState(item.id)));
  },
});
