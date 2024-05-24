import { selector } from "recoil";
import {
  cartItemCheckedState,
  cartItemIdListState,
  itemQuantityState,
  remoteAreaState,
  selectedCouponsState,
} from "../atom/atoms";
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

export const shippingFeeSelector = selector({
  key: "shippingFee",
  get: ({ get }) => {
    const orderAmount = get(orderAmountSelector);
    const isRemoteArea = get(remoteAreaState);
    const couponList = get(selectedCouponsState);

    if (couponList.some((coupon) => coupon.couponType === "freeShipping")) {
      return 0;
    }

    if (orderAmount > SHIPPING_CONSTANT.FREE_CRITERIA) {
      return 0;
    }

    if (isRemoteArea) {
      return SHIPPING_CONSTANT.DEFAULT + SHIPPING_CONSTANT.ADDITIONAL;
    }

    return SHIPPING_CONSTANT.DEFAULT;
  },
});

export const totalAmountSelector = selector({
  key: "totalAmount",
  get: ({ get }) => {
    const tempAmount = get(orderAmountSelector);
    return tempAmount >= SHIPPING_CONSTANT.FREE_CRITERIA ? tempAmount : tempAmount + SHIPPING_CONSTANT.DEFAULT;
  },
});

export const checkedCartItemsSelector = selector({
  key: "checkedCartItems",
  get: ({ get }) => {
    const cartItems = get(cartState);
    return cartItems.filter((item) => get(cartItemCheckedState(item.id)));
  },
});
