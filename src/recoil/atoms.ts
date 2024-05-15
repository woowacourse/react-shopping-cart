import { AtomEffect, atomFamily, selectorFamily } from "recoil";
import CartItemLocalStorage from "../services/CartItemLocalStorage";
import { cartListState } from "./selectors";

const cartItemQuantity = atomFamily<number, number>({
  key: "cartItemQuantity",
  default: selectorFamily({
    key: "initialCartItemQuantity",
    get:
      (id) =>
      ({ get }) => {
        const cartList = get(cartListState);
        const item = cartList.find((item) => item.id === id);
        return item ? item.quantity : 0;
      },
  }),
});

const cartItemSelected = atomFamily<boolean, number>({
  key: "cartItemSelected",
  default: (id: number) => {
    const storageState = CartItemLocalStorage.get("cartItemSelected");

    if (storageState) {
      return storageState[id];
    }
    return false;
  },
  effects: (id: number): AtomEffect<boolean>[] => [
    ({ onSet }) => {
      onSet((newValue) => {
        // storage 업데이트
        const storageState = CartItemLocalStorage.get("cartItemSelected");
        if (storageState) {
          storageState[id] = newValue;
          CartItemLocalStorage.set("cartItemSelected", storageState);
        }
      });
    },
  ],
});

export { cartItemQuantity, cartItemSelected };
