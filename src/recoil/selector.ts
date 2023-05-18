import { DefaultValue, selector, selectorFamily } from "recoil";
import { Product, ProductWithChecked } from "types/domain";
import { checkedCartItemList, productListState } from "recoil/atom";

export const cartListSelector = selector({
  key: "cartList",
  get: ({ get }) => {
    return get(productListState).filter((item: Product) => Number(item.quantity) > 0);
  },
  set: ({ get, set }, newList) => {
    if (newList instanceof DefaultValue) return set(productListState, newList);

    const updatedList = get(productListState).map((product) => {
      const findedItem = newList.find((item) => item.id === product.id);

      return { ...product, quantity: findedItem ? findedItem.quantity : product.quantity };
    });

    return set(productListState, updatedList);
  },
});

export const checkedCartItemSelector = selectorFamily<ProductWithChecked | null, number>({
  key: "checkedCartItem",
  get:
    (id) =>
    ({ get }) => {
      const findedItem = get(checkedCartItemList).find((item) => item.id === id);
      return findedItem || null;
    },
  set:
    (id) =>
    ({ get, set }, newItem) => {
      if (newItem instanceof DefaultValue || !newItem) return;

      const updatedList = get(checkedCartItemList).map((item) => (item.id === id ? newItem : item));

      return set(checkedCartItemList, updatedList);
    },
});

export const allCheckedCartItemSelector = selector<boolean>({
  key: "checkedCartItem",
  get: ({ get }) =>
    get(checkedCartItemList).filter((item) => item.isChecked).length ===
    get(checkedCartItemList).length,
  set: ({ get, set }, isChecked) => {
    const updatedList = get(checkedCartItemList).map((item) => ({
      ...item,
      isChecked: isChecked instanceof DefaultValue ? true : isChecked,
    }));

    return set(checkedCartItemList, updatedList);
  },
});

export const checkedCartItemCountSelector = selector({
  key: "checkedCartItemCount",
  get: ({ get }) => get(checkedCartItemList).filter((item) => item.isChecked).length,
});
