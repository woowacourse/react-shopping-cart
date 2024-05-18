import { getCartList } from "@/api/cartItem";
import { selector } from "recoil";

export const cartState = selector({
  key: "cartState",
  get: async () => {
    const cart = await getCartList();
    return cart;
  },
});
