import { OrderedItem, Recipe } from '@/types/recipe.type';
import { cartListState, filteredCartItemState } from '@/store/atoms';

import { FREE_SHIPPING_CONDITION } from '@/constants/system';
import { selector } from 'recoil';
import { shippingFeeState } from './shippingFeeSelector';

export const recipeState = selector<Recipe>({
  key: 'recipeState',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const shippingAreaFee = get(shippingFeeState);

    const cartItemStates = cartList.map((state) =>
      get(filteredCartItemState(state.id))
    );

    const orderPrice = cartItemStates.reduce((acc, cur) => {
      if (cur.isSelected) {
        acc += cur.price * cur.quantity;
      }
      return acc;
    }, 0);

    const shippingFee =
      orderPrice > FREE_SHIPPING_CONDITION ? 0 : shippingAreaFee;
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
