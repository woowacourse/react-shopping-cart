import { selector } from 'recoil';

import { requestCartItemList } from '../../apis/cartItemList';

export const cartItemListQuery = selector<CartItem[]>({
  key: 'cartItemListQuery',
  get: async () => {
    const result = await requestCartItemList();
    return result;
  },
});
