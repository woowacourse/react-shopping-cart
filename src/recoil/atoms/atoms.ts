import { atom } from "recoil";
import { CartItem, Coupon } from "../../types";
import { getLocalStorageState } from "../../utils/getLocalStorageStore";

export const cartItemsState = atom<CartItem[]>({
  key: "cartItemsState",
  default: [],
});

export const checkedItemState = atom<Record<number, boolean>>({
  key: "checkedItemState",
  default: getLocalStorageState("checkedItemState", {}),
});

export const isAllCheckedState = atom<boolean>({
  key: "isAllCheckedState",
  default: getLocalStorageState("isAllCheckedState", false),
});

export const cartSummaryState = atom({
  key: "cartSummaryState",
  default: {
    orderPrice: 0,
    deliveryPrice: 0,
    totalPrice: 0,
    uniqueItemCount: 0,
    totalItemCount: 0,
  },
});

export const couponsState = atom<Coupon[]>({
  key: "couponState",
  default: [],
});

export const selectedCartItemsState = atom<CartItem[]>({
  key: "selectedCartItemsState",
  default: [],
});

export const isShippingRegionCheckedState = atom<boolean>({
  key: "isShippingRegionCheckedState",
  default: false,
});
