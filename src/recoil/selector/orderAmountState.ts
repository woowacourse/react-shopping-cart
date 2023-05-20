import { selector } from 'recoil';

import selectedShoppingItemState from '@Atoms/selectedShoppingItemState';
import shoppingCartState from '@Atoms/shoppingCartState';

const orderAmountState = selector({
  key: 'orderAmountState',

  get: ({ get }) => {
    const shoppingCart = get(shoppingCartState);
    const selectedShoppingItemId = get(selectedShoppingItemState);

    if (!shoppingCart) return 0;

    return shoppingCart
      .filter((item) => selectedShoppingItemId.includes(item.id))
      .reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
  },
});

export default orderAmountState;
