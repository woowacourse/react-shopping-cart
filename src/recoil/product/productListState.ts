import { atom, selector, useRecoilValue } from 'recoil';
import { ProductItem } from '../../types/ProductType';

export const productListState = atom<ProductItem[]>({
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

export const useProductListReadOnly = () => useRecoilValue(productListState);
