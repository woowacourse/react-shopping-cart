import { OrderedItem, Recipe } from '@/types/recipe.type';

import { FREE_SHIPPING_CONDITION } from '@/constants/system';
import { orderItemState } from './orderItemSelector';
import { selector } from 'recoil';
import { shippingFeeState } from './shippingFeeSelector';

export const recipeState = selector<Recipe>({
  key: 'recipeState',
  get: ({ get }) => {
    const orderedList = get(orderItemState);
    const shippingAreaFee = get(shippingFeeState);

    const orderPrice = orderedList.reduce((acc, cur) => {
      acc += cur.product.price * cur.quantity;

      return acc;
    }, 0);

    const shippingFee =
      orderPrice >= FREE_SHIPPING_CONDITION ? 0 : shippingAreaFee;
    const totalPrice = orderPrice + shippingFee;

    return {
      orderPrice,
      shippingFee,
      totalPrice,
    };
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
