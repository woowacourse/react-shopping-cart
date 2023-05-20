import { selector } from 'recoil';

import shoppingCartState from '@Atoms/shoppingCartState';

const shoppingItemsAmountState = selector({
  key: 'shoppingItemsAmountState',

  get: ({ get }) => {
    const shoppingCart = get(shoppingCartState);

    return shoppingCart.length;
  },
});

export default shoppingItemsAmountState;
