import shoppingBasketState from '@Atoms/shoppingBasketState';
import { selectorFamily } from 'recoil';

const quantityState = selectorFamily({
  key: 'quantityState',

  get:
    (productId: number) =>
    ({ get }) => {
      const shoppingBasket = get(shoppingBasketState);

      const shoppingItem = shoppingBasket.find((item) => item.product.id === productId);

      if (shoppingItem) return shoppingItem.quantity;
      return 0;
    },
});

export default quantityState;
