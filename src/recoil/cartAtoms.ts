import { atom, selector, selectorFamily } from "recoil";
import { CartItem } from "../types/types";

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});

export const cartCountSelector = selector({
  key: "cartCountSelector",
  get: ({ get }) => {
    const cartList = get(cartState);
    return cartList.length;
  },
});

export const checkedCartSelector = selector({
  key: "checkedCartSelector",
  get: ({ get }) => {
    const cartList = get(cartState);
    return cartList.filter((cartItem) => cartItem.checked);
  },
});

export const checkedCartCountSelector = selector({
  key: "checkedCartCountSelector",
  get: ({ get }) => {
    const checkedCartList = get(checkedCartSelector);
    return checkedCartList.length;
  },
});

export const allCartCheckedSelector = selector({
  key: "allCartCheckedSelector",
  get: ({ get }) => {
    const cartList = get(cartState);
    const cartCount = get(cartCountSelector);
    if (cartCount > 0) {
      for (let i = 0; i < cartList.length; i++) {
        if (!cartList[i].checked) {
          return false;
        }
      }
      return true;
    }

    return false;
  },
});

export const totalPriceSelector = selector({
  key: "totalPriceSelector",
  get: ({ get }) => {
    const checkedCartList = get(checkedCartSelector);
    const totalPrice = checkedCartList.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.product.price,
      0
    );
    return totalPrice;
  },
});

export const quantityByProductIdSelector = selectorFamily({
  key: "quantityByProductIdSelector",
  get:
    (productId: number) =>
    ({ get }) => {
      const cartList = get(cartState);
      const targetCart = cartList.find((cart) => cart.id === productId);
      return targetCart?.quantity ?? 0;
    },
});
