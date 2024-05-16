import { FREE_SHIPPING_CONDITION, SHIPPING_FEE } from '@/constants/system';
import { OrderedItem, Recipe } from '@/types/recipe.type';
import { cartListState, filteredCartItemState } from '../atoms';

import { selector } from 'recoil';

export const recipeState = selector<Recipe>({
  key: 'recipeState',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const cartItemStates = cartList.map((state) =>
      get(filteredCartItemState(state.id))
    );

    const orderPrice = cartItemStates.reduce((acc, cur) => {
      if (cur.isSelected) {
        acc += cur.price * cur.quantity;
      }
      return acc;
    }, 0);

    const shippingFee = orderPrice > FREE_SHIPPING_CONDITION ? 0 : SHIPPING_FEE;
    const totalPrice = orderPrice + shippingFee;

    return {
      orderPrice,
      shippingFee,
      totalPrice,
    };
  },
});

export const orderedItemState = selector<OrderedItem>({
  key: 'orderedItemState',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const cartItemStates = cartList.map((state) =>
      get(filteredCartItemState(state.id))
    );

    return cartItemStates.reduce(
      (acc, cur) => {
        if (cur.isSelected) {
          acc.itemCount++;
          acc.totalQuantity += cur.quantity;
        }
        return acc;
      },
      { itemCount: 0, totalQuantity: 0 }
    );
  },
});
