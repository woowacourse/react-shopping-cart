import { selector } from 'recoil';
import { totalCartPriceState } from './totalCartPriceState';
import { SHIPPING_FEE } from '../../constants/price';

export const cartShippingFeeState = selector<number>({
  key: 'cartShippingFeeState',
  get: ({ get }) => {
    const totalCartPrice = get(totalCartPriceState);

    if (totalCartPrice >= SHIPPING_FEE.FREE_THRESHOLD || totalCartPrice <= 0) return 0;
    else return SHIPPING_FEE.DEFAULT;
  },
});
