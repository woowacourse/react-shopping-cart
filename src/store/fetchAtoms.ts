import { atom, selector } from "recoil";
import { fetchData } from "../domains/fetchData";
import { isCartProducts, isProductsWithId } from "../types/typeGuards";
import type { CartProducts, ProductsWithId } from "../types";

const fetchProductsSelector = selector({
  key: "fetchProducts",
  get: async () => {
    const products = await fetchData({
      url: "/products",
      method: "GET",
      typeGuardFunction: isProductsWithId,
    });

    return products;
  },
});

const productsAtom = atom<ProductsWithId>({
  key: "products",
  default: fetchProductsSelector,
});

const fetchCartProductsSelector = selector({
  key: "fetchCartProducts",
  get: async () => {
    const cartProducts = await fetchData({
      url: "/cart-items",
      method: "GET",
      typeGuardFunction: isCartProducts,
    });

    return cartProducts;
  },
});

const cartProductsAtom = atom<CartProducts>({
  key: "cartProducts",
  default: fetchCartProductsSelector,
});

export { productsAtom, cartProductsAtom };
