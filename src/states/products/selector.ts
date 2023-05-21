import { selector } from 'recoil';

import productApis from '../../apis/products';

export const productState = selector({
  key: 'productState',
  get: async () => {
    const data = await productApis.get();
    return data;
  },
});
