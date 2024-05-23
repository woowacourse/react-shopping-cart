import { atom, selector } from "recoil";
import { getCartItems } from "../../api/cart";
import { CartItem } from "../../types/cart";

export const cartItems = selector<CartItem[]>({
  key: "cartItems",
  get: async () => {
    const cartItems = await getCartItems();
    return cartItems;
  },
});

export const cartItemsState = atom({
  key: "cartItemsState",
  default: cartItems,
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
