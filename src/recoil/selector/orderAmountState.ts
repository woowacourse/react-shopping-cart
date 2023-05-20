import { selector } from 'recoil';

import cartItemsState from '@Atoms/cartItemsState';
import selectedShoppingItemState from '@Atoms/selectedShoppingItemState';

const orderAmountState = selector({
  key: 'orderAmountState',

  get: ({ get }) => {
    const shoppingCart = get(cartItemsState);
    const selectedShoppingItemId = get(selectedShoppingItemState);

    if (!shoppingCart) return 0;

    return shoppingCart
      .filter((item) => selectedShoppingItemId.includes(item.id))
      .reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
  },
});

export default orderAmountState;
