import { atom, atomFamily, selector } from "recoil";
import { Cart } from "../types/product";
import localStorageEffect from "./localStorageEffect";

export const cartAtomFamily = atomFamily<Cart, number>({
  key: "cart",
  default: {
    id: 0,
    quantity: 0,
    product: { id: 0, name: "", price: 0, imageUrl: "" },
  },
  effects: (id) => [localStorageEffect(`cart_${id}`)],
});

export const cartIDAtom = atom<number[]>({
  key: "cartID",
  default: [],
  effects: [localStorageEffect("cartID")],
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
