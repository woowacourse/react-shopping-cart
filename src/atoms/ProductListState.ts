import { atom, selectorFamily } from 'recoil';
import { ProductItem } from '../types/productType';

const productListStateInitValue: ProductItem[] = [];

export const productListState = atom({
  key: 'ProductListState',
  default: productListStateInitValue,
});

export const productItemStateFamily = selectorFamily({
  key: 'ProductItemState',
  get:
    (id: number) =>
    ({ get }) => {
      const productItem = get(productListState).filter(
        (product) => product.id === id
      )[0];

      return productItem;
    },
});
