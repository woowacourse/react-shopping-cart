import { atom, selector } from "recoil";
import { getCartItems } from "../../api/cart";
import { getCoupons } from "../../api/coupon";

export const cartItems = selector({
  key: "cartItems",
  get: async () => {
    const cartItems = getCartItems();
    return cartItems;
  },
});

export const cartItemsState = atom({
  key: "cartItemsState",
  default: cartItems,
});

export const coupons = selector({
  key: "coupons",
  get: async () => {
    const coupons = getCoupons();
    return coupons;
  },
});

export const couponsState = atom({
  key: "couponsState",
  default: coupons,
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
