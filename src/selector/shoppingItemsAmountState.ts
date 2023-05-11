import shoppingCartState from '@Atoms/shoppingCartState';
import { selector } from 'recoil';

const shoppingItemsAmountState = selector({
  key: 'shoppingItemsAmountState',

  get: ({ get }) => {
    const shoppingCart = get(shoppingCartState);

    return shoppingCart.length;
  },
});

export default shoppingItemsAmountState;
