import { atom, atomFamily, selector } from "recoil";
import { getCartItems } from "../../api/cart";
import { CartItem } from "../../types/cart";
// import { cartItemsState } from "../selectors/selectors";

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

export const cartItemQuantityState = atomFamily<number, number>({
  key: "cartItemQuantityState",
  default: 0,
});
