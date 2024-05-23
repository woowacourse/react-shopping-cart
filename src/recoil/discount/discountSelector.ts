import { selector } from 'recoil';
import { orderedPriceSelector } from '../price/priceSelector';
import { selectedCouponListAtom } from '../coupon/couponListAtom';

export const percentageDiscount = selector<number>({
  key: 'percentageDiscount',
  get: ({ get }) => {
    const orderedPrice = get(orderedPriceSelector);
    const selectedCouponList = get(selectedCouponListAtom);

    const discountedAmount = selectedCouponList
      .filter((coupon) => coupon.discountType === 'percentage')
      .reduce((result, { discount = 0 }) => result * (100 - discount), 0);

    return orderedPrice - discountedAmount;
  },
});

export const totalDiscount = selector<number>({
  key: 'totalDiscount',
  get: ({ get }) => {
    const percentage = get(percentageDiscount);
    // const fixed = get(fixedDiscount)

    return percentage;
  },
});
