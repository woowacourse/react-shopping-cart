import { selector } from 'recoil';

import productApis from '../../apis/products';

export const productSelector = selector({
  key: 'productSelector',
  get: async () => {
    const data = await productApis.get();
    return data;
  },
});
