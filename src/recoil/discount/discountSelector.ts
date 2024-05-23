import { selector } from 'recoil';
import { orderedPriceSelector } from '../price/priceSelector';
import { selectedCouponListAtom } from '../coupon/couponListAtom';
import { validateCouponAvailable } from '../../utils/validateCouponAvailable';

export const percentageDiscountSelector = selector<number>({
  key: 'percentageDiscount',
  get: ({ get }) => {
    const orderedPrice = get(orderedPriceSelector);
    const selectedCouponList = get(selectedCouponListAtom);

    const discountedPrice = selectedCouponList
      .filter((coupon) => coupon.discountType === 'percentage')
      .reduce((result, { discount }) => {
        return result * (1 - (discount ?? 0) / 100);
      }, 1);

    return orderedPrice * (1 - discountedPrice);
  },
});

export const fixedDiscountSelector = selector<number>({
  key: 'fixedDiscount',
  get: ({ get }) => {
    const orderedPrice = get(orderedPriceSelector);
    const selectedCouponList = get(selectedCouponListAtom);

    const discountAmount = selectedCouponList
      .filter(
        (coupon) =>
          coupon.discountType === 'fixed' &&
          orderedPrice >= (coupon.minimumAmount ?? 0),
      )
      .reduce((result, { discount }) => {
        return result + (discount ?? 0);
      }, 0);

    selectedCouponList.forEach((coupon) => validateCouponAvailable(coupon));
    return discountAmount;
  },
});

export const totalDiscountSelector = selector<number>({
  key: 'totalDiscount',
  get: ({ get }) => {
    const percentageDiscount = get(percentageDiscountSelector);
    const fixedDiscount = get(fixedDiscountSelector);

    return percentageDiscount + fixedDiscount;
  },
});
