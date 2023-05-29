import { useRecoilValue } from 'recoil';

import { cartItemsState } from '@recoil/atom';

export const useGenerateTotalPrice = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const totalCartPrice = Object.values(cartItems)
    .map(cartItem => cartItem.quantity * cartItem.product.price)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const totalDeliveryPrice = totalCartPrice ? 3000 : 0;

  const totalOrderPrice = totalCartPrice + totalDeliveryPrice;

  return { totalCartPrice, totalDeliveryPrice, totalOrderPrice };
};
