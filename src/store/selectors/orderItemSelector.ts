import { cartListState, filteredCartItemState } from '../atoms';

import { selector } from 'recoil';

export const orderItemState = selector({
  key: 'orderItemSelector',
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

    console.log(selectedItems);

    return selectedItems;
  },
});
