import { atom } from 'recoil';

import { getFetchCartList } from '@Api/index';

import { ShoppingCartProduct } from '@Types/index';

const shoppingCartState = atom({
  key: 'shoppingCartState',
  default: [] as ShoppingCartProduct[],
  effects: [
    ({ setSelf, trigger }) => {
      const initCartItems = async () => {
        getFetchCartList<ShoppingCartProduct[]>().then((res) => {
          setSelf(res);
        });
      };

      if (trigger === 'get') {
        initCartItems();
      }
    },
  ],
});

export default shoppingCartState;
