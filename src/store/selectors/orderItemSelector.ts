import { cartListState, filteredCartItemState } from '@/store/atoms';

import { OrderedItem } from '@/types/recipe.type';
import { selector } from 'recoil';

export const orderItemState = selector({
  key: 'orderItemState',
  get: ({ get }) => {
    const cartList = get(cartListState);

    const updatedCartList = cartList.map((item) => {
      const itemState = get(filteredCartItemState(item.id));
      return {
        ...item,
        quantity: itemState.quantity,
      };
    });

    const selectedItems = updatedCartList.filter((item) => {
      const itemState = get(filteredCartItemState(item.id));
      return itemState.isSelected;
    });

    return selectedItems;
  },
});

export const orderedItemQuantityState = selector<OrderedItem>({
  key: 'orderedItemQuantityState',
  get: ({ get }) => {
    const orderedList = get(orderItemState);

    return orderedList.reduce(
      (acc, cur) => {
        acc.itemCount++;
        acc.totalQuantity += cur.quantity;

        return acc;
      },
      { itemCount: 0, totalQuantity: 0 }
    );
  },
});
