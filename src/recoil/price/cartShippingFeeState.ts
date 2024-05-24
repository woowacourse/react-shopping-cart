import { selector } from 'recoil';
import { totalCartPriceState } from './totalCartPriceState';
import { SHIPPING_FEE } from '../../constants/price';
import { discountPriceByCouponListState } from './discountPriceByCouponListState';
import { isMountainIslandAreaState } from './isMountainIslandAreaState';

export const cartShippingFeeState = selector<number>({
  key: 'cartShippingFeeState',
  get: ({ get }) => {
    const totalCartPrice = get(totalCartPriceState);
    const totalDiscount = get(discountPriceByCouponListState);
    const isMountainIslandArea = get(isMountainIslandAreaState);

    if (totalCartPrice >= SHIPPING_FEE.FREE_THRESHOLD) return 0;

    const shippingFee = SHIPPING_FEE.DEFAULT + (isMountainIslandArea ? SHIPPING_FEE.MOUNTAIN_ISLAND_AREA : 0);

    if (totalCartPrice <= shippingFee || totalCartPrice <= 0) return 0;
    if (totalDiscount.shippingFee === 'free') return 0;

    return shippingFee;
  },
});
