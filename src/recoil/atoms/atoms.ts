import { atom } from "recoil";
import { CartItem } from "../../types";
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
