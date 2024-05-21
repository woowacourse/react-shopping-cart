import { selector } from 'recoil';
import { cartShippingFeeState } from './cartShippingFeeState';
import { totalCartPriceState } from './totalCartPriceState';

export const finalCartPriceSelector = selector<number>({
  key: 'finalCartPriceSelector',
  get: ({ get }) => {
    const totalCartPrice = get(totalCartPriceState);
    const deliveryFee = get(cartShippingFeeState);

    // TODO: 상품 가격이 배송료보다 쌀 경우 구현
    return totalCartPrice === 0 ? 0 : totalCartPrice - deliveryFee;
  },
});
