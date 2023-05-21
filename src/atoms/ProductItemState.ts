import { atom, selectorFamily } from 'recoil';
import { ProductItem } from '../types/productType';

const productListStateInitValue: ProductItem[] = [];

const getProductListFromMocks =
  () =>
  ({ setSelf }: { setSelf: (productList: ProductItem[] | []) => void }) => {
    const initProductListState = async () => {
      const response = await fetch('/api/products');

      if (response.status >= 400) {
        throw new Error('상품 정보를 가져오는데 실패했습니다.');
      }

      const productList = await response.json();

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
