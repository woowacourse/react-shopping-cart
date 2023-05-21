import { atom, atomFamily, selector } from "recoil";
import { Cart } from "../types/product";

export const cartAtomFamily = atomFamily<Cart, number>({
  key: "cart",
  default: (id) => ({
    id,
    quantity: 0,
    product: { id: 0, name: "", price: 0, imageUrl: "" },
  }),
});

export const cartIdAtom = atom<number[]>({
  key: "cartId",
  default: JSON.parse(localStorage.getItem(`cartId`) || "[]"),
});

export const cartAllSelector = selector<Cart[]>({
  key: "cartAll",
  get: ({ get }) => {
    const cart = get(cartIdAtom).map((id) => {
      return get(cartAtomFamily(id));
    });
    return cart;
  },
});

export const cartAllPriceSelector = selector<number>({
  key: "cartAllPrice",
  get: ({ get }) => {
    const carts = get(cartAllSelector);
    const price = carts.reduce((sum, cart) => {
      return sum + cart.quantity * cart.product.price;
    }, 0);

    return price;
  },
});

export const cartQuantitySelector = selector({
  key: "cartQuantity",
  get: ({ get }) => {
    const carts = get(cartAllSelector);
    const quantity = carts.length;
    return quantity;
  },
});
