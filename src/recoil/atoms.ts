import { atom, atomFamily } from "recoil";

interface CartQuantityAndPrice {
  quantity: number;
  price: number;
}

export const cartSelectedState = atom<number[]>({
  key: "cartSelectedState",
  default: [],
});

export const cartQuantityAndPriceState = atomFamily<CartQuantityAndPrice, number>({
  key: "cartQuantityState",
  default: {
    quantity: 0,
    price: 0,
  },
});
