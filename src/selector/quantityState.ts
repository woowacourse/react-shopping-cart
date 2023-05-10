import { selectorFamily } from 'recoil';
import shoppingBasketState from '../atoms/shoppingBasketState';

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
