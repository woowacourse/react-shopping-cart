import { selectedCouponListAtom } from '@recoil/orderConfirm/atoms';
import { selector } from 'recoil';

export const totalDiscountPriceSelector = selector({
  key: 'totalDiscountPriceSelector',
  get: ({ get }) => {
    const selectedCouponList = get(selectedCouponListAtom);

    return selectedCouponList.reduce((acc, { discount }) => {
      return acc + discount;
    }, 0);
  },
});
