import { selector, atom } from "recoil";
import { fetchData } from "../domains/fetchData";
import { isCartProducts, isProductsWithId } from "../types/typeGuards";

const fetchProductsSelector = selector({
  key: "fetchProducts",
  get: async ({ get }) => {
    get(productResetterAtom);

    const products = await fetchData({
      url: "/products",
      method: "GET",
      typeGuardFunction: isProductsWithId,
    });

    return products;
  },
  set: ({ set }) => {
    set(productResetterAtom, crypto.randomUUID());
  },
});

const fetchCartProductsSelector = selector({
  key: "fetchCartProducts",
  get: async ({ get }) => {
    get(cartProductResetterAtom);

    const cartProducts = await fetchData({
      url: "/cart-items",
      method: "GET",
      typeGuardFunction: isCartProducts,
    });

    return cartProducts;
  },
  set: ({ set }) => {
    set(cartProductResetterAtom, crypto.randomUUID());
  },
  cachePolicy_UNSTABLE: { eviction: "most-recent" },
});

const productResetterAtom = atom({
  key: "productResetter",
  default: "",
});

const cartProductResetterAtom = atom({
  key: "cartProductResetter",
  default: "",
});

export {
  fetchProductsSelector,
  fetchCartProductsSelector,
  productResetterAtom,
  cartProductResetterAtom,
};
