import { atom, selector } from 'recoil';
import { totalPriceSelector } from './order';

export const remoteAreaState = atom<boolean>({
  key: 'remoteAreaState',
  default: false,
});

/**
 * 선택된 제품의 배송비. 주문 금액이 100,000원 이상이면 0원
 */
export const shippingFeeSelector = selector({
  key: 'shippingFeeSelector',
  get: ({ get }) => {
    const totalPrice = get(totalPriceSelector);
    const isRemoteArea = get(remoteAreaState);

    if (totalPrice >= 100_000) return 0;
    return isRemoteArea ? 6000 : 3000;
  },
});
