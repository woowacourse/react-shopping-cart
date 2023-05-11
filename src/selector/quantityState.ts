import shoppingBasketState from '@Atoms/shoppingBasketState';
import { SHOPPING_QUANTITY } from '@Constants/index';
import { selectorFamily } from 'recoil';

const quantityState = selectorFamily({
  key: 'quantityState',

  get:
    (productId: number) =>
    ({ get }) => {
      const shoppingBasket = get(shoppingBasketState);

      const shoppingItem = shoppingBasket.find((item) => item.product.id === productId);

      if (shoppingItem) return shoppingItem.quantity;
      return SHOPPING_QUANTITY.MIN;
    },
});

export default quantityState;
