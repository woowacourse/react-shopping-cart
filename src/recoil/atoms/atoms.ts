import { atom } from "recoil";
import { getCartItems } from "../../api/cart";
import { getCoupons } from "../../api/coupon";

export const cartItemsState = atom({
  key: "cartItemsState",
  default: getCartItems(),
});

export const couponsState = atom({
  key: "couponsState",
  default: getCoupons(),
});

export const selectedListState = atom<number[]>({
  key: "selectedListState",
  default: JSON.parse(localStorage.getItem("selectedListState") || "[]"),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("selectedListState", JSON.stringify(newValue));
      });
    },
  ],
});

export const selectedCouponsState = atom<number[]>({
  key: "selectedCouponsState",
  default: [],
});

export const extremeDeliveryState = atom<boolean>({
  key: "extremeDeliveryState",
  default: false,
});
