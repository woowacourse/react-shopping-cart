import { atom, selector, useRecoilValue } from 'recoil';
import { ProductItemType } from '../../types/ProductType';
import { getProductsFetched } from '../../views/ProductItemList/remote/fetchProductList';

export const productListState = atom<ProductItemType[]>({
  key: 'productListState',
  default: selector({
    key: 'productListState/selector',
    get: async () => {
      const productList: ProductItemType[] = await getProductsFetched();
      return productList;
    },
  }),
});

export const useProductListReadOnly = () => useRecoilValue(productListState);
