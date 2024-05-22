import { atom, selector } from "recoil";
import { getCartItems } from "../../api/cart";
import { CartItem } from "../../types/cart";

export const cartItemsSelector = selector<CartItem[]>({
  key: "cartItemsSelector",
  get: async () => {
    const cartItems = await getCartItems();
    return cartItems;
  },
});

export const cartItemsAtom = atom({
  key: "cartItemsAtom",
  default: cartItemsSelector,
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
