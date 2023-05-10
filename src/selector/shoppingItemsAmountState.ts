import shoppingBasketState from '../atoms/shoppingBasketState';
import { selector } from 'recoil';

const shoppingItemsAmountState = selector({
  key: 'shoppingItemsAmountState',

  get: ({ get }) => {
    const shoppingBasket = get(shoppingBasketState);

    return shoppingBasket.length;
  },
});

export default shoppingItemsAmountState;
