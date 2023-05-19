import { selector } from "recoil";
import cartProductsState from "./cartProductAtom";

const cartProductsCountState = selector({
  key: "cartProductsCountState",
  get: ({ get }) => {
    const products = get(cartProductsState);
    return Object.values(products).filter((quantity) => quantity > 0).length;
  },
});

export default cartProductsCountState;
