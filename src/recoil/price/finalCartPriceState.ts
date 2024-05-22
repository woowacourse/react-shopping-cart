import { selector } from 'recoil';
import { cartShippingFeeState } from './cartShippingFeeState';
import { totalCartPriceState } from './totalCartPriceState';
import { discountPriceByCouponListState } from './discountPriceByCouponListState';

export const finalCartPriceState = selector<number>({
  key: 'finalCartPriceState',
  get: ({ get }) => {
    const totalCartPrice = get(totalCartPriceState);
    const shippingFee = get(cartShippingFeeState);
    const totalDiscount = get(discountPriceByCouponListState);

    // TODO: 상품 가격이 배송료보다 쌀 경우 구현
    if (totalCartPrice === 0) return 0;

    return Math.max(totalCartPrice - shippingFee - totalDiscount.coupon, 0);
  },
});
