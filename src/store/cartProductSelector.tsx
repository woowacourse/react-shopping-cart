import { selector } from "recoil";
import cartProductsState from "./cartProductAtom";

const cartProductsCountState = selector({
  key: "cartProductsCountState",
  get: ({ get }) => {
    const products = get(cartProductsState);
    return Object.keys(products).length;
  },
});

export default cartProductsCountState;
