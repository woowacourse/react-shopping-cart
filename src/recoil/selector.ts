import { CART_LIST_LOCAL_STORAGE_KEY, MIN_QUANTITY } from "constants/index";
import { DefaultValue, selector, selectorFamily } from "recoil";
import { productListState } from "recoil/atom";
import { ProductType } from "types/domain";

export const CartProductList = selector({
  key: "CartProductList",
  get: ({ get }) => get(productListState).filter((item) => item.quantity > MIN_QUANTITY),
  set: ({ set }, newList) => {
    if (newList instanceof DefaultValue) return;

    return set(
      productListState,
      newList.filter((item) => item.quantity > MIN_QUANTITY)
    );
  },
});

export const productSelector = selectorFamily<ProductType | null, number>({
  key: "productSelector",
  get:
    (id) =>
    ({ get }) => {
      return get(productListState).find((item) => item.id === id) ?? null;
    },
  set:
    (id) =>
    ({ get, set }, product) => {
      const newList = [...get(productListState)];
      const idx = newList.findIndex((item) => item.id === id);

      if (product instanceof DefaultValue || product === null || idx === -1) return;

      newList[idx] = product;

      localStorage.setItem(CART_LIST_LOCAL_STORAGE_KEY, JSON.stringify(newList));

      return set(productListState, newList);
    },
});

export const cartTotalPrice = selector({
  key: "cartTotalPrice",
  get: ({ get }) =>
    get(productListState)
      .filter((item) => item.isChecked)
      .reduce((sum, item) => sum + item.price * item.quantity, 0),
});
