import shoppingBasketState from '@Atoms/shoppingBasketState';
import { selector } from 'recoil';

const shoppingItemsAmountState = selector({
  key: 'shoppingItemsAmountState',

  get: ({ get }) => {
    const shoppingBasket = get(shoppingBasketState);

    return shoppingBasket.length;
  },
});

export default shoppingItemsAmountState;
