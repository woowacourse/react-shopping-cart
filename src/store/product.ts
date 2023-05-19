import { selector } from 'recoil';

import { getProductList } from '../api/productAPI';
import { ProductItemData } from '../types';

const productListState = selector<ProductItemData[]>({
  key: 'productList',
  get: async () => {
    const productList = await getProductList();

    return productList;
  },
});

export { productListState };
