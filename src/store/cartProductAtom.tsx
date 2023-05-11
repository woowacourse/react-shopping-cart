import { atom } from "recoil";

const emptyValue: Record<string, number> = {};

const cartProductsState = atom({
  key: "cartProductsState",
  default: emptyValue,
});

export default cartProductsState;
