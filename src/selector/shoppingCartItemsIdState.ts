import { selector } from 'recoil';

import shoppingCartState from '@Atoms/shoppingCartState';

const shoppingCartItemsIdState = selector({
  key: 'shoppingCartItemsIdState',

  get: ({ get }) => {
    const shoppingCart = get(shoppingCartState);

    return shoppingCart.map((item) => item.id);
  },
});

export default shoppingCartItemsIdState;
