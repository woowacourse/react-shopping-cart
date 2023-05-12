import { atom, atomFamily, selector } from "recoil";
import { Cart } from "../types/product";

export const cartAtomFamily = atomFamily<Cart, number>({
  key: "cart",
  default: (id) => {
    return JSON.parse(localStorage.getItem(`cart`) || "[]").find(
      (cart: Cart) => cart.id === id
    );
  },
});

export const cartIDAtom = atom<number[]>({
  key: "cartID",
  default: JSON.parse(localStorage.getItem(`cart`) || "[]").map(
    (cart: Cart) => cart.id
  ),
});

export const cartAllSelector = selector<Cart[]>({
  key: "cartAll",
  get: ({ get }) => {
    const cart = get(cartIDAtom).map((id) => {
      return get(cartAtomFamily(id));
    });
    return cart;
  },
});
export const cartQuantitySelector = selector({
  key: "cartQuantitySelector",
  get: ({ get }) => {
    const carts = get(cartAllSelector);
    const quantity = carts.length;
    return quantity < 100 ? quantity : "99";
  },
});
