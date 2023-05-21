import { atom, selectorFamily } from 'recoil';
import { ProductItem } from '../types/productType';

const getProductListFromMocks =
  () =>
  ({ setSelf }: { setSelf: (productList: ProductItem[] | []) => void }) => {
    const initProductListState = async () => {
      const response = await fetch('/api/products');
      const productList = await response.json();

      if (!productList) setSelf([]);
      setSelf(productList);
    };

    initProductListState();
  };

export const productListState = atom({
  key: 'ProductListState',
  default: [],
  effects: [getProductListFromMocks()],
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
