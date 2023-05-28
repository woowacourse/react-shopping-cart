import { atom, selectorFamily } from 'recoil';
import { ProductItem } from '../types/productType';
import { getRequest } from '../api';

const productListStateInitValue: ProductItem[] = [];

const getProductListFromMocks =
  () =>
  ({ setSelf }: { setSelf: (productList: ProductItem[] | []) => void }) => {
    const initProductListState = async () => {
      const productList = await getRequest<ProductItem[]>('products');

      if (!productList) setSelf([]);
      setSelf(productList);
    };

    initProductListState();
  };

export const productListState = atom({
  key: 'ProductListState',
  default: productListStateInitValue,
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
