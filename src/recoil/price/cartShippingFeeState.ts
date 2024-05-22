import { selector } from 'recoil';
import { totalCartPriceState } from './totalCartPriceState';
import { SHIPPING_FEE } from '../../constants/price';
import { discountPriceByCouponListState } from './discountPriceByCouponListState';

export const cartShippingFeeState = selector<number>({
  key: 'cartShippingFeeState',
  get: ({ get }) => {
    const totalCartPrice = get(totalCartPriceState);
    const { shippingFee } = get(discountPriceByCouponListState);

    if (totalCartPrice >= SHIPPING_FEE.FREE_THRESHOLD || totalCartPrice <= 0) return 0;
    if (shippingFee === 'free') return 0;

    return SHIPPING_FEE.DEFAULT;
  },
});
