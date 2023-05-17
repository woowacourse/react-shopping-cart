import { atom, selector, useRecoilValue } from 'recoil';
import type { ProductItem } from '../../types/ProductType';

// private atom
const productListState = atom<ProductItem[]>({
  key: 'productListState',
  default: selector({
    key: 'productListState/selector',
    get: async () => {
      const response = await fetch('/products');
      const productList: ProductItem[] = await response.json();
      return productList;
    },
  }),
});

export const useReadOnlyProductList = () => useRecoilValue(productListState);
