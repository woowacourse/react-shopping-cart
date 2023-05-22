import { atom, selector, useRecoilValue } from 'recoil';
import { ProductItem } from '../../types/ProductType';
import { getProductsFetched } from '../../views/ProductItemList/remote/fetchProductList';

export const productListState = atom<ProductItem[]>({
  key: 'productListState',
  default: selector({
    key: 'productListState/selector',
    get: async () => {
      const productList: ProductItem[] = await getProductsFetched();
      return productList;
    },
  }),
});

export const useProductListReadOnly = () => useRecoilValue(productListState);
