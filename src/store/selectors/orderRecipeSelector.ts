import { FREE_SHIPPING_CONDITION } from '@/constants/system';
import { Recipe } from '@/types/recipe.type';
import { orderItemState } from './orderItemSelector';
import { selector } from 'recoil';
import { shippingFeeState } from './shippingFeeSelector';

export const orderRecipeState = selector<Recipe>({
  key: 'orderRecipeState',
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
