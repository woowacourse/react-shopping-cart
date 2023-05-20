import { selector } from 'recoil';

import shoppingCartState from '@Atoms/shoppingCartState';

const shoppingItemsAmountState = selector({
  key: 'shoppingItemsAmountState',

  get: ({ get }) => {
    const shoppingCart = get(shoppingCartState);

    console.log(shoppingCart);
    return shoppingCart.length;
  },
});

export default shoppingItemsAmountState;
